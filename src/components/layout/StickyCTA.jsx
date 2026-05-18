import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';

const StickyCTA = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };



  if (!isVisible) return null;

  return (
    <button 
      className="scroll-to-top-btn"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ChevronUp size={24} />
      <style>{`
        .scroll-to-top-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--accent);
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
          z-index: 99;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: slideUpFade 0.4s ease forwards;
        }

        .scroll-to-top-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(99, 102, 241, 0.6);
          background: #4f46e5;
        }

        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .scroll-to-top-btn {
            bottom: 1.5rem;
            right: 1.5rem;
            width: 45px;
            height: 45px;
          }
        }
      `}</style>
    </button>
  );
};

export default StickyCTA;
