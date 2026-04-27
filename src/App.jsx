import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import ToolPage from './pages/ToolPage';
import PricingPage from './pages/PricingPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import SeoLandingPage from './pages/SeoLandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

function App() {
  return (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tool" element={<ToolPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            
            {/* SEO Landing Pages */}
            <Route path="/remove-background-online" element={<SeoLandingPage title="Remove Background Online" keyword="remove background online" />} />
            <Route path="/free-background-remover" element={<SeoLandingPage title="Free Background Remover" keyword="remove backgrounds for free" />} />
            <Route path="/remove-bg-from-image" element={<SeoLandingPage title="Remove BG From Image" keyword="remove bg from image" />} />
            <Route path="/background-remover-hd" element={<SeoLandingPage title="HD Background Remover" keyword="remove background in HD quality" />} />

            {/* Legal & Info */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={
              <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
                <h2>Page Coming Soon</h2>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
