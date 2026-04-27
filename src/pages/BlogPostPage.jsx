import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import AdBanner from '../components/layout/AdBanner';
import { Clock, User, ArrowLeft, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const TwitterIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/blog/${slug}`);
        setPost(res.data.data);
      } catch {
        /* handled below */
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied!');
  };

  if (loading) {
    return (
      <div className="container" style={{ maxWidth: '780px', padding: '4rem 1.5rem' }}>
        <div className="skeleton" style={{ height: '400px', marginBottom: '2rem', borderRadius: 'var(--radius-xl)' }} />
        <div className="skeleton" style={{ height: '40px', width: '70%', marginBottom: '1rem' }} />
        <div className="skeleton" style={{ height: '20px', width: '40%', marginBottom: '2rem' }} />
        <div className="skeleton" style={{ height: '200px' }} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>Post Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>This article doesn't exist or has been moved.</p>
        <Link to="/blog" className="btn btn-gradient">Back to Blog</Link>
      </div>
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.featuredImage,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.createdAt,
    description: post.description,
    publisher: { '@type': 'Organization', name: 'BGRemover Pro' },
  };

  return (
    <>
      <Helmet>
        <title>{post.title} — BGRemover Pro Blog</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.featuredImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>
      <Toaster position="top-center" />

      {/* Hero Image */}
      <div style={{ height: '420px', position: 'relative', overflow: 'hidden' }}>
        <img src={post.featuredImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-primary) 5%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
      </div>

      {/* Article */}
      <div className="container" style={{ maxWidth: '780px', marginTop: '-120px', position: 'relative', zIndex: 1, paddingBottom: '5rem' }}>
        {/* Back link */}
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '1.5rem', textDecoration: 'none' }}>
          <ArrowLeft size={15} /> All Articles
        </Link>

        <div className="card glass" style={{ padding: '2.5rem 3rem' }}>
          {/* Tags */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {post.tags.map(tag => (
              <span key={tag} className="badge badge-accent">{tag}</span>
            ))}
          </div>

          <h1 style={{ fontSize: 'clamp(1.625rem, 3vw, 2.25rem)', marginBottom: '1.25rem', lineHeight: 1.25 }}>
            {post.title}
          </h1>

          {/* Author / meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>
                {post.author.charAt(0)}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{post.author}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                  {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginLeft: 'auto' }}>
              <Clock size={14} /> {post.readTime}
            </span>
          </div>

          <AdBanner type="inContent" />

          {/* Body */}
          <div
            className="blog-content"
            style={{ fontSize: '1.0625rem', lineHeight: 1.85, color: 'var(--text-secondary)', marginTop: '2rem' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share */}
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontWeight: 700 }}>Share this article</p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                <TwitterIcon size={15} /> Twitter
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                <LinkedinIcon size={15} /> LinkedIn
              </a>
              <button onClick={handleCopyLink} className="btn btn-outline btn-sm">
                <LinkIcon size={15} /> Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* Back to Blog CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/blog" className="btn btn-outline">
            <ArrowLeft size={16} /> See More Articles
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
