import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageSquare } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const ContactPage = () => {
  const [form, setForm] = React.useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/contact', form);
      toast.success('Message sent! We\'ll get back to you within 24 hours.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us — BGRemover Pro</title>
        <meta name="description" content="Get in touch with the BGRemover Pro team. We're here to help with questions, feedback, or partnership inquiries." />
      </Helmet>
      <Toaster position="top-center" />

      <section style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <p className="section-label">Contact</p>
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>We typically respond within 24 hours on business days.</p>
        </div>
      </section>

      <section style={{ padding: '4rem 0' }}>
        <div className="container grid-2" style={{ maxWidth: '900px', alignItems: 'start' }}>
          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { icon: Mail, title: 'Email', body: 'support@bgremoverpro.com' },
              { icon: MessageSquare, title: 'Live Chat', body: 'Available Mon–Fri, 9am–6pm UTC' },
              { icon: MapPin, title: 'Location', body: 'Remote · Worldwide' },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} color="var(--accent)" />
                </div>
                <div>
                  <p style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{title}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>
            <div className="grid-2">
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Name *</label>
                <input className="input" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email *</label>
                <input className="input" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Subject</label>
              <input className="input" name="subject" placeholder="How can we help?" value={form.subject} onChange={handleChange} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Message *</label>
              <textarea className="input" name="message" placeholder="Tell us more…" rows={5} value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-gradient btn-lg" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr !important;}}`}</style>
    </>
  );
};

export default ContactPage;
