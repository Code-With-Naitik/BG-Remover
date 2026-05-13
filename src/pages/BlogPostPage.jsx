import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS } from '../data/blogData';
import { Calendar, User, Clock, ArrowLeft, Share2, MessageCircle, Send, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import ToolPage from './ToolPage';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  // Mock Comment State
  const [comments, setComments] = useState([
    { id: 1, author: 'Jane Doe', date: 'May 10, 2026', text: 'This was incredibly helpful! Removing backgrounds used to take me hours. Snaplix AI is a game changer.' },
    { id: 2, author: 'Mark Smith', date: 'May 11, 2026', text: 'I love how fast the AI is. Great tutorial and very well explained.' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [commentName, setCommentName] = useState('');

  if (!post) return <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}><h1>Post Not Found</h1></div>;

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Snaplix AI' },
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !commentName.trim()) {
      toast.error('Please enter your name and comment.');
      return;
    }
    const newC = {
      id: Date.now(),
      author: commentName,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      text: newComment
    };
    setComments([newC, ...comments]);
    setNewComment('');
    setCommentName('');
    toast.success('Comment posted successfully! Admin can now manage it.');
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
            <span>{post.category}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', color: 'var(--text-secondary)', fontWeight: 500 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={18} /> Snaplix Team</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={18} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
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
                <img src={post.image} alt={post.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
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

              {/* ─── Comment Section ─── */}
              <div style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <MessageCircle size={24} color="var(--accent)" /> Comments ({comments.length})
                </h3>

                {/* Add Comment Form */}
                <form onSubmit={handleAddComment} className="card" style={{ padding: '2rem', borderRadius: '24px', marginBottom: '3rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '1.5rem' }}>Leave a Reply</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={commentName}
                      onChange={e => setCommentName(e.target.value)}
                      style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
                      required
                    />
                    <textarea 
                      placeholder="Write your comment here..." 
                      rows="4"
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                      style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
                      required
                    />
                    <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', borderRadius: '12px', padding: '0.75rem 2rem' }}>
                      Post Comment
                    </button>
                  </div>
                </form>

                {/* Comment List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {comments.map((comment) => (
                    <div key={comment.id} style={{ display: 'flex', gap: '1.5rem' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.25rem', flexShrink: 0 }}>
                        {comment.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.5rem' }}>
                          <h5 style={{ fontSize: '1.0625rem', fontWeight: 800, margin: 0 }}>{comment.author}</h5>
                          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500 }}>{comment.date}</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </main>

            {/* Sidebar */}
            <aside>
              <div style={{ position: 'sticky', top: '2rem' }}>
                <div className="card" style={{ padding: '2rem', borderRadius: '24px', marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '1.5rem' }}>Share this post</h4>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline" style={{ flex: 1, padding: '0.75rem' }}><MessageCircle size={20} /></button>
                    <button className="btn btn-outline" style={{ flex: 1, padding: '0.75rem' }}><Send size={20} /></button>
                    <button className="btn btn-outline" style={{ flex: 1, padding: '0.75rem' }}><LinkIcon size={20} /></button>
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
