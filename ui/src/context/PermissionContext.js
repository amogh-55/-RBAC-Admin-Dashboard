import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    try {
      const data = await api.getPermissions();
      setPermissions(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const addPermission = async (newPermission) => {
    try {
      const created = await api.createPermission(newPermission);
      setPermissions(prev => [...prev, created]);
      return { success: true };
    } catch (err) {
      console.error(err.message);
      return { success: false, error: err.message };
    }
  };

  const deletePermission = (id) => {
    setPermissions(prev => prev.filter(permission => permission.id !== id));
  };

  return (
    <PermissionContext.Provider value={{ permissions, addPermission, deletePermission }}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
}