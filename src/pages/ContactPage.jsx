import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MapPin, MessageSquare, Phone, Building } from 'lucide-react';
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
      // Fallback to mock localStorage for UI testing when DB is offline
      const mockMsgs = JSON.parse(localStorage.getItem('mock_messages')) || [];
      const newMsg = {
        _id: Date.now().toString(),
        ...form,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('mock_messages', JSON.stringify([newMsg, ...mockMsgs]));
      toast.success('Message sent! (Mock Mode)');
      setForm({ name: '', email: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '6rem' }}>
      <Helmet>
        <title>Contact Us — Snaplix AI Customer Support</title>
        <meta name="description" content="Get in touch with the Snaplix AI team. Whether you need API integration help, billing support, or have feedback about our background removal tool, we are here for you." />
      </Helmet>
      <Toaster position="top-center" />

      {/* Hero Section */}
      <section style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '6rem 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '20%', width: '60%', height: '200%', background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ maxWidth: '700px', position: 'relative', zIndex: 10 }}>
          <p style={{ color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Contact Us</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1.25rem', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>Let's start a conversation</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1875rem', lineHeight: 1.7 }}>
            Have a question about our background removal API? Need custom enterprise pricing? Or just want to share feedback about Snaplix AI? Our team is ready to help you out.
          </p>
        </div>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '1100px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'start' }}>
          
          {/* Contact Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Get in touch</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.6 }}>
                We typically respond to all support requests within 24 hours during normal business days. For immediate API status updates, please check our status page.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { icon: Mail, title: 'Email Support', body: 'support@snaplix.ai' },
                { icon: Building, title: 'Company', body: 'Netflairs Technology Pvt. Ltd' },
                { icon: MapPin, title: 'Headquarters', body: '173, Salt Lake City, Sector - 2, Block - CL, India - 700091' },
                { icon: MessageSquare, title: 'Live Chat', body: 'Available inside the Dashboard for Pro users' },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', padding: '1rem', background: 'var(--bg-card)', borderRadius: '1rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-xs)' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={24} color="var(--accent)" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.0625rem', marginBottom: '0.25rem' }}>{title}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.4 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ background: 'var(--bg-card)', padding: '3.5rem', borderRadius: '2rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--text-primary)' }}>Send us a message</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Full Name *</label>
                  <input className="input" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required style={{ padding: '0.875rem 1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Email Address *</label>
                  <input className="input" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required style={{ padding: '0.875rem 1rem' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Subject</label>
                <input className="input" name="subject" placeholder="How can we help you today?" value={form.subject} onChange={handleChange} style={{ padding: '0.875rem 1rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Message *</label>
                <textarea className="input" name="message" placeholder="Tell us more about your inquiry..." rows={6} value={form.message} onChange={handleChange} required style={{ padding: '1rem' }} />
              </div>
              <button type="submit" className="btn btn-gradient-vibrant btn-xl" disabled={loading} style={{ width: '100%', marginTop: '0.5rem', fontWeight: 700 }}>
                {loading ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>
      </section>

      <style>{`
        @media (max-width: 992px) {
          .container { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        @media (max-width: 768px) {
          .container { padding: 0 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
