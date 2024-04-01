const Listing = require('../model/list');

// Controller to get all listings
const getListings = async (req, res) => {
    try {
        const listings = await Listing.find();
        res.status(200).json(listings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Controller to create a new listing
const createListing = async (req, res) => {
    const { name, businessPhone, city, address, images } = req.body;
    try {
        const newList = new Listing({
            name: name,
            businessPhone: businessPhone,
            city: city,
            address: address,
            images: images
        });

        await newList.save();
        res.status(201).json({ message: "Listing created" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Controller to update an existing listing
const updateListing = async (req, res) => {
    const id = req.params.id;
    const { name, businessPhone, city, address, images } = req.body;
    try {
        let listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }

        listing.name = name;
        listing.businessPhone = businessPhone;
        listing.city = city;
        listing.address = address;
        listing.images = images;

        await listing.save();
        res.status(200).json({ message: "Listing updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Controller to delete a listing
const deleteListing = async (req, res) => {
    const id = req.params.id;
    try {
        const listing = await Listing.findByIdAndDelete(id);
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getListings,
    createListing,
    updateListing,
    deleteListing
};
