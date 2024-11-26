const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define routes using the router
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);
router.get('/me', authController.getMe);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.patch('/update-password', authController.updatePassword);

module.exports = router;  // Export the router, not the routes object