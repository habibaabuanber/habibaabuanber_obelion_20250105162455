const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/reset-password', userController.resetPassword);
router.get('/user/:id', userController.getUserDetails);
router.put('/user/:id', userController.updateUserDetails);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;
