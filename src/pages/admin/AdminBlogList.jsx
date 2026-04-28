import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Loader2,
  FileText
} from 'lucide-react';

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/blog/admin-all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await axios.delete(`${API_URL}/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Blog deleted successfully');
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (err) {
      toast.error('Failed to delete blog');
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="section-header">
        <div>
          <h1 className="text-white">Manage Blogs</h1>
          <p className="text-slate-400 mt-1">Create, edit, and delete your blog posts.</p>
        </div>
        <Link to="/admin/blogs/new" className="btn btn-gradient">
          <Plus size={20} />
          <span>New Post</span>
        </Link>
      </div>

      <div className="admin-table-container">
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Search size={20} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search by title..."
            className="input-auth"
            style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '0.9375rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Post Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <tr key={blog._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {blog.featuredImage ? (
                        <img src={blog.featuredImage} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FileText size={20} className="text-slate-400" />
                        </div>
                      )}
                      <div>
                        <p style={{ fontWeight: 600, color: '#fff', margin: 0 }}>{blog.title}</p>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>{blog.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-chip ${blog.published ? 'status-published' : 'status-draft'}`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <Link to={`/admin/blogs/edit/${blog._id}`} className="btn-icon" title="Edit">
                        <Edit size={16} />
                      </Link>
                      <button onClick={() => handleDelete(blog._id)} className="btn-icon delete" title="Delete">
                        <Trash2 size={16} />
                      </button>
                      <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer" className="btn-icon" title="View Page">
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                  No blog posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlogList;
