import { FiTrash2, FiShield, FiPlus } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import RolePermissions from './RolePermissions';
import RoleForm from './RoleForm';
import { api } from '../services/api';

function Roles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPermissions, setShowPermissions] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showRoleForm, setShowRoleForm] = useState(false);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      setLoading(true);
      const data = await api.getRoles();
      setRoles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleManagePermissions = (role) => {
    setSelectedRole(role);
    setShowPermissions(true);
  };

  const handleDeleteRole = async (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await api.deleteRole(id);
        setRoles(roles.filter(role => role.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleUpdatePermissions = async (updatedRole) => {
    try {
      const updated = await api.updateRole(updatedRole.id, updatedRole);
      setRoles(prev => 
        prev.map(role => 
          role.id === updatedRole.id ? updated : role
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddRole = async (newRole) => {
    try {
      const created = await api.createRole(newRole);
      setRoles(prev => [...prev, created]);
      setShowRoleForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="roles-container">
      {loading ? (
        <div className="loading-state">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>Error: {error}</p>
          <button onClick={loadRoles}>Retry</button>
        </div>
      ) : (
        <div className="role-management">
          <div className="role-content">
            <div className="actions-bar">
              <button 
                className="add-user-btn"
                onClick={() => setShowRoleForm(true)}
              >
                <FiPlus className="icon" /> Add Role
              </button>
            </div>

            <table className="user-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>DESCRIPTION</th>
                  <th>PERMISSIONS</th>
                  <th>USERS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {roles.map(role => (
                  <tr key={role.id}>
                    <td>{role.name}</td>
                    <td>{role.description}</td>
                    <td>
                      <div className="permission-pills">
                        {role.permissions?.slice(0, 2).map((permission, index) => (
                          <span key={index} className="role-badge">
                            {permission}
                          </span>
                        ))}
                        {role.permissions?.length > 2 && (
                          <span className="role-badge more">
                            +{role.permissions.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td>{role.userCount} users</td>
                    <td className="actions">
                      <button 
                        className="icon-btn"
                        title="Manage Permissions"
                        onClick={() => handleManagePermissions(role)}
                      >
                        <FiShield />
                      </button>
                      <button 
                        className="icon-btn"
                        title="Delete Role"
                        onClick={() => handleDeleteRole(role.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {showPermissions && selectedRole && (
              <RolePermissions
                role={selectedRole}
                onClose={() => {
                  setShowPermissions(false);
                  setSelectedRole(null);
                }}
                onSave={handleUpdatePermissions}
              />
            )}

            {showRoleForm && (
              <RoleForm
                onClose={() => setShowRoleForm(false)}
                onSubmit={handleAddRole}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Roles;
