const express = require('express');
const { getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById } = require('../controllers/admin-controller');
const authMiddleware = require("../middlewars/auth-middleware");
const adminMiddleware = require("../middlewars/admin-middleware");



const router = express.Router();

router.route('/users').get(authMiddleware, adminMiddleware, getAllUsers);
router.route("/users/:id").get(authMiddleware, adminMiddleware, getUserById);
router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, updateUserById);

router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, deleteUserById);

router.route('/contacts').get(authMiddleware, getAllContacts);
router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, deleteContactById);


module.exports = router;