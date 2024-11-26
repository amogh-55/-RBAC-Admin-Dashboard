import { useState, useEffect } from 'react';
import { 
  FiGrid, 
  FiUsers, 
  FiShield, 
  FiLock,
  FiPlus,
  FiSun,
  FiMoon,
  FiEdit2,
  FiTrash2,
  FiUser
} from 'react-icons/fi';
import { api } from './services/api';
import Roles from './components/Roles';
import Permissions from './components/Permissions';
import UserForm from './components/UserForm';
import './App.css';
import { PermissionProvider } from './context/PermissionContext';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [activeTab, setActiveTab] = useState('users');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleUserSubmit = async (userData) => {
    try {
      if (editingUser) {
        const updated = await api.updateUser(editingUser.id, userData);
        setUsers(users.map(user => user.id === editingUser.id ? updated : user));
      } else {
        const created = await api.createUser(userData);
        setUsers([...users, created]);
      }
      setShowUserForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getFilteredUsers = () => {
    return users
      .filter(user => {
        if (filter === 'all') return true;
        return user.status === filter;
      })
      .filter(user => {
        if (!searchTerm) return true;
        return (
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
  };

  const renderContent = () => {
    if (loading) {
      return <div className="loading-state">Loading...</div>;
    }

    if (error) {
      return (
        <div className="error-state">
          <p>Error: {error}</p>
          <button onClick={loadUsers}>Retry</button>
        </div>
      );
    }

    switch (activeTab) {
      case 'roles':
        return <Roles />;
      case 'permissions':
        return <Permissions />;
      default:
        return (
          <div>
            <div className="filters-container">
              <div className="filter-tabs">
                <button 
                  className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All users
                </button>
                <button 
                  className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
                  onClick={() => setFilter('active')}
                >
                  Active
                </button>
                <button 
                  className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
                  onClick={() => setFilter('pending')}
                >
                  Pending
                </button>
                <button 
                  className={`filter-tab ${filter === 'inactive' ? 'active' : ''}`}
                  onClick={() => setFilter('inactive')}
                >
                  Inactive
                </button>
              </div>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="user-grid">
              {getFilteredUsers().map(user => (
                <div key={user.id} className="user-card">
                  <div className="user-info">
                    <div className="user-avatar">
                      <FiUser className="avatar-icon" />
                    </div>
                    <div className="user-details">
                      <h3>{user.name}</h3>
                      <p className="user-email">{user.email}</p>
                      <div className="user-badges">
                        <span className={`role-badge ${user.role.toLowerCase()}`}>
                          {user.role}
                        </span>
                        <span className={`status-badge ${user.status}`}>
                          {user.status}
                        </span>
                      </div>
                      <p className="last-login">Last login: {user.lastLogin}</p>
                    </div>
                  </div>
                  <div className="user-actions">
                    <button className="icon-btn edit" onClick={() => handleEditUser(user)}>
                      <FiEdit2 />
                    </button>
                    <button className="icon-btn delete" onClick={() => handleDeleteUser(user.id)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  const getHeaderContent = () => {
    switch (activeTab) {
      case 'roles':
        return {
          title: 'Role Management',
          subtitle: 'Create and manage user roles',
          showAddButton: false
        };
      case 'permissions':
        return {
          title: 'Permission Management',
          subtitle: 'Manage system permissions',
          showAddButton: false
        };
      default:
        return {
          title: 'User Management',
          subtitle: 'Create and manage system users',
          showAddButton: true
        };
    }
  };

  return (
    <PermissionProvider>
      <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
        <aside className="sidebar">
          <div className="logo">
            <FiGrid className="icon" />
            Dashboard
          </div>
          <nav>
            <button 
              className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <FiUsers className="icon" />
              Users
            </button>
            <button 
              className={`nav-item ${activeTab === 'roles' ? 'active' : ''}`}
              onClick={() => setActiveTab('roles')}
            >
              <FiShield className="icon" />
              Roles
            </button>
            <button 
              className={`nav-item ${activeTab === 'permissions' ? 'active' : ''}`}
              onClick={() => setActiveTab('permissions')}
            >
              <FiLock className="icon" />
              Permissions
            </button>
          </nav>
        </aside>

        <main className="content">
          <div className="top-bar">
            <button 
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>

          <div className="header">
            <div>
              <h1>{getHeaderContent().title}</h1>
              <p className="subtitle">{getHeaderContent().subtitle}</p>
            </div>
            {getHeaderContent().showAddButton && (
              <button className="add-user-btn" onClick={handleAddUser}>
                <FiPlus className="icon" /> Add New User
              </button>
            )}
          </div>

          {renderContent()}

          {showUserForm && (
            <UserForm
              onClose={() => setShowUserForm(false)}
              onSubmit={handleUserSubmit}
              initialData={editingUser}
            />
          )}
        </main>
      </div>
    </PermissionProvider>
  );
}

export default App;
