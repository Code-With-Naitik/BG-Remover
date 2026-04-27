import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { toast } from 'react-hot-toast';
import {
  Search,
  Trash2,
  Mail,
  User,
  Calendar,
  Loader2,
  MessageSquare,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const AdminMessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMessage, setExpandedMessage] = useState(null);
  const { token } = useAdminAuth();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      await axios.delete(`${API_URL}/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Message deleted successfully');
      setMessages(messages.filter(msg => msg._id !== id));
      if (expandedMessage === id) setExpandedMessage(null);
    } catch (err) {
      toast.error('Failed to delete message');
    }
  };

  const filteredMessages = messages.filter(msg =>
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="text-white">Customer Messages</h1>
        <p className="text-slate-400 mt-1">Review and manage messages from your contact form.</p>
      </div>

      <div className="admin-table-container">
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Search size={20} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email or subject..."
            className="input-auth"
            style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '0.9375rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Sender</th>
              <th style={{ width: '40%' }}>Subject & Message</th>
              <th style={{ width: '20%' }}>Date</th>
              <th style={{ width: '15%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <React.Fragment key={msg._id}>
                  <tr style={{ cursor: 'pointer' }} onClick={() => setExpandedMessage(expandedMessage === msg._id ? null : msg._id)}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>
                          {msg.name.charAt(0).toUpperCase()}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                          <p style={{ fontWeight: 600, color: '#fff', margin: 0, fontSize: '0.875rem' }}>{msg.name}</p>
                          <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>{msg.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p style={{ fontWeight: 600, color: 'var(--accent)', margin: 0, fontSize: '0.875rem' }}>
                          {msg.subject || 'No Subject'}
                        </p>
                        <p style={{ fontSize: '0.8125rem', color: '#94a3b8', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                          {msg.message}
                        </p>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="action-btns">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedMessage(expandedMessage === msg._id ? null : msg._id);
                          }}
                          className="btn-icon"
                          title="View Details"
                        >
                          {expandedMessage === msg._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(msg._id);
                          }}
                          className="btn-icon delete"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedMessage === msg._id && (
                    <tr>
                      <td colSpan="4" style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem' }}>
                        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                            <div style={{ display: 'flex', gap: '2rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                                <User size={14} className="text-accent" />
                                <span>{msg.name}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                                <Mail size={14} className="text-accent" />
                                <span>{msg.email}</span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                              <Calendar size={14} className="text-accent" />
                              <span>{new Date(msg.createdAt).toLocaleString()}</span>
                            </div>
                          </div>
                          <div style={{ marginBottom: '1rem' }}>
                            <h4 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1rem' }}>Subject: {msg.subject || 'N/A'}</h4>
                            <div style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '0.9375rem', whiteSpace: 'pre-wrap' }}>
                              {msg.message}
                            </div>
                          </div>
                          <div style={{ marginTop: '1.5rem' }}>
                            <a
                              href={`mailto:${msg.email}`}
                              className="btn btn-gradient"
                              style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}
                            >
                              <Mail size={16} />
                              Reply via Email
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                  <MessageSquare size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.2 }} />
                  <p>No messages received yet.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMessageList;
