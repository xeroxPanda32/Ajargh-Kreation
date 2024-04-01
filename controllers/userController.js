const User = require('../model/user');

// Controller to get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Controller to update a user by ID
const updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        user.name = name;
        user.email = email;
        user.password = password;

        await user.save();
        res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Controller to delete a user by ID
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Export the controller functions
module.exports = {
    getUsers,
    updateUser,
    deleteUser
};
