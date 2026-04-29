import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UploadCloud } from 'lucide-react';

const StickyCTA = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on tool page, admin, or auth pages
  const hidePaths = ['/tool', '/login', '/signup', '/admin', '/dashboard'];
  if (hidePaths.some(path => location.pathname.startsWith(path))) return null;

  return (
    <button 
      className="sticky-cta"
      onClick={() => navigate('/tool')}
      aria-label="Upload Image"
    >
      <UploadCloud size={20} />
      <span>Upload Image</span>
    </button>
  );
};

export default StickyCTA;
