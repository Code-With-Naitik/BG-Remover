import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS } from '../data/blogData';
import { Calendar, ArrowRight, Search, Clock } from 'lucide-react';

const getReadingTime = (content) => {
  if (!content) return '1 min read';
  const words = content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200)) + ' min read';
};

const BlogListPage = () => {
  const [blogs, setBlogs] = useState(BLOG_POSTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mock_blogs');
      if (stored) {
        setBlogs(JSON.parse(stored).filter(b => b.published));
      }
    } catch (e) {
      console.error('Error loading mock blogs', e);
    }
  }, []);

  const categories = ['All', ...Array.from(new Set(blogs.map(p => (p.tags && p.tags.length > 0) ? p.tags[0] : p.category).filter(Boolean)))];

  const filteredPosts = blogs.filter(post => {
    const postCategory = (post.tags && post.tags.length > 0) ? post.tags[0] : post.category;
    const matchesCategory = activeCategory === 'All' || postCategory === activeCategory;
    const matchesSearch = post.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.length > 0 && activeCategory === 'All' && !searchQuery ? filteredPosts[0] : null;
  const regularPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

  return (
    <>
      <Helmet>
        <title>Blog — Tips, Tricks & Design Guides | Snaplix AI</title>
        <meta name="description" content="Learn how to master background removal, product photography, and digital design with the Snaplix AI blog." />
      </Helmet>

      {/* Hero Section */}
      <section style={{ padding: '6rem 0 4rem', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '80vw', height: '60vh', background: 'radial-gradient(ellipse, var(--accent-light) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-light)', border: '1px solid var(--accent)', padding: '0.4rem 1rem', borderRadius: '100px', color: 'var(--accent)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Design Resources
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              Learn, Create, <span className="gradient-text">Inspire</span>
            </h1>
            <p style={{ fontSize: '1.1875rem', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.6 }}>
              Your ultimate guide to background removal, AI photography workflows, and modern design principles.
            </p>
          </div>

          {/* Search & Filters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', marginBottom: '4rem' }}>
            {/* Search Bar */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
              <div style={{ position: 'absolute', top: '50%', left: '1.25rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  width: '100%', padding: '1.125rem 1.25rem 1.125rem 3.5rem', 
                  borderRadius: '16px', border: '1.5px solid var(--border-color)', 
                  background: 'var(--bg-card)', color: 'var(--text-primary)', 
                  fontSize: '1rem', fontWeight: 500, fontFamily: 'inherit',
                  boxShadow: 'var(--shadow-sm)', transition: 'border-color 0.2s', outline: 'none'
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
              />
            </div>

            {/* Categories */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  style={{ 
                    padding: '0.6rem 1.25rem', borderRadius: '100px', fontSize: '0.9375rem', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.2s',
                    background: activeCategory === cat ? 'var(--accent)' : 'var(--bg-card)',
                    color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                    border: `1.5px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border-color)'}`,
                    boxShadow: activeCategory === cat ? 'var(--shadow-glow)' : 'none'
                  }}
                  onMouseEnter={e => { if (activeCategory !== cat) e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                  onMouseLeave={e => { if (activeCategory !== cat) e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div style={{ marginBottom: '5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
                <span style={{ fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Featured Article</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
              </div>

              <article 
                className="card-hover" 
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0', background: 'var(--bg-card)', borderRadius: '32px', border: '1px solid var(--border-color)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}
              >
                <Link to={`/blog/${featuredPost.slug}`} style={{ display: 'block', overflow: 'hidden', minHeight: '350px' }}>
                  <img src={featuredPost.featuredImage || featuredPost.image} alt={featuredPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                </Link>
                <div style={{ padding: '3.5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{(featuredPost.tags && featuredPost.tags[0]) || featuredPost.category}</span>
                  </div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.25rem', lineHeight: 1.2 }}>
                    <Link to={`/blog/${featuredPost.slug}`} style={{ color: 'var(--text-primary)', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}>
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                    {featuredPost.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.9375rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={16} /> {new Date(featuredPost.createdAt || featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16} /> {getReadingTime(featuredPost.content)}</span>
                    </div>
                    <Link to={`/blog/${featuredPost.slug}`} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', fontWeight: 700 }}>
                      Read Article
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* Grid Posts */}
          {regularPosts.length > 0 ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>Latest Articles</h3>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                {regularPosts.map((post) => (
                  <article key={post.slug} className="card-hover" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                    <Link to={`/blog/${post.slug}`} style={{ display: 'block', height: '220px', overflow: 'hidden' }}>
                      <img src={post.featuredImage || post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                    </Link>
                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <span>{(post.tags && post.tags[0]) || post.category}</span>
                      </div>
                      <h2 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.3 }}>
                        <Link to={`/blog/${post.slug}`} style={{ color: 'var(--text-primary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}>
                          {post.title}
                        </Link>
                      </h2>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
                        {post.description}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={13} /> {new Date(post.createdAt || post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={13} /> {getReadingTime(post.content)}</span>
                        </div>
                        <Link to={`/blog/${post.slug}`} className="btn btn-ghost" style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                          <ArrowRight size={18} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--text-muted)' }}>
                <Search size={28} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No articles found</h3>
              <p style={{ color: 'var(--text-secondary)' }}>We couldn't find any articles matching your search or filter criteria.</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="btn btn-primary" style={{ marginTop: '1.5rem', borderRadius: '12px' }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogListPage;
