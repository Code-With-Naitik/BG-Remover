import React, { useState } from 'react';
import { X, Crown, Zap, CheckCircle, Sparkles, ArrowRight, ChevronDown, ShieldCheck, Star, Activity, Lock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const PLANS = [
  {
    id: 'free',
    name: 'Starter',
    price: '₹0',
    period: 'forever',
    desc: 'Perfect for quick edits and personal projects.',
    badge: null,
    cta: 'Get Started',
    ctaTo: '/tool',
    highlight: false,
    color: 'slate',
    features: [
      '5 free images daily',
      'Standard resolution (0.25 MP)',
      'Transparent PNG downloads',
      'Personal use license',
    ],
  },
  {
    id: 'weekly',
    name: 'Pro Weekly',
    price: '₹29',
    period: 'week',
    desc: 'Short term access for quick professional tasks.',
    badge: null,
    cta: 'Get Weekly Plan',
    ctaTo: '/signup',
    highlight: false,
    color: 'blue',
    features: [
      'Unlimited removals',
      'HD quality (up to 25 MP)',
      'Commercial license',
      'Priority processing',
    ],
  },
  {
    id: 'monthly',
    name: 'Pro Monthly',
    price: '₹99',
    period: 'mo',
    desc: 'Full power for professional creators and teams.',
    badge: 'Popular Choice',
    cta: 'Unlock Pro Access',
    ctaTo: '/signup',
    highlight: true,
    color: 'indigo',
    features: [
      'Unlimited removals',
      'HD quality (up to 25 MP)',
      'Commercial license',
      'Priority processing',
      'No ads or watermarks',
      'API access (100 credits)',
    ],
  },
  {
    id: 'yearly',
    name: 'Pro Yearly',
    price: '₹499',
    period: 'year',
    desc: 'The ultimate investment for power users.',
    badge: 'Best Value',
    cta: 'Get Yearly Access',
    ctaTo: '/signup',
    highlight: false,
    color: 'purple',
    features: [
      'Everything in Pro Monthly',
      'Save over 50% vs monthly',
      'VIP feature access',
      'Custom API limits',
      'Dedicated manager',
    ],
  },
];

const FAQ = [
  { q: 'How many images can I process for free?', a: 'Our Starter plan allows up to 5 background removals per day at standard resolution. It is 100% free forever.' },
  { q: 'What is included in the Pro plan?', a: 'The Pro plan gives you unlimited high-definition removals, a commercial license, priority processing, and API access.' },
  { q: 'Do you offer a refund policy?', a: 'Yes, if you are not satisfied with our Pro features, contact us within 7 days for a full refund evaluation.' },
  { q: 'Can I cancel my subscription anytime?', a: 'Absolutely. You can cancel your monthly subscription at any time from your dashboard. No hidden fees.' },
];

const PricingPage = () => {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <div className="pricing-page">
      <Helmet>
        <title>Pricing Plans — Snaplix AI</title>
        <meta name="description" content="Affordable and transparent pricing for professional AI background removal." />
      </Helmet>

      {/* Decorative Background */}
      <div className="pricing-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="pricing-content">
        {/* Header */}
        <header className="pricing-header animate-fade-in">
          <div className="header-badge">
            <Star size={14} className="text-amber-500 fill-current" />
            <span>Pricing built for creators</span>
          </div>
          <h1>Choose the <span className="gradient-text">Perfect</span> Plan</h1>
          <p>Transparent, simple, and designed to scale with your ambitions. No hidden fees, ever.</p>
        </header>

        {/* Plans Grid */}
        <div className="plans-grid">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`plan-card ${plan.highlight ? 'highlighted' : ''} color-${plan.color}`}
            >
              {plan.badge && (
                <div className="plan-badge">
                  <span>{plan.badge}</span>
                </div>
              )}

              <div className="plan-main">
                <div className="plan-info">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="currency">{plan.price.charAt(0)}</span>
                    <span className="amount">{plan.price.slice(1)}</span>
                    <span className="period">/{plan.period}</span>
                  </div>
                  <p className="plan-desc">{plan.desc}</p>
                </div>

                <div className="plan-cta">
                  <Link to={plan.ctaTo} className="btn-cta">
                    {plan.cta}
                    <ArrowRight size={18} />
                  </Link>
                </div>

                <div className="plan-features">
                  <span className="features-label">What's included:</span>
                  <ul className="features-list">
                    {plan.features.map((feature, i) => (
                      <li key={i}>
                        <CheckCircle size={18} className="check-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Infrastructure / Trust Section */}
        <section className="infrastructure-section animate-slide-up">
          <div className="infra-content">
            <div className="infra-header">
              <div className="infra-icon-wrap">
                <ShieldCheck size={28} className="text-white" />
              </div>
              <h2>Enterprise-Grade Infrastructure</h2>
              <p>Trusted by 10,000+ professionals. Built for absolute reliability, security, and global scale.</p>
            </div>
            
            <div className="infra-grid">
              <div className="infra-card">
                <div className="infra-card-icon">
                  <Activity size={24} color="var(--emerald)" />
                </div>
                <h4>99.99% Uptime</h4>
                <p>Reliable processing whenever you need it, backed by redundant server architecture.</p>
              </div>
              
              <div className="infra-card">
                <div className="infra-card-icon">
                  <Lock size={24} color="var(--accent)" />
                </div>
                <h4>SSL Secure</h4>
                <p>Military-grade 256-bit encryption. Your images and data are fully protected.</p>
              </div>
              
              <div className="infra-card">
                <div className="infra-card-icon">
                  <Globe size={24} color="#a855f7" />
                </div>
                <h4>Global CDN</h4>
                <p>Lightning-fast API responses from our globally distributed edge network.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section animate-slide-up">
          <div className="faq-header">
            <div className="faq-badge">Got Questions?</div>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about the product and billing.</p>
          </div>
          <div className="faq-list">
            {FAQ.map((item, i) => (
              <div 
                key={i} 
                className={`faq-accordion-item ${openFaq === i ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                <div className="faq-question">
                  <h4>{item.q}</h4>
                  <div className="faq-icon-wrapper">
                    <ChevronDown size={20} className="faq-icon" />
                  </div>
                </div>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .pricing-page {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          position: relative;
          overflow-x: hidden;
          padding: 8rem 2rem 4rem;
        }

        .pricing-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.1;
        }

        .blob-1 { width: 600px; height: 600px; background: var(--accent); top: -100px; right: -200px; }
        .blob-2 { width: 500px; height: 500px; background: #a855f7; bottom: -100px; left: -200px; }
        .blob-3 { width: 300px; height: 300px; background: #ec4899; top: 40%; left: 20%; }

        .pricing-content {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 0.5rem 1rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
        }

        .pricing-header h1 {
          font-size: 4rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        .pricing-header p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 500;
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 8rem;
        }

        .plan-card {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 2.5rem;
          padding: 3rem 2.5rem;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .plan-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px -12px rgba(0,0,0,0.1);
          border-color: var(--accent);
        }

        .plan-card.highlighted {
          background: var(--bg-card);
          border-color: var(--accent);
          box-shadow: 0 20px 40px -12px rgba(99, 102, 241, 0.15);
          transform: scale(1.05);
          z-index: 5;
        }

        .plan-card.highlighted:hover {
          transform: scale(1.08) translateY(-10px);
        }

        .plan-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent-gradient);
          color: white;
          padding: 0.4rem 1.25rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
          white-space: nowrap;
        }

        .plan-info h3 {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .plan-price {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }

        .plan-price .currency { font-size: 1.5rem; font-weight: 800; color: var(--text-muted); }
        .plan-price .amount { font-size: 3.5rem; font-weight: 900; color: var(--text-primary); letter-spacing: -0.05em; }
        .plan-price .period { font-size: 1rem; font-weight: 700; color: var(--text-muted); }

        .plan-desc {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 2rem;
          font-weight: 500;
        }

        .plan-cta {
          margin-bottom: 2.5rem;
        }

        .btn-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          padding: 1.25rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 1.25rem;
          color: var(--text-primary);
          font-weight: 800;
          text-decoration: none;
          transition: all 0.3s;
        }

        .highlighted .btn-cta {
          background: var(--accent-gradient);
          color: white;
          border: none;
          box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2);
        }

        .btn-cta:hover {
          background: var(--border-color);
          transform: translateY(-2px);
        }

        .highlighted .btn-cta:hover {
          background: var(--accent-gradient);
          opacity: 0.9;
          box-shadow: 0 15px 30px rgba(99, 102, 241, 0.3);
        }

        .features-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.25rem;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .features-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .check-icon {
          color: var(--emerald);
          flex-shrink: 0;
        }

        /* Infrastructure / Trust Section */
        .infrastructure-section {
          position: relative;
          margin-bottom: 8rem;
          border-radius: 3rem;
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
          border: 1px solid var(--border-color);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .infra-content {
          padding: 5rem 4rem;
          position: relative;
          z-index: 2;
        }

        .infra-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .infra-icon-wrap {
          width: 64px;
          height: 64px;
          background: var(--accent-gradient);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
          transform: rotate(-5deg);
        }

        .infra-header h2 {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .infra-header p {
          color: var(--text-secondary);
          font-size: 1.125rem;
          font-weight: 500;
          max-width: 600px;
          margin: 0 auto;
        }

        .infra-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .infra-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 2.5rem 2rem;
          border-radius: 2rem;
          text-align: left;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-sm);
        }

        .infra-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-glow);
          border-color: var(--accent);
        }

        .infra-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .infra-card h4 {
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .infra-card p {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.6;
          font-weight: 500;
        }

        /* FAQ Section */
        .faq-section {
          max-width: 800px;
          margin: 0 auto 8rem;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .faq-badge {
          display: inline-block;
          padding: 0.4rem 1.25rem;
          background: var(--bg-secondary);
          color: var(--accent);
          border: 1px solid var(--border-color);
          border-radius: 100px;
          font-size: 0.8125rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
        }

        .faq-section h2 {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .faq-section p {
          color: var(--text-secondary);
          font-size: 1.125rem;
          font-weight: 500;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-accordion-item {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1.5rem;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .faq-accordion-item:hover {
          border-color: var(--accent);
          box-shadow: var(--shadow-sm);
        }

        .faq-accordion-item.open {
          border-color: var(--accent);
          box-shadow: var(--shadow-glow);
        }

        .faq-question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
        }

        .faq-question h4 {
          font-size: 1.125rem;
          font-weight: 700;
          margin: 0;
          color: var(--text-primary);
        }

        .faq-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .faq-accordion-item:hover .faq-icon-wrapper {
          background: var(--accent-light);
          color: var(--accent);
        }

        .faq-accordion-item.open .faq-icon-wrapper {
          background: var(--accent);
          color: white;
        }

        .faq-icon {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .faq-accordion-item.open .faq-icon {
          transform: rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease-in-out, opacity 0.3s ease;
          opacity: 0;
        }

        .faq-accordion-item.open .faq-answer {
          max-height: 200px;
          opacity: 1;
        }

        .faq-answer p {
          padding: 0 2rem 1.5rem;
          margin: 0;
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 1200px) {
          .plans-grid { grid-template-columns: repeat(2, 1fr); max-width: 800px; margin: 0 auto 5rem; }
          .plan-card.highlighted { transform: none; }
          .plan-card.highlighted:hover { transform: translateY(-10px); }
        }
        @media (max-width: 768px) {
          .plans-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto 5rem; }
          .infra-grid { grid-template-columns: 1fr; }
          .infra-content { padding: 3rem 2rem; }
          .pricing-header h1 { font-size: 3rem; }
          .faq-question { padding: 1.25rem 1.5rem; }
          .faq-answer p { padding: 0 1.5rem 1.25rem; }
        }
      `}</style>
    </div>
  );
};

export default PricingPage;
