const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).populate({
      path: 'role',
      populate: { path: 'permissions' }
    });

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

exports.authorize = (...permissions) => {
  return (req, res, next) => {
    const userPermissions = req.user.role.permissions.map(p => p.name);
    const hasPermission = permissions.some(p => userPermissions.includes(p));
    
    if (!hasPermission) {
      return res.status(403).json({ message: 'Not authorized to perform this action' });
    }
    next();
  };
};