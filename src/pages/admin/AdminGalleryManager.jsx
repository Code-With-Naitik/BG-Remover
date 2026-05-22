import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import {
  Plus, Trash2, Edit2, Save, X, Image as ImageIcon,
  Loader2, UploadCloud, CheckCircle, AlertCircle
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '/api';
const SERVER_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace('/api', '')
  : 'http://localhost:5000';

// Helper: resolve image URL (handles relative /uploads/... paths)
const resolveImg = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads/')) return `${SERVER_BASE}${url}`;
  return url;
};

// Drag-and-drop / click upload zone for a single image
const ImageUploadZone = ({ label, preview, onFile, uploading }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handle = (file) => {
    if (file && /image\/(jpeg|jpg|png|webp)/.test(file.type)) {
      onFile(file);
    } else {
      toast.error('Only JPG, PNG or WebP images allowed');
    }
  };

  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </label>
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files[0]); }}
        style={{
          position: 'relative',
          borderRadius: '12px',
          border: `2px dashed ${dragging ? '#3b82f6' : preview ? '#10b981' : 'rgba(255,255,255,0.12)'}`,
          background: dragging ? 'rgba(59,130,246,0.07)' : 'rgba(255,255,255,0.03)',
          cursor: uploading ? 'wait' : 'pointer',
          overflow: 'hidden',
          transition: 'all 0.2s',
          minHeight: '140px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {uploading ? (
          <div style={{ textAlign: 'center', color: '#94a3b8' }}>
            <Loader2 size={28} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 0.5rem' }} />
            <p style={{ fontSize: '0.8rem', margin: 0 }}>Uploading…</p>
          </div>
        ) : preview ? (
          <>
            <img
              src={preview}
              alt={label}
              style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block', borderRadius: '10px' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.65)', borderRadius: '8px', padding: '0.25rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', color: '#fff' }}>
              <CheckCircle size={12} color="#10b981" /> Click to change
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', color: '#64748b', padding: '1.5rem' }}>
            <UploadCloud size={30} style={{ margin: '0 auto 0.5rem', color: '#475569' }} />
            <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600 }}>Drop image or click to upload</p>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.72rem' }}>JPG, PNG, WebP · Max 10MB</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          style={{ display: 'none' }}
          onChange={(e) => handle(e.target.files[0])}
        />
      </div>
    </div>
  );
};

const CATEGORIES = ['People', 'Products', 'Animals', 'Cars', 'Graphics'];

const AdminGalleryManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('People');
  const [order, setOrder] = useState(0);

  // Image file state (new files chosen by user)
  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);

  // Preview URLs (blob for new files, resolved URL for existing)
  const [beforePreview, setBeforePreview] = useState('');
  const [afterPreview, setAfterPreview] = useState('');

  // Upload progress per field
  const [uploadingBefore, setUploadingBefore] = useState(false);
  const [uploadingAfter, setUploadingAfter] = useState(false);

  // Final uploaded URLs (returned by server)
  const [beforeUrl, setBeforeUrl] = useState('');
  const [afterUrl, setAfterUrl] = useState('');

  const { token } = useAuth();

  // ── Fetch gallery ──
  const fetchItems = async () => {
    try {
      if (token === 'mock_token') {
        const mockGallery = JSON.parse(localStorage.getItem('mock_gallery')) || [];
        setItems(mockGallery);
      } else {
        const res = await axios.get(`${API_URL}/gallery`);
        setItems(res.data.data || []);
      }
    } catch {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, [token]);

  // ── Upload a single image file, return URL ──
  const uploadImage = async (file, field) => {
    if (token === 'mock_token') {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }

    const formData = new FormData();
    formData.append(field, file);

    const res = await axios.post(`${API_URL}/gallery/upload-images`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!res.data.success) throw new Error('Upload failed');
    return field === 'beforeImage' ? res.data.beforeImageUrl : res.data.afterImageUrl;
  };

  // ── Handle file selection: immediately upload ──
  const handleBeforeFile = async (file) => {
    setBeforeFile(file);
    setBeforePreview(URL.createObjectURL(file));
    setUploadingBefore(true);
    try {
      const url = await uploadImage(file, 'beforeImage');
      setBeforeUrl(url);
      toast.success('Before image uploaded ✓');
    } catch {
      toast.error('Before image upload failed');
      setBeforePreview('');
      setBeforeFile(null);
    } finally {
      setUploadingBefore(false);
    }
  };

  const handleAfterFile = async (file) => {
    setAfterFile(file);
    setAfterPreview(URL.createObjectURL(file));
    setUploadingAfter(true);
    try {
      const url = await uploadImage(file, 'afterImage');
      setAfterUrl(url);
      toast.success('After image uploaded ✓');
    } catch {
      toast.error('After image upload failed');
      setAfterPreview('');
      setAfterFile(null);
    } finally {
      setUploadingAfter(false);
    }
  };

  // ── Reset form ──
  const resetForm = () => {
    setTitle(''); setCategory('People'); setOrder(0);
    setBeforeFile(null); setAfterFile(null);
    setBeforePreview(''); setAfterPreview('');
    setBeforeUrl(''); setAfterUrl('');
    setIsEditing(false); setCurrentItem(null);
  };

  // ── Edit existing item ──
  const handleEdit = (item) => {
    setCurrentItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setOrder(item.order || 0);
    setBeforeUrl(item.beforeImage);
    setAfterUrl(item.afterImage);
    setBeforePreview(resolveImg(item.beforeImage));
    setAfterPreview(resolveImg(item.afterImage));
    setIsEditing(true);
  };

  // ── Submit form ──
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!beforeUrl || !afterUrl) {
      toast.error('Please upload both Before and After images');
      return;
    }
    if (uploadingBefore || uploadingAfter) {
      toast.error('Please wait for uploads to finish');
      return;
    }

    setSaving(true);
    const payload = {
      title,
      category,
      order: Number(order),
      beforeImage: beforeUrl,
      afterImage: afterUrl,
    };

    try {
      if (token === 'mock_token') {
        let mockGallery = JSON.parse(localStorage.getItem('mock_gallery')) || [];
        if (currentItem) {
          mockGallery = mockGallery.map(item => item._id === currentItem._id ? { ...item, ...payload } : item);
          toast.success('Gallery item updated! (Mock)');
        } else {
          mockGallery.push({ _id: Date.now().toString(), ...payload });
          toast.success('Gallery item added! (Mock)');
        }
        try {
          localStorage.setItem('mock_gallery', JSON.stringify(mockGallery));
        } catch (e) {
          toast.error('Local storage quota exceeded. Images may be too large.');
        }
      } else {
        if (currentItem) {
          await axios.put(`${API_URL}/gallery/${currentItem._id}`, payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success('Gallery item updated!');
        } else {
          await axios.post(`${API_URL}/gallery`, payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success('Gallery item added!');
        }
      }
      await fetchItems();
      resetForm();
    } catch {
      toast.error('Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // ── Delete item ──
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this gallery item?')) return;
    try {
      if (token === 'mock_token') {
        const mockGallery = JSON.parse(localStorage.getItem('mock_gallery')) || [];
        const newGallery = mockGallery.filter(item => item._id !== id);
        localStorage.setItem('mock_gallery', JSON.stringify(newGallery));
        toast.success('Deleted successfully (Mock)');
      } else {
        await axios.delete(`${API_URL}/gallery/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Deleted successfully');
      }
      fetchItems();
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading && items.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Loader2 size={44} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent)' }} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: '#fff', margin: 0, fontSize: '1.75rem' }}>Showcase Gallery</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.4rem', margin: 0 }}>
            Manage the "Before &amp; After" examples shown on your website.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-gradient"
            style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', flexShrink: 0 }}
          >
            <Plus size={18} /> Add New Example
          </button>
        )}
      </div>

      {/* ── Add / Edit Form ── */}
      {isEditing && (
        <div style={{
          marginBottom: '2.5rem',
          background: 'rgba(15,23,42,0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(59,130,246,0.35)',
          borderRadius: '1.25rem',
          padding: '2rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
            <h2 style={{ color: '#fff', margin: 0, fontSize: '1.2rem' }}>
              {currentItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
            </h2>
            <button onClick={resetForm} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.25rem' }}>
              <X size={22} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Row 1: Meta fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Title / Label *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Professional Portrait"
                  style={{
                    width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)',
                    color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit',
                    transition: 'border-color 0.2s', boxSizing: 'border-box'
                  }}
                  onFocus={e => e.target.style.borderColor = '#3b82f6'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  style={{
                    width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)',
                    color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                >
                  {CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#1e293b' }}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Order
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={e => setOrder(e.target.value)}
                  min={0}
                  style={{
                    width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)',
                    color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Row 2: Image uploads */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.75rem' }}>
              <ImageUploadZone
                label="Before Image (Original) *"
                preview={beforePreview}
                onFile={handleBeforeFile}
                uploading={uploadingBefore}
              />
              <ImageUploadZone
                label="After Image (Background Removed) *"
                preview={afterPreview}
                onFile={handleAfterFile}
                uploading={uploadingAfter}
              />
            </div>

            {/* Validation hint */}
            {(!beforeUrl || !afterUrl) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
                <AlertCircle size={15} />
                Both images are required before saving.
              </div>
            )}

            {/* Submit */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                disabled={saving || uploadingBefore || uploadingAfter || !beforeUrl || !afterUrl}
                className="btn btn-gradient"
                style={{ padding: '0.875rem 2rem', borderRadius: '0.75rem', fontSize: '0.95rem', opacity: (saving || uploadingBefore || uploadingAfter || !beforeUrl || !afterUrl) ? 0.6 : 1 }}
              >
                {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                {saving ? 'Saving…' : currentItem ? 'Update Example' : 'Save Example'}
              </button>
              <button type="button" onClick={resetForm} style={{ padding: '0.875rem 1.5rem', borderRadius: '0.75rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#94a3b8', cursor: 'pointer', fontSize: '0.9rem' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Gallery Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} style={{
              background: 'rgba(15,23,42,0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '1.25rem',
              padding: '1.25rem',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {/* Before / After Images */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem', marginBottom: '1rem' }}>
                {/* Before */}
                <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', background: 'rgba(255,255,255,0.04)', aspectRatio: '4/3' }}>
                  {item.beforeImage ? (
                    <img
                      src={resolveImg(item.beforeImage)}
                      alt="Before"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div style={{ display: item.beforeImage ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#475569', flexDirection: 'column', gap: '0.5rem' }}>
                    <ImageIcon size={28} />
                    <span style={{ fontSize: '0.7rem' }}>No image</span>
                  </div>
                  <span style={{ position: 'absolute', top: '0.4rem', left: '0.4rem', background: 'rgba(0,0,0,0.72)', padding: '0.15rem 0.5rem', borderRadius: '5px', fontSize: '0.65rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>
                    BEFORE
                  </span>
                </div>

                {/* After */}
                <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', background: 'rgba(255,255,255,0.04)', aspectRatio: '4/3' }}>
                  {item.afterImage ? (
                    <img
                      src={resolveImg(item.afterImage)}
                      alt="After"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div style={{ display: item.afterImage ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#475569', flexDirection: 'column', gap: '0.5rem' }}>
                    <ImageIcon size={28} />
                    <span style={{ fontSize: '0.7rem' }}>No image</span>
                  </div>
                  <span style={{ position: 'absolute', top: '0.4rem', right: '0.4rem', background: 'var(--accent)', padding: '0.15rem 0.5rem', borderRadius: '5px', fontSize: '0.65rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>
                    AFTER
                  </span>
                </div>
              </div>

              {/* Item Info + Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>{item.title}</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
                    <span style={{ background: 'rgba(59,130,246,0.12)', color: '#60a5fa', borderRadius: '100px', padding: '0.15rem 0.6rem', fontSize: '0.7rem', fontWeight: 700, border: '1px solid rgba(59,130,246,0.25)' }}>
                      {item.category}
                    </span>
                    <span style={{ background: 'rgba(255,255,255,0.05)', color: '#64748b', borderRadius: '100px', padding: '0.15rem 0.6rem', fontSize: '0.7rem', fontWeight: 700 }}>
                      Order: {item.order}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; }}
                    title="Edit"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.18)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{
            gridColumn: '1/-1', textAlign: 'center', padding: '5rem 2rem',
            background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem', border: '1px dashed rgba(255,255,255,0.08)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--accent)' }}>
              <ImageIcon size={36} />
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.375rem', marginBottom: '0.5rem' }}>No Gallery Items Yet</h3>
            <p style={{ color: '#64748b', marginBottom: '1.75rem', fontSize: '0.9375rem' }}>Add your first Before & After example to showcase on the homepage.</p>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-gradient"
              style={{ padding: '0.875rem 2rem', borderRadius: '0.875rem', fontWeight: 700 }}
            >
              <Plus size={18} /> Add First Example
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default AdminGalleryManager;
