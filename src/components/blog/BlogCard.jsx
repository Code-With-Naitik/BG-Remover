import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Tag, ArrowRight } from 'lucide-react';

const BlogCard = ({ post }) => (
  <Link
    to={`/blog/${post.slug}`}
    style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
  >
    <article
      className="card card-hover"
      style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {/* Image */}
      <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
        <img
          src={post.featuredImage}
          alt={post.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        {/* Tags overlay */}
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} className="badge badge-accent" style={{ fontSize: '0.75rem', backdropFilter: 'blur(8px)', background: 'rgba(99,102,241,0.85)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.75rem' }}>
        <h3 style={{ fontSize: '1.125rem', lineHeight: 1.4, color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {post.title}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>
          {post.description}
        </p>

        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.875rem', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <User size={13} /> {post.author}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Clock size={13} /> {post.readTime}
          </span>
        </div>
      </div>
    </article>
  </Link>
);

export default BlogCard;
