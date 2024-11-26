const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.use(protect);

router
  .route('/')
  .get(authorize('read:users'), getUsers)
  .post(authorize('create:users'), createUser);

router
  .route('/:id')
  .put(authorize('update:users'), updateUser)
  .delete(authorize('delete:users'), deleteUser);

module.exports = router;