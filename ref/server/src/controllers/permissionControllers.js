const Permission = require('../models/Permission');
const Role = require('../models/Role');

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find()
      .sort('scope name');
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPermission = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    
    res.json(permission);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createPermission = async (req, res) => {
  try {
    const { name, description, scope } = req.body;

    // Check if permission already exists
    const existingPermission = await Permission.findOne({ name });
    if (existingPermission) {
      return res.status(400).json({ message: 'Permission already exists' });
    }

    const permission = await Permission.create({
      name,
      description,
      scope
    });

    res.status(201).json(permission);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    const { name, description, scope } = req.body;

    // Check if new name already exists (excluding current permission)
    if (name) {
      const existingPermission = await Permission.findOne({ 
        name, 
        _id: { $ne: req.params.id } 
      });
      if (existingPermission) {
        return res.status(400).json({ message: 'Permission name already exists' });
      }
    }

    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      { name, description, scope },
      { new: true, runValidators: true }
    );

    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    res.json(permission);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

exports.deletePermission = async (req, res) => {
  try {
    // Check if permission is used in any roles
    const rolesWithPermission = await Role.countDocuments({
      permissions: req.params.id
    });
    
    if (rolesWithPermission > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete permission as it is assigned to roles' 
      });
    }

    const permission = await Permission.findByIdAndDelete(req.params.id);
    
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    res.json({ message: 'Permission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Additional method to get permissions by scope
exports.getPermissionsByScope = async (req, res) => {
  try {
    const permissions = await Permission.find({ scope: req.params.scope })
      .sort('name');
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};