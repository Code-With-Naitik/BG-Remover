import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Map, ArrowRight, Sparkles, Globe, ShieldCheck, Mail } from 'lucide-react';

const SitemapPage = () => {
  const sections = [
    {
      title: 'Core Tools',
      icon: <Sparkles size={20} className="text-indigo-600" />,
      links: [
        { to: '/', label: 'Home Page' },
        { to: '/tool', label: 'Background Remover Tool' },
        { to: '/pricing', label: 'Pricing Plans' },
      ]
    },
    {
      title: 'SEO Solutions',
      icon: <Globe size={20} className="text-blue-600" />,
      links: [
        { to: '/remove-background-online', label: 'Remove Background Online' },
        { to: '/free-background-remover', label: 'Free Background Remover' },
        { to: '/remove-bg-from-image', label: 'Remove BG From Image' },
        { to: '/background-remover-hd', label: 'Background Remover HD' },
      ]
    },
    {
      title: 'Resources',
      icon: <Map size={20} className="text-emerald-600" />,
      links: [
        { to: '/blog', label: 'Our Blog' },
        { to: '/about', label: 'About Snaplix AI' },
        { to: '/contact', label: 'Contact Support' },
      ]
    },
    {
      title: 'Account',
      icon: <ShieldCheck size={20} className="text-amber-600" />,
      links: [
        { to: '/login', label: 'Sign In' },
        { to: '/signup', label: 'Create Account' },
        { to: '/dashboard', label: 'User Dashboard' },
      ]
    },
    {
      title: 'Legal',
      icon: <Mail size={20} className="text-slate-600" />,
      links: [
        { to: '/privacy-policy', label: 'Privacy Policy' },
        { to: '/terms', label: 'Terms of Service' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-24">
      <Helmet>
        <title>Sitemap — Snaplix AI</title>
        <meta name="description" content="Sitemap for Snaplix AI. Find all our tools, blog posts, and legal pages in one place." />
      </Helmet>

      {/* Header */}
      <section className="bg-white border-b border-slate-100 pt-32 pb-16 text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 mb-6">
             <Map size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Sitemap</h1>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">
            Can't find what you're looking for? Here's a complete list of all the pages on our platform.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-5xl mt-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                {section.icon}
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest">{section.title}</h2>
              </div>
              <ul className="space-y-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      to={link.to} 
                      className="group flex items-center justify-between text-slate-600 hover:text-indigo-600 font-bold transition-all"
                    >
                      {link.label}
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SitemapPage;
