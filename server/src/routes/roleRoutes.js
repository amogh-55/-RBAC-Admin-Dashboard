const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const roleController = require('../controllers/roleController');

router.use(protect);

router
  .route('/')
  .get(authorize('read:roles'), roleController.getRoles)
  .post(authorize('create:roles'), roleController.createRole);

router
  .route('/:id')
  .get(authorize('read:roles'), roleController.getRole)
  .put(authorize('update:roles'), roleController.updateRole)
  .delete(authorize('delete:roles'), roleController.deleteRole);

router
  .route('/scope/:scope')
  .get(authorize('read:roles'), roleController.getRolesByScope);

module.exports = router;