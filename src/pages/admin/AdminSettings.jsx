import React, { useState } from 'react';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { toast } from 'react-hot-toast';
import {
  User,
  Lock,
  Shield,
  Settings as SettingsIcon,
  Save,
  Loader2,
  Mail,
  ShieldCheck,
  Bell,
  Globe
} from 'lucide-react';

const AdminSettings = () => {
  const { admin, token, updateAdmin } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Form states
  const [profileData, setProfileData] = useState({
    username: admin?.username || '',
    email: admin?.email || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    publicSignup: false,
    usageLimit: 5,
    emailNotifications: true
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`${API_URL}/auth/update-profile`, profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // updateAdmin(res.data.data); // If context supports it
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error('New passwords do not match');
    }
    setLoading(true);
    try {
      await axios.put(`${API_URL}/auth/change-password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Password changed successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const toggleSystemSetting = (key) => {
    setSystemSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success('Setting updated (simulation)');
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="text-white">Admin Settings</h1>
        <p className="text-slate-400 mt-1">Manage your account and global platform preferences.</p>
      </div>

      <div className="settings-layout-grid">
        {/* Settings Navigation */}
        <div className="section-card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('profile')}
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              style={{ border: 'none', background: activeTab === 'profile' ? 'rgba(99, 102, 241, 0.1)' : 'transparent', width: '100%', cursor: 'pointer', textAlign: 'left' }}
            >
              <User size={18} />
              <span>Profile Information</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
              style={{ border: 'none', background: activeTab === 'security' ? 'rgba(99, 102, 241, 0.1)' : 'transparent', width: '100%', cursor: 'pointer', textAlign: 'left' }}
            >
              <Lock size={18} />
              <span>Security & Password</span>
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`nav-item ${activeTab === 'system' ? 'active' : ''}`}
              style={{ border: 'none', background: activeTab === 'system' ? 'rgba(99, 102, 241, 0.1)' : 'transparent', width: '100%', cursor: 'pointer', textAlign: 'left' }}
            >
              <Shield size={18} />
              <span>System Control</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              style={{ border: 'none', background: activeTab === 'notifications' ? 'rgba(99, 102, 241, 0.1)' : 'transparent', width: '100%', cursor: 'pointer', textAlign: 'left' }}
            >
              <Bell size={18} />
              <span>Notifications</span>
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="section-card settings-content-card">
          {activeTab === 'profile' && (
            <div className="animate-fade-in">
              <h2 className="text-white mb-2" style={{ fontSize: '1.25rem' }}>Profile Settings</h2>
              <p className="text-slate-400 mb-8" style={{ fontSize: '0.875rem' }}>Update your personal details visible to other administrators.</p>

              <form onSubmit={handleProfileUpdate} style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="editor-label">Administrator Username</label>
                  <div className="input-wrapper">
                    <User size={16} className="input-icon" />
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                      className="input-auth"
                      style={{ paddingLeft: '3rem' }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="editor-label">Email Address</label>
                  <div className="input-wrapper">
                    <Mail size={16} className="input-icon" />
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="input-auth"
                      style={{ paddingLeft: '3rem' }}
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn btn-gradient" style={{ marginTop: '1rem', width: 'max-content', padding: '0.75rem 2rem', borderRadius: '0.75rem' }}>
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  <span>Save Profile</span>
                </button>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-fade-in">
              <h2 className="text-white mb-2" style={{ fontSize: '1.25rem' }}>Change Password</h2>
              <p className="text-slate-400 mb-8" style={{ fontSize: '0.875rem' }}>Protect your account with a strong, unique password.</p>

              <form onSubmit={handlePasswordChange} style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="editor-label">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="input-auth"
                    placeholder="••••••••"
                  />
                </div>
                <div className="form-group">
                  <label className="editor-label">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="input-auth"
                    placeholder="••••••••"
                  />
                </div>
                <div className="form-group">
                  <label className="editor-label">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="input-auth"
                    placeholder="••••••••"
                  />
                </div>
                <button type="submit" disabled={loading} className="btn btn-gradient" style={{ marginTop: '1rem', width: 'max-content', padding: '0.75rem 2rem', borderRadius: '0.75rem' }}>
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
                  <span>Update Password</span>
                </button>
              </form>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="animate-fade-in">
              <h2 className="text-white mb-2" style={{ fontSize: '1.25rem' }}>Global System Control</h2>
              <p className="text-slate-400 mb-8" style={{ fontSize: '0.875rem' }}>Configure high-level platform behavior and restrictions.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 600, margin: 0 }}>Maintenance Mode</p>
                    <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>When active, only admins can access the tool.</p>
                  </div>
                  <button
                    onClick={() => toggleSystemSetting('maintenanceMode')}
                    style={{ width: '48px', height: '24px', borderRadius: '12px', background: systemSettings.maintenanceMode ? 'var(--accent)' : '#1e293b', border: 'none', position: 'relative', cursor: 'pointer', transition: 'all 0.3s' }}
                  >
                    <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', left: systemSettings.maintenanceMode ? '27px' : '3px', transition: 'all 0.3s' }}></div>
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 600, margin: 0 }}>Admin Registration</p>
                    <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>Allow new administrators to sign up using the secret key.</p>
                  </div>
                  <button
                    onClick={() => toggleSystemSetting('publicSignup')}
                    style={{ width: '48px', height: '24px', borderRadius: '12px', background: systemSettings.publicSignup ? 'var(--accent)' : '#1e293b', border: 'none', position: 'relative', cursor: 'pointer', transition: 'all 0.3s' }}
                  >
                    <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', left: systemSettings.publicSignup ? '27px' : '3px', transition: 'all 0.3s' }}></div>
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 600, margin: 0 }}>Daily IP Limit</p>
                    <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>Number of free removals allowed per IP address per day.</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      value={systemSettings.usageLimit}
                      onChange={(e) => setSystemSettings({ ...systemSettings, usageLimit: e.target.value })}
                      style={{ width: '60px', padding: '0.5rem', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#fff', textAlign: 'center' }}
                    />
                    <button className="btn-icon" title="Apply"><Save size={14} /></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="animate-fade-in" style={{ textAlign: 'center', padding: '4rem 0' }}>
              <Bell size={64} className="text-slate-700 mb-4" style={{ margin: '0 auto' }} />
              <h2 className="text-white mb-2" style={{ fontSize: '1.25rem' }}>Notification Preferences</h2>
              <p className="text-slate-400" style={{ maxWidth: '400px', margin: '0 auto' }}>Email and browser notification settings are coming soon to help you stay updated with platform activity.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
