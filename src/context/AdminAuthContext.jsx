import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchAdmin = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAdmin(res.data.admin);
      } catch (err) {
        console.error('Error fetching admin:', err);
        localStorage.removeItem('adminToken');
        setToken(null);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [token, API_URL]);

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/signin`, { email, password });
    const { token, admin } = res.data;
    localStorage.setItem('adminToken', token);
    setToken(token);
    setAdmin(admin);
    return res.data;
  };

  const signup = async (username, email, password, adminKey) => {
    const res = await axios.post(`${API_URL}/auth/signup`, { username, email, password, adminKey });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
  };

  const value = {
    admin,
    token,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
