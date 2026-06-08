import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS } from '../data/blogData';
import { Calendar, User, Clock, ArrowLeft, Share2, MessageCircle, Send, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/blog/${slug}`, { timeout: 8000 });
        if (res.data?.success && res.data.data) {
          setPost(res.data.data);
        } else {
          // Fallback to local storage or mock
          const stored = localStorage.getItem('mock_blogs');
          if (stored) {
            const found = JSON.parse(stored).find(p => p.slug === slug);
            if (found) setPost(found);
          }
        }
      } catch (err) {
        console.warn('API failed to fetch single blog post. Falling back to local data.', err.message);
        try {
          const stored = localStorage.getItem('mock_blogs');
          if (stored) {
            const found = JSON.parse(stored).find(p => p.slug === slug);
            if (found) {
              setPost(found);
              return;
            }
          }
        } catch (e) {}
        
        // Fallback to static client data
        const staticPost = BLOG_POSTS.find((p) => p.slug === slug);
        if (staticPost) setPost(staticPost);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ width: '48px', height: '48px', border: '4px solid var(--border-color)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Post Not Found</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>The article you are looking for does not exist or has been removed.</p>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    );
  }

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.featuredImage || post.image,
    datePublished: post.createdAt || post.date,
    author: { '@type': 'Organization', name: 'Snaplix AI' },
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Snaplix AI Blog</title>
        <meta name="description" content={post.description} />
        <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>
      </Helmet>

      {/* Hero */}
      <section style={{ padding: '6rem 0 4rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <Link to="/blog" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: 600, textDecoration: 'none', marginBottom: '2.5rem' }}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
            <span>{(post.tags && post.tags[0]) || post.category}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', color: 'var(--text-secondary)', fontWeight: 500 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={18} /> Snaplix Team</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={18} /> {new Date(post.createdAt || post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={18} /> 6 min read</div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section style={{ padding: '4rem 0 8rem' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="blog-layout">
            
            {/* Main Content */}
            <main>
              <div style={{ borderRadius: '32px', overflow: 'hidden', marginBottom: '4rem', boxShadow: 'var(--shadow-xl)' }}>
                <img src={post.featuredImage || post.image} alt={post.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>

              <article 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Ready Action */}
              <div style={{ marginTop: '5rem', padding: '3rem', background: 'var(--bg-secondary)', borderRadius: '32px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1rem' }}>Ready to remove backgrounds?</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.125rem' }}>Experience the fastest AI background remover today.</p>
                <Link to="/tool" className="btn btn-primary btn-xl">Try Snaplix AI Now</Link>
              </div>

            </main>

            {/* Sidebar */}
            <aside>
              <div style={{ position: 'sticky', top: '2rem' }}>
                <div className="card" style={{ padding: '2rem', borderRadius: '24px', marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '1.5rem' }}>Share this post</h4>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button aria-label="Copy post link" className="btn btn-outline" style={{ flex: 1, padding: '0.75rem' }} onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied to clipboard!'); }}><LinkIcon size={20} /></button>
                    <button aria-label="Share on Twitter" className="btn btn-outline" style={{ flex: 1, padding: '0.75rem' }} onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}><Send size={20} /></button>
                    <button aria-label="Share on WhatsApp" className="btn btn-outline" style={{ flex: 1, padding: '0.75rem' }} onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`, '_blank')}><MessageCircle size={20} /></button>
                  </div>
                </div>

                <div className="card" style={{ padding: '2rem', borderRadius: '24px', background: 'var(--accent-gradient)', color: '#fff' }}>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>Unlock HD Results</h4>
                  <p style={{ marginBottom: '2rem', opacity: 0.9, lineHeight: 1.6 }}>Get 100% precision and high-resolution exports with Snaplix Pro.</p>
                  <Link to="/pricing" className="btn btn-primary" style={{ background: '#fff', color: 'var(--accent)', width: '100%' }}>View Plans</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Responsive Styles */}
      <style>{`
        .blog-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 4rem;
        }
        @media (max-width: 991px) {
          .blog-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          aside {
            order: 2;
          }
          main {
            order: 1;
          }
        }
      `}</style>
    </>
  );
};

export default BlogPostPage;
