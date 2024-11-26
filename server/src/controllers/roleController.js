const Role = require('../models/Role');

const roleController = {
    getRoles: async (req, res) => {
        try {
            const roles = await Role.find();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createRole: async (req, res) => {
        try {
            const role = await Role.create(req.body);
            res.status(201).json(role);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getRole: async (req, res) => {
        try {
            const role = await Role.findById(req.params.id);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateRole: async (req, res) => {
        try {
            const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteRole: async (req, res) => {
        try {
            const role = await Role.findByIdAndDelete(req.params.id);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(204).json(null);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getRolesByScope: async (req, res) => {
        try {
            const roles = await Role.find({ scope: req.params.scope });
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = roleController;