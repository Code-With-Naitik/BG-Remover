import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Image as ImageIcon, 
  MousePointer2,
  Calendar,
  Loader2
} from 'lucide-react';

const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin/analytics`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data.data);
      } catch (err) {
        console.error('Analytics Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
    
    // Set up auto-update interval (every 30 seconds)
    const interval = setInterval(fetchAnalytics, 30000);

    return () => clearInterval(interval);
  }, [token, API_URL]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  // Mock data if real data is empty
  const chartData = data?.usageTrends?.length > 0 ? data.usageTrends : [
    { date: '2026-04-21', removals: 12 },
    { date: '2026-04-22', removals: 18 },
    { date: '2026-04-23', removals: 45 },
    { date: '2026-04-24', removals: 30 },
    { date: '2026-04-25', removals: 25 },
    { date: '2026-04-26', removals: 60 },
    { date: '2026-04-27', removals: 35 },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <div>
          <h1 className="text-white">Performance Analytics</h1>
          <p className="text-slate-400 mt-1">Detailed breakdown of tool usage and user traffic.</p>
        </div>
        <div style={{
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          background: 'rgba(16, 185, 129, 0.1)', 
          padding: '0.5rem 1rem', 
          borderRadius: '2rem',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            background: '#10b981',
            borderRadius: '50%',
            boxShadow: '0 0 10px #10b981',
            animation: 'pulse 2s infinite'
          }}></span>
          <span style={{color: '#10b981', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em'}}>LIVE AUTO-UPDATE</span>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem'}}>
        {/* Main Usage Chart */}
        <div className="section-card" style={{padding: '2rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
            <h3 className="text-white" style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
              <TrendingUp size={20} className="text-accent" />
              Removal Trends (Last 7 Days)
            </h3>
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <span className="status-chip" style={{background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent)'}}>Daily</span>
            </div>
          </div>
          
          <div style={{width: '100%', height: '350px'}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRemovals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#64748b" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(str) => {
                    const date = new Date(str);
                    return date.toLocaleDateString('en-US', { weekday: 'short' });
                  }}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: '#0f172a', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.75rem',
                    color: '#fff'
                  }}
                  itemStyle={{ color: 'var(--accent)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="removals" 
                  stroke="var(--accent)" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRemovals)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Panel */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <div className="stat-card" style={{flex: 1}}>
            <div className="stat-info">
              <p>Active Users</p>
              <h3>1,284</h3>
              <div style={{marginTop: '1rem', color: '#10b981', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                <TrendingUp size={12} />
                <span>+14% from yesterday</span>
              </div>
            </div>
            <div className="stat-icon-box" style={{background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6'}}>
              <Users size={24} />
            </div>
          </div>

          <div className="stat-card" style={{flex: 1}}>
            <div className="stat-info">
              <p>Success Rate</p>
              <h3>99.2%</h3>
              <div style={{marginTop: '1rem', color: '#10b981', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                <TrendingUp size={12} />
                <span>Steady performance</span>
              </div>
            </div>
            <div className="stat-icon-box" style={{background: 'rgba(16, 185, 129, 0.1)', color: '#10b981'}}>
              <ImageIcon size={24} />
            </div>
          </div>

          <div className="stat-card" style={{flex: 1}}>
            <div className="stat-info">
              <p>Avg. Processing</p>
              <h3>1.4s</h3>
              <div style={{marginTop: '1rem', color: '#f59e0b', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                <Calendar size={12} />
                <span>Last 24 hours</span>
              </div>
            </div>
            <div className="stat-icon-box" style={{background: 'rgba(249, 115, 22, 0.1)', color: '#f97316'}}>
              <MousePointer2 size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Row */}
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'}}>
        <div className="section-card" style={{padding: '2rem'}}>
          <h3 className="text-white mb-8" style={{fontSize: '1.125rem'}}>Traffic Sources</h3>
          <div style={{width: '100%', height: '250px'}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Direct', value: 400 },
                { name: 'Search', value: 300 },
                { name: 'Social', value: 200 },
                { name: 'Referral', value: 100 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.03)'}} contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem' }} />
                <Bar dataKey="value" fill="var(--accent)" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="section-card" style={{padding: '2rem'}}>
          <h3 className="text-white mb-8" style={{fontSize: '1.125rem'}}>Geographic Distribution</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
            {[
              { country: 'United States', percentage: 42, color: 'var(--accent)' },
              { country: 'India', percentage: 28, color: '#9333ea' },
              { country: 'United Kingdom', percentage: 15, color: '#10b981' },
              { country: 'Canada', percentage: 10, color: '#3b82f6' },
              { country: 'Others', percentage: 5, color: '#64748b' }
            ].map((item) => (
              <div key={item.country}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem'}}>
                  <span className="text-slate-300">{item.country}</span>
                  <span className="text-white font-bold">{item.percentage}%</span>
                </div>
                <div style={{width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden'}}>
                  <div style={{width: `${item.percentage}%`, height: '100%', background: item.color}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
