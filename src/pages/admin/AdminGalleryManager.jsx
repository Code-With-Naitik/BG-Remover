import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Image as ImageIcon,
  Loader2,
  Grid,
  Filter
} from 'lucide-react';

const AdminGalleryManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'People',
    beforeImage: '',
    afterImage: '',
    order: 0
  });

  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/gallery`);
      setItems(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch gallery items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'People',
      beforeImage: '',
      afterImage: '',
      order: 0
    });
    setIsEditing(false);
    setCurrentItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentItem) {
        await axios.put(`${API_URL}/gallery/${currentItem._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Gallery item updated');
      } else {
        await axios.post(`${API_URL}/gallery`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Gallery item added');
      }
      fetchItems();
      resetForm();
    } catch (err) {
      toast.error('Operation failed');
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      beforeImage: item.beforeImage,
      afterImage: item.afterImage,
      order: item.order || 0
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this gallery item?')) return;

    try {
      await axios.delete(`${API_URL}/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Deleted successfully');
      fetchItems();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="text-white">Showcase Gallery</h1>
          <p className="text-slate-400 mt-1">Manage the "Before & After" examples shown on your website.</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-gradient"
            style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem' }}
          >
            <Plus size={20} />
            <span>Add New Example</span>
          </button>
        )}
      </div>

      {isEditing && (
        <div className="editor-container" style={{ marginBottom: '3rem', border: '1px solid var(--accent)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 className="text-white" style={{ fontSize: '1.25rem' }}>{currentItem ? 'Edit Example' : 'Add New Example'}</h2>
            <button onClick={resetForm} className="btn-icon">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="editor-label">Title / Label</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="editor-input"
                  placeholder="e.g. Professional Portrait"
                  required
                />
              </div>

              <div className="form-group">
                <label className="editor-label">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="editor-input"
                >
                  <option value="People">People</option>
                  <option value="Products">Products</option>
                  <option value="Animals">Animals</option>
                  <option value="Cars">Cars</option>
                  <option value="Graphics">Graphics</option>
                </select>
              </div>

              <div className="form-group">
                <label className="editor-label">Display Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="editor-input"
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="editor-label">Before Image URL</label>
                <input
                  type="text"
                  name="beforeImage"
                  value={formData.beforeImage}
                  onChange={handleChange}
                  className="editor-input"
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="editor-label">After Image URL</label>
                <input
                  type="text"
                  name="afterImage"
                  value={formData.afterImage}
                  onChange={handleChange}
                  className="editor-input"
                  placeholder="https://..."
                  required
                />
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-gradient" style={{ flex: 1, padding: '1rem', borderRadius: '0.75rem' }}>
                  <Save size={20} />
                  <span>{currentItem ? 'Update Example' : 'Save Example'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className="section-card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <img src={item.beforeImage} alt="Before" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '0.75rem' }} />
                  <span style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: 'rgba(0,0,0,0.6)', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.7rem' }}>BEFORE</span>
                </div>
                <div style={{ flex: 1, position: 'relative' }}>
                  <img src={item.afterImage} alt="After" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '0.75rem' }} />
                  <span style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'var(--accent)', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.7rem' }}>AFTER</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, color: '#fff' }}>{item.title}</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <span className="status-chip" style={{ fontSize: '0.65rem', padding: '0.1rem 0.5rem', background: 'rgba(255,255,255,0.05)' }}>{item.category}</span>
                    <span className="status-chip" style={{ fontSize: '0.65rem', padding: '0.1rem 0.5rem', background: 'rgba(255,255,255,0.05)' }}>Order: {item.order}</span>
                  </div>
                </div>
                <div className="action-btns">
                  <button onClick={() => handleEdit(item)} className="btn-icon">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="btn-icon delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{
            gridColumn: '1/-1',
            textAlign: 'center',
            padding: '6rem 2rem',
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(10px)',
            borderRadius: '2rem',
            border: '1px dashed rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              background: 'rgba(99, 102, 241, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              color: 'var(--accent)'
            }}>
              <ImageIcon size={40} />
            </div>
            <h3 className="text-white mb-2" style={{ fontSize: '1.5rem' }}>No Showcase Items</h3>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-gradient"
              style={{ padding: '1rem 2rem', borderRadius: '1rem', fontWeight: 700 }}
            >
              <Plus size={20} />
              Add First Example
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGalleryManager;
