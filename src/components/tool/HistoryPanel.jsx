import React, { useState, useEffect } from 'react';
import { Trash2, Download } from 'lucide-react';

const HistoryPanel = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
    // Also listen for changes to history from other parts of the app (like when processing a new image)
    window.addEventListener('storage', loadHistory);
    // Custom event to force update
    window.addEventListener('history_updated', loadHistory);
    return () => {
      window.removeEventListener('storage', loadHistory);
      window.removeEventListener('history_updated', loadHistory);
    };
  }, []);

  const loadHistory = () => {
    try {
      const historyStr = localStorage.getItem('bgremover_history');
      if (historyStr) {
        setHistory(JSON.parse(historyStr));
      }
    } catch (e) {
      console.error('Failed to load history', e);
    }
  };

  const removeHistoryItem = (id) => {
    try {
      const updatedHistory = history.filter(item => item.id !== id);
      setHistory(updatedHistory);
      localStorage.setItem('bgremover_history', JSON.stringify(updatedHistory));
      // Dispatch event to sync other tabs if needed
      window.dispatchEvent(new Event('history_updated'));
    } catch (e) {
      console.error('Failed to remove item', e);
    }
  };

  const handleDownload = (processedUrl) => {
    const link = document.createElement('a');
    link.href = processedUrl;
    link.download = `bgremover-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (history.length === 0) return null;

  return (
    <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Recent Processed Images</h3>
        <span className="badge badge-accent">{history.length} / 5 Saved</span>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {history.map((item) => (
          <div key={item.id} className="card card-hover" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative' }}>
            
            {/* Delete Button */}
            <button
              onClick={() => removeHistoryItem(item.id)}
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--danger)',
                color: '#fff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                boxShadow: 'var(--shadow-md)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              title="Remove from history"
            >
              <Trash2 size={14} />
            </button>

            <div className="checkerboard" style={{ 
              borderRadius: 'var(--radius-md)',
              height: '140px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
            }}>
              <img 
                src={item.processed} 
                alt="Processed result" 
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                {new Date(item.date).toLocaleDateString()}
              </p>
              <button 
                onClick={() => handleDownload(item.processed)}
                style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                title="Download"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;
