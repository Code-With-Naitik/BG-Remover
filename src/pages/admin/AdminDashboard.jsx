import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  ImageIcon
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token, API_URL]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const statCards = [
    { name: 'Total Images Processed', value: stats?.stats?.totalRemovals || 0, icon: ImageIcon, color: 'bg-blue-500' },
    { name: 'Blog Posts Published', value: stats?.stats?.totalBlogs || 0, icon: FileText, color: 'bg-purple-500' },
    { name: 'Gallery Showcase', value: stats?.stats?.totalGallery || 0, icon: ImageIcon, color: 'bg-orange-500' },
    { name: 'Contact Messages', value: stats?.stats?.totalMessages || 0, icon: MessageSquare, color: 'bg-emerald-500' },
  ];

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
      <div>
        <h1 className="text-white">Dashboard Overview</h1>
        <p className="text-slate-400 mt-1">Welcome back to the BG Remover control center.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statCards.map((stat) => (
          <div key={stat.name} className="stat-card">
            <div className="stat-info">
              <p>{stat.name}</p>
              <h3>{stat.value}</h3>
            </div>
            <div className="stat-icon-box" style={{backgroundColor: stat.color === 'bg-blue-500' ? '#3b82f6' : stat.color === 'bg-purple-500' ? '#a855f7' : stat.color === 'bg-emerald-500' ? '#10b981' : '#f97316'}}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        {/* Recent Messages */}
        <div className="section-card">
          <div className="section-header">
            <h2 className="text-white" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem'}}>
              <MessageSquare size={20} style={{color: '#10b981'}} />
              Recent Messages
            </h2>
            <button className="btn btn-ghost btn-sm">View All</button>
          </div>
          <div>
            {stats?.recentActivity?.messages?.length > 0 ? (
              stats.recentActivity.messages.map((msg) => (
                <div key={msg._id} className="activity-item">
                  <div>
                    <p style={{fontWeight: 600, color: '#f1f5f9', margin: 0}}>{msg.name}</p>
                    <p style={{fontSize: '0.875rem', color: '#94a3b8', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical'}}>{msg.message}</p>
                  </div>
                  <span style={{fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap'}}>
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <div style={{padding: '2rem', textAlign: 'center', color: '#64748b', fontStyle: 'italic'}}>No recent messages</div>
            )}
          </div>
        </div>

        {/* Recent Removals Activity */}
        <div className="section-card">
          <div className="section-header">
            <h2 className="text-white" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem'}}>
              <TrendingUp size={20} style={{color: '#3b82f6'}} />
              Usage Activity
            </h2>
            <button className="btn btn-ghost btn-sm">Analytics</button>
          </div>
          <div>
            {stats?.recentActivity?.removals?.length > 0 ? (
              stats.recentActivity.removals.map((log) => (
                <div key={log._id} className="activity-item">
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <div style={{width: '36px', height: '36px', borderRadius: '8px', background: '#1e293b', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#3b82f6'}}>
                      <ImageIcon size={18} style={{margin: '0 auto'}}/>
                    </div>
                    <div>
                      <p style={{fontWeight: 600, color: '#f1f5f9', margin: 0}}>Image Processed</p>
                      <p style={{fontSize: '0.75rem', color: '#64748b', margin: 0}}>IP: {log.ip.replace(/\d+$/, '***')}</p>
                    </div>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <p style={{fontSize: '0.875rem', fontWeight: 700, color: '#fff', margin: 0}}>{log.count} reqs</p>
                    <p style={{fontSize: '0.75rem', color: '#64748b', margin: 0}}>{log.date}</p>
                  </div>
                </div>
              ))
            ) : (
              <div style={{padding: '2rem', textAlign: 'center', color: '#64748b', fontStyle: 'italic'}}>No recent usage activity</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
