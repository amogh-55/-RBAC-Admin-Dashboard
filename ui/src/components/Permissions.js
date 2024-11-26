import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import PermissionForm from './PermissionForm';
import { api } from '../services/api';

function Permissions() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);

  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    try {
      setLoading(true);
      const data = await api.getPermissions();
      setPermissions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPermission = (permission) => {
    setEditingPermission(permission);
    setShowForm(true);
  };

  const handleSubmit = async (permissionData) => {
    try {
      if (editingPermission) {
        const updated = await api.updatePermission(
          editingPermission.id, 
          permissionData
        );
        setPermissions(prev => prev.map(p => 
          p.id === editingPermission.id ? updated : p
        ));
        setEditingPermission(null);
      } else {
        const created = await api.createPermission(permissionData);
        setPermissions(prev => [...prev, created]);
      }
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeletePermission = async (id) => {
    if (window.confirm('Are you sure you want to delete this permission?')) {
      try {
        await api.deletePermission(id);
        setPermissions(permissions.filter(permission => permission.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="permission-management">
      <div className="permission-content">
        <div className="actions-bar">
          <button className="add-user-btn" onClick={() => {
            setEditingPermission(null);
            setShowForm(true);
          }}>
            <FiPlus className="icon" /> Add Permission
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>Error: {error}</p>
            <button onClick={loadPermissions}>Retry</button>
          </div>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>SCOPE</th>
                <th>CREATED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map(permission => (
                <tr key={permission.id}>
                  <td>{permission.name}</td>
                  <td>{permission.description}</td>
                  <td>
                    <span className="role-badge admin">{permission.scope}</span>
                  </td>
                  <td>{permission.createdAt}</td>
                  <td className="actions">
                    <button 
                      className="icon-btn" 
                      title="Edit"
                      onClick={() => handleEditPermission(permission)}
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="icon-btn" 
                      title="Delete"
                      onClick={() => handleDeletePermission(permission.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showForm && (
          <PermissionForm 
            onClose={() => {
              setShowForm(false);
              setEditingPermission(null);
            }}
            onSubmit={handleSubmit}
            initialData={editingPermission}
          />
        )}
      </div>
    </div>
  );
}

export default Permissions;
