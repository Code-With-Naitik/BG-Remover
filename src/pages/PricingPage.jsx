import React from 'react';
import { Check, X, Crown, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdBanner from '../components/layout/AdBanner';
import { Helmet } from 'react-helmet-async';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Perfect for occasional personal use.',
    badge: null,
    cta: 'Get Started Free',
    ctaTo: '/tool',
    ctaClass: 'btn-outline',
    highlight: false,
    features: [
      { label: '5 images per day', included: true },
      { label: 'Standard quality (0.25 MP)', included: true },
      { label: 'Transparent PNG download', included: true },
      { label: 'Personal use only', included: true },
      { label: 'Ad-supported experience', included: false },
      { label: 'HD downloads (up to 25 MP)', included: false },
      { label: 'Unlimited removals', included: false },
      { label: 'Commercial license', included: false },
      { label: 'API access', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    desc: 'For creators, marketers, and professionals.',
    badge: 'Most Popular',
    cta: 'Upgrade to Pro',
    ctaTo: '/pricing',
    ctaClass: 'btn-gradient',
    highlight: true,
    features: [
      { label: '5 images per day', included: true },
      { label: 'Standard quality (0.25 MP)', included: true },
      { label: 'Transparent PNG download', included: true },
      { label: 'Personal use only', included: true },
      { label: 'No ads', included: true },
      { label: 'HD downloads (up to 25 MP)', included: true },
      { label: 'Unlimited removals', included: true },
      { label: 'Commercial license', included: true },
      { label: 'API access (100 credits/mo)', included: true },
    ],
  },
];

const FAQ = [
  { q: 'How many free images can I process per day?', a: 'On the free plan you can remove backgrounds from up to 5 images per day. Upgrade to Pro for unlimited usage.' },
  { q: 'What image formats are supported?', a: 'We support JPG, PNG, and WEBP images up to 10 MB in size.' },
  { q: 'Can I use the output images commercially?', a: 'Free plan is for personal use only. The Pro plan includes a full commercial license.' },
  { q: 'Do I need to create an account?', a: 'No account is required for the free plan. Just upload and download.' },
  { q: 'Can I cancel my Pro subscription anytime?', a: 'Yes, you can cancel at any time with no questions asked. You retain access until the end of your billing period.' },
];

const PricingPage = () => {
  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Pricing — BGRemover Pro</title>
        <meta name="description" content="Choose a plan that fits your needs. Free for basic use, Pro for unlimited HD background removals and commercial use." />
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
      </Helmet>

      {/* Header */}
      <section style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <p className="section-label">Pricing</p>
          <h1 className="section-title">Simple, Transparent Pricing</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Start free — no credit card required. Upgrade when you need more.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="grid-2" style={{ alignItems: 'start' }}>
            {PLANS.map(plan => (
              <div
                key={plan.name}
                className="card"
                style={{
                  border: plan.highlight ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                  background: plan.highlight ? 'var(--accent-light)' : 'var(--bg-card)',
                  position: 'relative',
                  padding: '2rem',
                }}
              >
                {plan.badge && (
                  <div style={{
                    position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--accent-gradient)', color: '#fff',
                    padding: '0.25rem 1rem', borderRadius: 'var(--radius-full)',
                    fontSize: '0.8125rem', fontWeight: 700, whiteSpace: 'nowrap',
                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                  }}>
                    <Crown size={13} /> {plan.badge}
                  </div>
                )}

                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{plan.name}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: '2.5rem', letterSpacing: '-0.04em' }}>{plan.price}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/ {plan.period}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>{plan.desc}</p>
                </div>

                <Link to={plan.ctaTo} className={`btn ${plan.ctaClass}`} style={{ width: '100%', marginBottom: '1.75rem', justifyContent: 'center' }}>
                  {plan.highlight && <Zap size={16} />} {plan.cta}
                </Link>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {plan.features.map(({ label, included }) => (
                    <li key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.9375rem', color: included ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                      {included
                        ? <Check size={16} color="var(--success)" style={{ flexShrink: 0 }} />
                        : <X size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                      }
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Enterprise */}
          <div className="card" style={{ marginTop: '2rem', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.375rem' }}>Need Enterprise?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Volume API, custom SLAs, dedicated support, and team billing.</p>
            </div>
            <Link to="/contact" className="btn btn-outline" style={{ flexShrink: 0 }}>Contact Sales</Link>
          </div>
        </div>
      </section>

      {/* Ad */}
      <div className="container" style={{ maxWidth: '860px' }}>
        <AdBanner type="horizontal" />
      </div>

      {/* FAQ */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem', textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FAQ.map(({ q, a }) => (
              <details
                key={q}
                className="card"
                style={{ padding: '1.25rem 1.5rem', cursor: 'pointer' }}
              >
                <summary style={{ fontWeight: 600, fontSize: '1rem', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  {q}
                  <span style={{ fontSize: '1.25rem', color: 'var(--accent)', flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ marginTop: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9375rem' }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingPage;
