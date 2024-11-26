const Role = require('../models/Role');

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find()
      .populate('permissions')
      .sort('name');
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id)
      .populate('permissions');
    
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;

    // Check if role already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ message: 'Role already exists' });
    }

    const role = await Role.create({
      name,
      description,
      permissions
    });

    const populatedRole = await role.populate('permissions');
    res.status(201).json(populatedRole);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;

    // Check if new name already exists (excluding current role)
    if (name) {
      const existingRole = await Role.findOne({ 
        name, 
        _id: { $ne: req.params.id } 
      });
      if (existingRole) {
        return res.status(400).json({ message: 'Role name already exists' });
      }
    }

    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { name, description, permissions },
      { new: true, runValidators: true }
    ).populate('permissions');

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.json(role);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    // Check if role is assigned to any users
    const User = require('../models/User');
    const usersWithRole = await User.countDocuments({ role: req.params.id });
    
    if (usersWithRole > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete role as it is assigned to users' 
      });
    }

    const role = await Role.findByIdAndDelete(req.params.id);
    
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Additional method to manage role permissions
exports.updateRolePermissions = async (req, res) => {
  try {
    const { permissions } = req.body;
    
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { permissions },
      { new: true, runValidators: true }
    ).populate('permissions');

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.json(role);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};