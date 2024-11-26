// Simulated delay to mimic API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated database
const db = {
  users: [
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '3/10/2024' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Editor', status: 'active', lastLogin: '3/9/2024' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'Viewer', status: 'inactive', lastLogin: '3/1/2024' }
  ],
  permissions: [
    { id: 1, name: 'Read Users', description: 'Can view user information', scope: 'Users', createdAt: '3/10/2024' },
    { id: 2, name: 'Write Users', description: 'Can create and edit users', scope: 'Users', createdAt: '3/9/2024' },
    { id: 3, name: 'Delete Users', description: 'Can remove users from system', scope: 'Users', createdAt: '3/8/2024' }
  ],
  roles: [
    { id: 1, name: 'Admin', description: 'Full system access', permissions: ['Read Users', 'Write Users', 'Delete Users'], userCount: 3 },
    { id: 2, name: 'Editor', description: 'Content management', permissions: ['Read Users', 'Write Users'], userCount: 5 },
    { id: 3, name: 'Viewer', description: 'Read-only access', permissions: ['Read Users'], userCount: 8 }
  ]
};

export const api = {
  // Users
  getUsers: async () => {
    await delay(500);
    return [...db.users];
  },

  createUser: async (userData) => {
    await delay(500);
    const newUser = {
      ...userData,
      id: Math.max(...db.users.map(u => u.id)) + 1,
      lastLogin: 'Never'
    };
    db.users.push(newUser);
    return newUser;
  },

  updateUser: async (id, userData) => {
    await delay(500);
    const index = db.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    db.users[index] = { ...db.users[index], ...userData };
    return db.users[index];
  },

  deleteUser: async (id) => {
    await delay(500);
    const index = db.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    db.users.splice(index, 1);
    return { success: true };
  },

  // Permissions
  getPermissions: async () => {
    await delay(500);
    return [...db.permissions];
  },

  createPermission: async (permissionData) => {
    await delay(500);
    const newPermission = {
      ...permissionData,
      id: Math.max(...db.permissions.map(p => p.id)) + 1,
      createdAt: new Date().toLocaleDateString()
    };
    db.permissions.push(newPermission);
    return newPermission;
  },

  updatePermission: async (id, permissionData) => {
    await delay(500);
    const index = db.permissions.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Permission not found');
    db.permissions[index] = { ...db.permissions[index], ...permissionData };
    return db.permissions[index];
  },

  deletePermission: async (id) => {
    await delay(500);
    const index = db.permissions.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Permission not found');
    db.permissions.splice(index, 1);
    return { success: true };
  },

  // Roles
  getRoles: async () => {
    await delay(500);
    return [...db.roles];
  },

  createRole: async (roleData) => {
    await delay(500);
    const newRole = {
      ...roleData,
      id: Math.max(...db.roles.map(r => r.id)) + 1,
      userCount: 0,
      permissions: roleData.permissions || []
    };
    db.roles.push(newRole);
    return newRole;
  },

  updateRole: async (id, roleData) => {
    await delay(500);
    const index = db.roles.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Role not found');
    db.roles[index] = { ...db.roles[index], ...roleData };
    return db.roles[index];
  },

  deleteRole: async (id) => {
    await delay(500);
    const index = db.roles.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Role not found');
    db.roles.splice(index, 1);
    return { success: true };
  }
};
