const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
  getPermissionsByScope
} = require('../controllers/permissionController');

router.use(protect);

router
  .route('/')
  .get(authorize('read:permissions'), getPermissions)
  .post(authorize('create:permissions'), createPermission);

router
  .route('/:id')
  .get(authorize('read:permissions'), getPermission)
  .put(authorize('update:permissions'), updatePermission)
  .delete(authorize('delete:permissions'), deletePermission);

router
  .route('/scope/:scope')
  .get(authorize('read:permissions'), getPermissionsByScope);

module.exports = router;