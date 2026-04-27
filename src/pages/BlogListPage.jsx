import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import BlogCard from '../components/blog/BlogCard';
import AdBanner from '../components/layout/AdBanner';
import { Search } from 'lucide-react';

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/blog');
        setPosts(res.data.data);
      } catch {
        /* silent */
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const allTags = ['All', ...new Set(posts.flatMap(p => p.tags))];

  const filtered = posts.filter(p => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesTag = activeTag === 'All' || p.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  return (
    <>
      <Helmet>
        <title>Blog — Image Editing Tips & AI Tools | BGRemover Pro</title>
        <meta name="description" content="Read tutorials, tips, and news on AI image editing, background removal, and design workflows." />
      </Helmet>

      {/* Header */}
      <section style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <p className="section-label">Blog</p>
          <h1 className="section-title">Tips, Tutorials & AI News</h1>
          <p className="section-desc" style={{ margin: '0 auto 2rem' }}>Learn how to get the most out of AI image editing tools.</p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              className="input"
              style={{ paddingLeft: '2.75rem', borderRadius: 'var(--radius-full)' }}
              placeholder="Search articles…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Tags */}
      {!loading && allTags.length > 1 && (
        <div style={{ padding: '1.25rem 0', borderBottom: '1px solid var(--border-color)', overflowX: 'auto' }}>
          <div className="container" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`btn btn-sm ${activeTag === tag ? 'btn-gradient' : 'btn-outline'}`}
                style={{ flexShrink: 0 }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Articles */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <AdBanner type="horizontal" />

          {loading ? (
            <div className="grid-3" style={{ marginTop: '2rem' }}>
              {[1, 2, 3].map(i => (
                <div key={i}>
                  <div className="skeleton" style={{ height: '200px', borderRadius: 'var(--radius-lg)', marginBottom: '1rem' }} />
                  <div className="skeleton" style={{ height: '22px', width: '80%', marginBottom: '0.5rem' }} />
                  <div className="skeleton" style={{ height: '16px', width: '55%' }} />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No articles found</p>
              <p style={{ fontSize: '0.9rem' }}>Try a different search term or tag.</p>
            </div>
          ) : (
            <div className="grid-3" style={{ marginTop: '2rem' }}>
              {filtered.map(post => <BlogCard key={post._id} post={post} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogListPage;
