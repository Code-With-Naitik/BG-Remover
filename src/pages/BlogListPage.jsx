import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS } from '../data/blogData';
import { Calendar, ArrowRight, User } from 'lucide-react';

const BlogListPage = () => {
  return (
    <>
      <Helmet>
        <title>Blog — Tips, Tricks & Design Guides | Snaplix AI</title>
        <meta name="description" content="Learn how to master background removal, product photography, and digital design with the Snaplix AI blog." />
      </Helmet>

      <section style={{ padding: '6rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Design <span className="gradient-text">Resources</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
              Your ultimate guide to background removal, AI photography, and modern design workflows.
            </p>
          </div>

          <div className="grid-3">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="card card-hover" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', background: 'white', borderRadius: '32px' }}>
                <Link to={`/blog/${post.slug}`} style={{ display: 'block', height: '240px', overflow: 'hidden' }}>
                  <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="blog-thumb" />
                </Link>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
                    <span>{post.category}</span>
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.3 }}>
                    <Link to={`/blog/${post.slug}`} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                      {post.title}
                    </Link>
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
                    {post.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      <Calendar size={14} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <Link to={`/blog/${post.slug}`} className="btn btn-ghost" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogListPage;
