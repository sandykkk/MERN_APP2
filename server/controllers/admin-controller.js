const User = require("../models/user-model");
const Contact = require("../models/contact-model")


// get all users


const getAllUsers = async(req, res) => {
    try {
        const users = await User.find({}, { password: 0 });

        // console.log("Users", users);

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Contacts found" });
        }
        return res.status(200).json(users);

    } catch (error) {
        next(error);
    }

};
// deletion of a user
const deleteUserById = async(req, res) => {
        try {
            const id = req.params.id;
            await User.deleteOne({ _id: id });
            return res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            next(error);
        }

    }
    // deletion of contacts
const deleteContactById = async(req, res) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id });
        return res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        next(error);
    }
}

// find edit user 
const getUserById = async(req, res) => {
        try {
            const id = req.params.id;
            const data = await User.findOne({ _id: id }, { password: 0 });
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }

    }
    // update user imformation
const updateUserById = async(req, res) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;
        const updateUser = await User.updateOne({ _id: id }, { $set: updateUserData });

        return res.status(200).json(updateUser);

    } catch (error) {
        next(error);
    }
}

// get all contacts

const getAllContacts = async(req, res) => {
    try {
        const contacts = await Contact.find();
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "contact not found" });
        }
        return res.status(200).json(contacts);

    } catch (error) {
        next(error);
    }
}

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById };