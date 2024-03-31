const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.get('/addUser', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    };
})

router.put('/addUser/:id', async (req, res) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
         
        user = {...user, name, email, password}

        await user.save();
        res.status(200).json({ message: "user updated successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

router.delete('/addUser/:id', async (req, res) => {
    const id = req.params.id;
    try {
       const user = await User.findByIdAndDelete(id);
       if (!user) {
          return res.status(404).json({ error: "user not found" });
       }
       res.status(200).json({ message: "user deleted successfully" });
    } catch (err) {
       console.error(err);
       res.status(500).json({ error: err.message });
    }
 });

 
module.exports = router;