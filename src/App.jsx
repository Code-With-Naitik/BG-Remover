import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import { Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

// Lazy Loaded Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ToolPage = lazy(() => import('./pages/ToolPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const BlogListPage = lazy(() => import('./pages/BlogListPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const SeoLandingPage = lazy(() => import('./pages/SeoLandingPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const ComingSoon = lazy(() => import('./components/layout/ComingSoon'));

// Lazy Loaded Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminSignup = lazy(() => import('./pages/admin/AdminSignup'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminBlogList = lazy(() => import('./pages/admin/AdminBlogList'));
const AdminBlogEditor = lazy(() => import('./pages/admin/AdminBlogEditor'));
const AdminMessageList = lazy(() => import('./pages/admin/AdminMessageList'));
const AdminGalleryManager = lazy(() => import('./pages/admin/AdminGalleryManager'));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

// Loading Screen
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <Loader2 className="animate-spin text-accent" size={40} />
  </div>
);

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AdminAuthProvider>
      <ThemeProvider>
        <ScrollToTop />
        <Toaster position="top-right" />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {!isAdminRoute && <Navbar />}
          <main style={{ flex: 1 }}>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                {/* Public Routes */}
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

                {/* Admin Auth Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/signup" element={<AdminSignup />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="blogs" element={<AdminBlogList />} />
                  <Route path="blogs/new" element={<AdminBlogEditor />} />
                  <Route path="blogs/edit/:id" element={<AdminBlogEditor />} />
                  <Route path="messages" element={<AdminMessageList />} />
                  <Route path="gallery" element={<AdminGalleryManager />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>

                <Route path="*" element={<ComingSoon />} />
              </Routes>
            </Suspense>
          </main>
          {!isAdminRoute && <Footer />}
        </div>
      </ThemeProvider>
    </AdminAuthProvider>
  );
}

export default App;
