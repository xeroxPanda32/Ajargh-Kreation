const express = require('express');
const router = express.Router();
const Listing = require('../model/list')
const passport = require('../config/passport-jwtStrategy');
const isAdmin = require('../middleware/middleware');
const isBusinessOwner = require('../middleware/middleware');

router.get('/listings',passport.authenticate('jwt', { session: false }),async(req,res)=>{
   console.log('form');
   try{
    const list =  await Listing.find();
    res.status(200).send(list);
   }
   catch(err){
      console.log(err);
      res.status(500).json({ error: err.message });
   };
})

router.post('/listings',passport.authenticate('jwt', { session: false }), isBusinessOwner, (req,res)=>{
   const {name, businessPhone, city , address, images} = req.body;
   console.log(name, businessPhone, city , address, images);
   console.log('add');
   const newList = new Listing({
      name: name,
      businessPhone: businessPhone,
      city: city,
      address: address,
      images: images
   })

   newList.save()
   .then(()=>{
      res.status(201).json({ message: "List created" });
   }).catch((err)=>{
      console.log(err);
      res.status(500).json({ error: err.message });
   })

})

router.put('/listings/:id',passport.authenticate('jwt', { session: false }), isBusinessOwner, async (req, res) => {
   const id = req.params.id;
   console.log('update');
   const { name, businessPhone, city, address, images } = req.body;
   try {
      let list = await Listing.findById(id);
      if (!list) {
         return res.status(404).json({ error: "List not found" });
      }

      list.name = name;
      list.businessPhone = businessPhone;
      list.city = city;
      list.address = address;
      list.images = images;

      await list.save();
      res.status(200).json({ message: "List updated successfully" });
   } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
   }
});

router.delete('/listings/:id',passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
   const id = req.params.id;
   console.log('delete');
   try {
      const list = await Listing.findByIdAndDelete(id);
      if (!list) {
         return res.status(404).json({ error: "List not found" });
      }
      res.status(200).json({ message: "List deleted successfully" });
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
   }
});

module.exports = router;