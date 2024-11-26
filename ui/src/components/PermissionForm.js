import { useState, useEffect } from 'react';
import { api } from '../services/api';

function PermissionForm({ onClose, onSubmit, initialData }) {
  const availableScopes = ['Users', 'Roles', 'Content', 'Settings', 'Reports'];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    scope: 'Users'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        scope: initialData.scope
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (initialData) {
        const updated = await api.updatePermission(initialData.id, formData);
        onSubmit(updated);
      } else {
        const created = await api.createPermission(formData);
        onSubmit(created);
      }
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-spinner">Loading...</div>}
        <div className="modal-header">
          <h2>{initialData ? 'Edit Permission' : 'Add New Permission'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Permission Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter permission name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter permission description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="scope">Scope</label>
            <select
              id="scope"
              name="scope"
              value={formData.scope}
              onChange={handleChange}
            >
              {availableScopes.map(scope => (
                <option key={scope} value={scope}>{scope}</option>
              ))}
            </select>
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              onClick={onClose}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: '#c2410c',
                marginRight: '10px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              style={{ 
                background: '#c2410c',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {initialData ? 'Update Permission' : 'Create Permission'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PermissionForm;