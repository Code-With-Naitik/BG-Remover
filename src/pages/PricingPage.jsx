import React from 'react';
import { X, Crown, Zap, CheckCircle, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
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
    ctaClass: 'bg-white border-2 border-slate-200 text-slate-900 hover:border-slate-300 hover:bg-slate-50',
    highlight: false,
    features: [
      { label: '5 free images daily', included: true },
      { label: 'Standard resolution (0.25 MP)', included: true },
      { label: 'Transparent PNG downloads', included: true },
      { label: 'Personal use license', included: true },
      { label: 'Email support', included: false },
      { label: 'Commercial use rights', included: false },
      { label: 'High-resolution (25 MP)', included: false },
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
    ctaTo: '/checkout?plan=monthly',
    ctaClass: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100',
    highlight: true,
    features: [
      { label: 'Unlimited removals', included: true },
      { label: 'HD quality (up to 25 MP)', included: true },
      { label: 'Commercial license', included: true },
      { label: 'Priority processing', included: true },
      { label: 'No ads or watermarks', included: true },
      { label: 'API access (100 credits)', included: true },
      { label: '24/7 Priority support', included: true },
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
    ctaTo: '/checkout?plan=lifetime',
    ctaClass: 'bg-slate-900 text-white hover:bg-black',
    highlight: false,
    features: [
      { label: 'Everything in Pro', included: true },
      { label: 'One-time payment', included: true },
      { label: 'VIP feature access', included: true },
      { label: 'White-labeling (coming soon)', included: true },
      { label: 'Custom API limits', included: true },
      { label: 'Dedicated account manager', included: true },
      { label: 'Future-proof access', included: true },
    ],
  },
];

const FAQ = [
  { q: 'How many images can I process for free?', a: 'Our Starter plan allows up to 5 background removals per day at standard resolution. It is 100% free forever.' },
  { q: 'What is included in the Pro plan?', a: 'The Pro plan gives you unlimited high-definition removals, a commercial license, priority processing, and API access.' },
  { q: 'Do you offer a refund policy?', a: 'Yes, if you are not satisfied with our Pro features, contact us within 7 days for a full refund evaluation.' },
  { q: 'Can I cancel my subscription anytime?', a: 'Absolutely. You can cancel your monthly subscription at any time from your dashboard. No hidden fees.' },
  { q: 'Is my data secure?', a: 'We prioritize privacy. All images are processed securely and deleted from our servers immediately after processing.' },
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
    <div className="bg-[#fcfcfd] min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <style>{`
        @keyframes mesh-1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(5%, 5%) scale(1.05); } }
        @keyframes mesh-2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-5%, 8%) scale(1.1); } }
        @keyframes mesh-3 { 0%, 100% { transform: translate(8%, -5%) scale(1.08); } 50% { transform: translate(0, 0) scale(1); } }
        .mesh-orb { filter: blur(120px); opacity: 0.12; position: absolute; border-radius: 50%; pointer-events: none; transition: opacity 0.5s ease; }
        .pricing-card-shadow { box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.02), 0 12px 24px rgba(0,0,0,0.04); }
        .pricing-card-shadow-active { box-shadow: 0 0 0 1px rgba(79,70,229,0.1), 0 20px 40px -12px rgba(79,70,229,0.15); }
      `}</style>

      <Helmet>
        <title>Pricing Plans — BGRemover Pro</title>
        <meta name="description" content="Affordable and transparent pricing for professional AI background removal." />
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-36 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="mesh-orb bg-indigo-500 w-[800px] h-[800px] -top-96 -left-48 animate-[mesh-1_20s_infinite_ease-in-out]"></div>
          <div className="mesh-orb bg-violet-400 w-[600px] h-[600px] top-96 -right-48 animate-[mesh-2_25s_infinite_ease-in-out]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-10 rounded-full bg-slate-50 border border-slate-200/60 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Pricing Built for Creators</span>
          </div>
          <h1 className="text-6xl md:text-[92px] font-black text-slate-900 mb-10 tracking-[-0.05em] leading-[0.85] max-w-5xl mx-auto">
            Choose the <span className="text-indigo-600 relative inline-block">
              Perfect
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-indigo-100" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q25 0 50 5 T100 5" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span> Plan
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium tracking-tight">
            Transparent, simple, and designed to scale with your ambitions. No hidden fees, ever.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
            {PLANS.map(plan => (
              <div
                key={plan.id}
                className={`group relative flex flex-col p-12 rounded-[3.5rem] bg-white transition-all duration-700 ${
                  plan.highlight 
                    ? 'pricing-card-shadow-active scale-[1.03] z-10' 
                    : 'pricing-card-shadow border border-slate-100/50 hover:scale-[1.01] hover:border-slate-200'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-6 left-12 px-6 py-2.5 bg-indigo-600 text-white text-[10px] font-black rounded-full flex items-center gap-2 shadow-2xl shadow-indigo-200 tracking-widest uppercase">
                    <Crown size={12} className="fill-current" /> {plan.badge}
                  </div>
                )}

                <div className="mb-12">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400">{plan.name}</h3>
                    {plan.id === 'lifetime' && <Sparkles size={20} className="text-yellow-400 animate-pulse" />}
                  </div>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-7xl font-black text-slate-900 tracking-[-0.06em] leading-none">{plan.price}</span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">/ {plan.period}</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed font-semibold min-h-[48px] pr-4">{plan.desc}</p>
                </div>

                <Link
                  to={plan.ctaTo}
                  className={`flex items-center justify-center gap-3 w-full py-6 px-10 rounded-3xl font-black text-xs tracking-[0.2em] uppercase transition-all duration-500 transform group-hover:translate-y-[-2px] group-hover:shadow-lg active:translate-y-0 ${plan.ctaClass}`}
                >
                  {plan.highlight && <Zap size={16} className="fill-current text-yellow-400" />}
                  {plan.cta}
                </Link>

                <div className="mt-16 pt-16 border-t border-slate-100 space-y-6 flex-grow">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-300 mb-6">Included Features</p>
                  {plan.features.map(({ label, included }) => (
                    <div key={label} className="flex items-start gap-4 transition-opacity duration-300">
                      <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${included ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'bg-slate-50 text-slate-300'}`}>
                        {included ? <CheckCircle size={16} strokeWidth={2.5} /> : <X size={16} strokeWidth={2.5} />}
                      </div>
                      <span className={`text-[15px] font-bold tracking-tight ${included ? 'text-slate-700' : 'text-slate-400/80 line-through decoration-slate-200'}`}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-[-0.03em]">The Full Breakdown</h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Compare our plans side-by-side and choose the one that fits your workflow.</p>
          </div>
          
          <div className="rounded-[3rem] border border-slate-100/80 overflow-hidden shadow-2xl shadow-slate-100/50 bg-[#fdfdfd]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-slate-100">
                  <th className="py-10 px-10 text-[11px] font-black uppercase tracking-[0.25em] text-slate-300 w-1/3">Core Features</th>
                  <th className="py-10 px-10 text-sm font-black text-slate-900 uppercase tracking-widest text-center">Starter</th>
                  <th className="py-10 px-10 text-sm font-black text-indigo-600 uppercase tracking-widest text-center bg-indigo-50/20">Pro Access</th>
                  <th className="py-10 px-10 text-sm font-black text-slate-900 uppercase tracking-widest text-center">Lifetime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { f: 'Daily Images', free: '5 Images', pro: 'Unlimited', life: 'Unlimited' },
                  { f: 'Max Resolution', free: '0.25 MP', pro: '25 MP (HD)', life: '25 MP (HD)' },
                  { f: 'Commercial Use', free: <X className="text-slate-300 mx-auto" size={18} />, pro: <CheckCircle className="text-emerald-500 mx-auto" size={18} />, life: <CheckCircle className="text-emerald-500 mx-auto" size={18} /> },
                  { f: 'Processing Priority', free: 'Standard', pro: 'High', life: 'Ultra VIP' },
                  { f: 'API Credits', free: '-', pro: '100 / mo', life: '500 / mo' },
                  { f: 'White-Labeling', free: <X className="text-slate-300 mx-auto" size={18} />, pro: <X className="text-slate-300 mx-auto" size={18} />, life: 'Available' },
                  { f: 'Support Level', free: 'Self-help', pro: '24/7 Priority', life: 'Direct Concierge' },
                ].map((row, i) => (
                  <tr key={i} className="group transition-all hover:bg-slate-50/50">
                    <td className="py-8 px-10 text-[15px] font-bold text-slate-700">{row.f}</td>
                    <td className="py-8 px-10 text-sm font-medium text-slate-500 text-center">{row.free}</td>
                    <td className="py-8 px-10 text-sm font-black text-indigo-600 text-center bg-indigo-50/10 group-hover:bg-indigo-50/20">{row.pro}</td>
                    <td className="py-8 px-10 text-sm font-bold text-slate-900 text-center">{row.life}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="relative overflow-hidden p-16 md:p-28 rounded-[5rem] bg-[#0c0e14] text-white">
            <div className="absolute inset-0 pointer-events-none">
               <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[120%] bg-indigo-500/10 blur-[140px] rounded-full"></div>
               <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-violet-500/10 blur-[100px] rounded-full"></div>
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black tracking-widest uppercase">
                  Enterprise Solutions
                </div>
                <h3 className="text-5xl md:text-[80px] font-black mb-10 tracking-[-0.05em] leading-[0.85]">Scaling <br/><span className="text-indigo-400 italic">Fast?</span></h3>
                <p className="text-xl text-slate-400 leading-relaxed font-medium mb-12 max-w-md">
                  Get high-volume API access, custom SLAs, and white-label tools for your entire team.
                </p>
                <Link to="/contact" className="group inline-flex items-center gap-3 px-12 py-6 bg-white text-slate-900 font-black rounded-[2.5rem] hover:bg-indigo-50 transition-all uppercase tracking-[0.2em] text-[12px] shadow-2xl shadow-white/5">
                  Talk to Sales <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { l: 'API Requests', v: '10M+' },
                  { l: 'Server Uptime', v: '99.99%' },
                  { l: 'Setup Fee', v: '$0' },
                  { l: 'Integration', v: 'Custom' },
                ].map(stat => (
                  <div key={stat.l} className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl hover:bg-white/[0.06] transition-all hover:translate-y-[-5px]">
                    <p className="text-4xl font-black mb-2 tracking-tight">{stat.v}</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">{stat.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Common Questions</h2>
            <p className="text-xl text-slate-500 font-medium italic">Everything you need to know about our plans.</p>
          </div>
          <div className="space-y-8">
            {FAQ.map(({ q, a }) => (
              <details
                key={q}
                className="group border border-slate-100 rounded-[3rem] bg-[#fbfbfb] transition-all duration-500 open:bg-white open:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.06)]"
              >
                <summary className="flex items-center justify-between p-10 cursor-pointer list-none font-black text-slate-800 text-xl leading-snug tracking-tight">
                  {q}
                  <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-indigo-600 transition-all duration-500 group-open:rotate-180 group-open:bg-indigo-600 group-open:text-white shadow-sm">
                    <ChevronDown size={24} />
                  </div>
                </summary>
                <div className="px-10 pb-10 text-slate-500 text-lg leading-relaxed font-medium">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
