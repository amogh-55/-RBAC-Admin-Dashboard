import { useState } from 'react';
import { FiX, FiCheck, FiShield } from 'react-icons/fi';
import { usePermissions } from '../context/PermissionContext';

function RolePermissions({ role, onClose, onSave }) {
  const { permissions } = usePermissions();
  const [selectedPermissions, setSelectedPermissions] = useState(role.permissions || []);
  
  const handlePermissionToggle = (permissionName) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionName)
        ? prev.filter(p => p !== permissionName)
        : [...prev, permissionName]
    );
  };

  const handleSave = () => {
    onSave({ ...role, permissions: selectedPermissions });
    onClose();
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.scope]) {
      acc[permission.scope] = [];
    }
    acc[permission.scope].push(permission);
    return acc;
  }, {});

  return (
    <div className="modal-overlay">
      <div className="modal permissions-modal">
        <div className="modal-header">
          <div className="modal-title">
            <FiShield className="icon" />
            <div>
              <h2>Manage Permissions</h2>
              <p className="subtitle">Role: {role.name}</p>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="permissions-content">
          {Object.entries(groupedPermissions).map(([scope, permissions]) => (
            <div key={scope} className="permission-category">
              <h3>{scope}</h3>
              <div className="permission-list">
                {permissions.map(permission => (
                  <label key={permission.name} className="permission-item">
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(permission.name)}
                      onChange={() => handlePermissionToggle(permission.name)}
                    />
                    <span className="checkbox-custom">
                      {selectedPermissions.includes(permission.name) && <FiCheck />}
                    </span>
                    <div className="permission-info">
                      <span className="permission-name">{permission.name}</span>
                      <span className="permission-description">{permission.description}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save Permissions</button>
        </div>
      </div>
    </div>
  );
}

export default RolePermissions;