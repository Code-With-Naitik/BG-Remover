import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import {
  Save,
  ArrowLeft,
  Loader2,
  Image as ImageIcon,
  CheckCircle,
  Eye
} from 'lucide-react';

const AdminBlogEditor = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    featuredImage: '',
    tags: '',
    published: true,
    readTime: ''
  });

  useEffect(() => {
    if (isEdit) {
      const fetchBlog = async () => {
        try {
          // Note: we need a special route to get post by ID, or use slug. 
          // Let's assume we can get by ID for admin.
          // Wait, I didn't add a "get by ID" route. Let's add it to the backend or use the slug if we have it.
          // Actually, let's just use the admin-all and find the one. 
          // Or better, let's use the ID in the backend. I added PUT /:id, let's add GET /post/:id.
          const res = await axios.get(`${API_URL}/blog/admin-all`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const blog = res.data.data.find(b => b._id === id);
          if (blog) {
            setFormData({
              ...blog,
              tags: blog.tags.join(', ')
            });
          } else {
            toast.error('Blog post not found');
            navigate('/admin/blogs');
          }
        } catch (err) {
          toast.error('Failed to fetch blog');
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id, isEdit, token, API_URL, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-generate slug from title
    if (name === 'title' && !isEdit) {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    try {
      if (isEdit) {
        await axios.put(`${API_URL}/blog/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Blog updated successfully');
      } else {
        await axios.post(`${API_URL}/blog`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Blog created successfully');
      }
      navigate('/admin/blogs');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save blog');
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    const toastId = toast.loading('Uploading image...');
    try {
      const res = await axios.post(`${API_URL}/upload`, formDataUpload, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}` 
        }
      });
      setFormData(prev => ({ ...prev, featuredImage: res.data.url }));
      toast.success('Image uploaded successfully', { id: toastId });
    } catch (err) {
      toast.error('Upload failed', { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/admin/blogs')} className="btn-icon">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-white">{isEdit ? 'Edit Blog Post' : 'Create New Post'}</h1>
            <p className="text-slate-400 mt-1">
              {isEdit ? 'Update your existing blog post details.' : 'Share a new article with your audience.'}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="button"
            onClick={() => window.open(`/blog/${formData.slug}`, '_blank')}
            className="btn btn-ghost"
            style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem' }}
            disabled={!formData.slug}
          >
            <Eye size={20} />
            <span>Preview</span>
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-gradient"
            style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem' }}
            disabled={submitting}
          >
            {submitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            <span>{isEdit ? 'Update Post' : 'Publish Post'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="editor-form">
        <div className="editor-main">
          <div className="editor-container">
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="editor-label">Post Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="editor-input"
                placeholder="Enter a catchy title..."
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="editor-label">Content (Markdown supported)</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="editor-input editor-textarea"
                placeholder="Write your story here..."
                required
              />
            </div>
          </div>
        </div>

        <div className="editor-sidebar">
          <div className="editor-container">
            <h3 className="text-white mb-10" style={{ fontSize: '1.125rem' }}>Publishing Details</h3>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="editor-label">URL Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="editor-input"
                style={{ fontSize: '0.875rem' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="editor-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="editor-input"
                style={{ minHeight: '100px', fontSize: '0.875rem' }}
                placeholder="Short excerpt for SEO..."
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="editor-label">Featured Image URL</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleChange}
                  className="editor-input"
                  style={{ paddingLeft: '2.5rem', fontSize: '0.875rem' }}
                  placeholder="https://..."
                />
                <label 
                  htmlFor="blog-image-upload" 
                  style={{ 
                    position: 'absolute', 
                    left: '0.75rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  className="text-accent hover:text-white transition-colors"
                  title="Upload Image"
                >
                  <ImageIcon size={18} />
                </label>
                <input 
                  type="file" 
                  id="blog-image-upload" 
                  style={{ display: 'none' }} 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="editor-label">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="editor-input"
                style={{ fontSize: '0.875rem' }}
                placeholder="tech, images, guide"
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="editor-label">Read Time (e.g. 5 min read)</label>
              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                className="editor-input"
                style={{ fontSize: '0.875rem' }}
                placeholder="5 min read"
              />
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem' }}>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-white" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Published Status</span>
              </label>
              <p className="text-slate-400 mt-1" style={{ fontSize: '0.75rem' }}>
                Draft posts will not be visible to the public.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogEditor;
