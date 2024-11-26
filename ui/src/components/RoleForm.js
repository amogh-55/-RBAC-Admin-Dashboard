import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { api } from '../services/api';

function RoleForm({ onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (initialData) {
        const updated = await api.updateRole(initialData.id, formData);
        onSubmit(updated);
      } else {
        const created = await api.createRole(formData);
        onSubmit(created);
      }
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-spinner">Loading...</div>}
        <div className="modal-header">
          <h2>Add New Role</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Role Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                name: e.target.value
              }))}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="form-control"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                description: e.target.value
              }))}
              required
            />
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
              Create Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoleForm;