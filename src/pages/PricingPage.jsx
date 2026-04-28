import React from 'react';
import { X, Crown, Zap, CheckCircle, Sparkles, ArrowRight, ChevronDown, ShieldCheck, Star } from 'lucide-react';
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
    id: 'monthly',
    name: 'Pro Monthly',
    price: '₹750',
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
    id: 'lifetime',
    name: 'Lifetime Pro',
    price: '₹4,999',
    period: 'once',
    desc: 'The ultimate investment for power users.',
    badge: 'Best Value',
    cta: 'Get Lifetime Access',
    ctaTo: '/signup',
    highlight: false,
    color: 'purple',
    features: [
      'Everything in Pro',
      'One-time payment',
      'VIP feature access',
      'White-labeling (soon)',
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

        {/* Comparison Section */}
        <section className="comparison-section glass-card animate-slide-up">
          <div className="comparison-header">
            <ShieldCheck size={32} className="text-accent" />
            <h2>Trusted by 10,000+ Professionals</h2>
            <p>Our infrastructure is built for reliability and security.</p>
          </div>
          
          <div className="comparison-features">
            <div className="comp-item">
              <h4>99.9% Uptime</h4>
              <p>Reliable processing whenever you need it.</p>
            </div>
            <div className="comp-divider"></div>
            <div className="comp-item">
              <h4>SSL Secure</h4>
              <p>Your images and data are fully encrypted.</p>
            </div>
            <div className="comp-divider"></div>
            <div className="comp-item">
              <h4>Global API</h4>
              <p>Fast responses from our edge network.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            {FAQ.map((item, i) => (
              <div key={i} className="faq-item glass-card">
                <h4>{item.q}</h4>
                <p>{item.a}</p>
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
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
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

        /* Comparison Section */
        .comparison-section {
          text-align: center;
          padding: 4rem;
          margin-bottom: 8rem;
          border-radius: 3rem;
        }

        .comparison-header h2 {
          font-size: 2rem;
          font-weight: 900;
          margin: 1rem 0 0.5rem;
        }

        .comparison-header p {
          color: var(--text-secondary);
          font-weight: 500;
          margin-bottom: 3rem;
        }

        .comparison-features {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
        }

        .comp-item h4 {
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .comp-item p {
          font-size: 0.875rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .comp-divider {
          width: 1px;
          height: 60px;
          background: var(--border-color);
        }

        /* FAQ */
        .faq-section h2 {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 4rem;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .faq-item {
          padding: 2rem;
          border-radius: 2rem;
        }

        .faq-item h4 {
          font-size: 1.125rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .faq-item p {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.6;
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .plans-grid { grid-template-columns: 1fr; max-width: 500px; margin: 0 auto 5rem; }
          .plan-card.highlighted { transform: none; }
          .plan-card.highlighted:hover { transform: translateY(-10px); }
          .faq-grid { grid-template-columns: 1fr; }
          .comparison-features { flex-direction: column; gap: 2rem; }
          .comp-divider { width: 50%; height: 1px; }
          .pricing-header h1 { font-size: 3rem; }
        }
      `}</style>
    </div>
  );
};

export default PricingPage;
