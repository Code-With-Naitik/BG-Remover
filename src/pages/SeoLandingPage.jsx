import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ToolPage from './ToolPage';
import AdBanner from '../components/layout/AdBanner';
import { ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';

const PAGE_CONTENT = {
  '/remove-background-online': {
    title: 'Remove Background Online — Free & Instant',
    h1: 'Remove Background Online',
    keyword: 'remove background online',
    hero: 'The fastest way to remove any image background online — no software, no Photoshop, no skills needed.',
    article: `
      <h2>The Ultimate Guide to Removing Backgrounds Online</h2>
      <p>In today's fast-paced digital world, visual content is king. Whether you are an e-commerce entrepreneur, a digital marketer, or a social media influencer, knowing how to <strong>remove background online</strong> quickly and efficiently can transform your workflow.</p>
      
      <h3>Why Use an Online Background Remover?</h3>
      <p>Traditionally, isolating a subject from its background required expensive software like Adobe Photoshop and hours of meticulous work using the Pen Tool or Magic Wand. Today, AI-powered online tools have revolutionized this process.</p>
      <ul>
        <li><strong>Speed:</strong> What used to take 15 minutes now takes under 3 seconds.</li>
        <li><strong>Accessibility:</strong> No software installation is required. It works directly in your web browser.</li>
        <li><strong>Cost-Effective:</strong> Eliminate the need for expensive graphic design retainers.</li>
      </ul>

      <h3>Top Use Cases for Transparent Images</h3>
      <p>Removing the background from an image creates a transparent PNG, which acts as a versatile digital asset.</p>
      <ul>
        <li><strong>E-commerce Product Listings:</strong> Amazon, eBay, and Shopify favor products displayed on pure white or transparent backgrounds. It increases trust and conversion rates.</li>
        <li><strong>Marketing Materials:</strong> Easily drop your product or portrait onto branded backgrounds, banners, or presentation slides.</li>
        <li><strong>Social Media:</strong> Create eye-catching YouTube thumbnails, Instagram posts, and TikTok covers.</li>
      </ul>

      <h3>How BGRemover Pro's AI Works</h3>
      <p>Our platform utilizes a state-of-the-art Convolutional Neural Network (CNN) trained on millions of images. It performs semantic segmentation, meaning it intelligently distinguishes between the foreground subject (like a person, car, or product) and the background environment. This allows it to handle complex edges like hair, fur, and glass with pixel-perfect accuracy.</p>
    `,
    faqs: [
      { q: 'Is it really free to remove backgrounds online?', a: 'Yes! BGRemover Pro offers 5 free background removals per day with no signup required.' },
      { q: 'How accurate is online background removal?', a: 'Our AI achieves professional-grade accuracy, handling complex edges like hair and fur that traditional tools struggle with.' },
      { q: 'Can I remove backgrounds from product photos?', a: 'Absolutely. Our tool is optimized for e-commerce product photos, portraits, and more.' },
      { q: 'What file formats does the online tool support?', a: 'We support JPG, PNG, and WEBP files up to 10 MB.' },
      { q: 'How long does it take to remove a background online?', a: 'Processing takes less than 3 seconds on average with our AI-optimized pipeline.' },
    ],
  },
  '/free-background-remover': {
    title: 'Free Background Remover — No Signup, No Limits',
    h1: 'Free Background Remover',
    keyword: 'free background remover',
    hero: 'Remove image backgrounds completely free. No watermarks on standard downloads. No credit card. Just upload and go.',
    article: `
      <h2>The Best Free Background Remover on the Web</h2>
      <p>Finding a reliable <strong>free background remover</strong> that doesn't ruin your image quality or plaster watermarks everywhere is challenging. BGRemover Pro was built to solve exactly this problem, providing enterprise-grade AI removal to everyone at no cost.</p>
      
      <h3>What Makes a Great Free Background Remover?</h3>
      <p>Not all free tools are created equal. When evaluating a tool to remove backgrounds, you should look for three things:</p>
      <ol>
        <li><strong>No Watermarks:</strong> Your final image should be clean and ready to use.</li>
        <li><strong>High Accuracy:</strong> The tool should preserve fine details like hair without leaving jagged edges.</li>
        <li><strong>Privacy:</strong> Your images should not be stored or used to train public AI models without your consent.</li>
      </ol>

      <h3>How to Maximize Your Free Usage</h3>
      <p>With our free plan, you receive 5 high-quality standard resolution downloads every single day. For the vast majority of social media posts, website graphics, and presentation slides, this resolution (up to 0.25 Megapixels) is absolutely perfect.</p>
      
      <h3>Step-by-Step Instructions</h3>
      <p>Using our tool is incredibly simple:</p>
      <ul>
        <li><strong>Step 1:</strong> Drag and drop your image into the upload zone above.</li>
        <li><strong>Step 2:</strong> Wait 2-3 seconds while our AI works its magic.</li>
        <li><strong>Step 3:</strong> Use the before/after slider to verify the edges.</li>
        <li><strong>Step 4:</strong> Click 'Download Free' to instantly save your transparent PNG.</li>
      </ul>
    `,
    faqs: [
      { q: 'Is this background remover truly free?', a: 'Yes. The free plan gives you 5 background removals per day with no cost and no watermark on downloads.' },
      { q: 'Do I need to create an account to use the free tool?', a: 'No account is required. Just upload your image and download the result.' },
      { q: 'What is the difference between the free and pro plan?', a: 'The free plan includes standard resolution downloads. The Pro plan unlocks HD exports, unlimited usage, and no ads.' },
      { q: 'How do I get more than 5 free removals per day?', a: 'Upgrade to the Pro plan for unlimited background removals starting at $9/month.' },
    ],
  },
  '/remove-bg-from-image': {
    title: 'Remove BG From Image — AI-Powered Tool',
    h1: 'Remove BG From Image',
    keyword: 'remove bg from image',
    hero: 'Use our AI to remove the background from any image instantly. Get a clean transparent PNG in seconds.',
    article: `
      <h2>How to Remove BG From Image Flawlessly</h2>
      <p>If you're wondering how to <strong>remove bg from image</strong> files without spending hours in complicated photo editing software, you're in the right place. Automation and Artificial Intelligence have completely changed graphic design.</p>
      
      <h3>Why Transparent Backgrounds Matter</h3>
      <p>When you remove the background from an image, the resulting file is typically saved as a PNG with an alpha channel. This transparency allows you to overlay the subject onto any other background, color, or graphic without an ugly white box surrounding it.</p>
      
      <h3>Tips for Getting the Best Results</h3>
      <p>While our AI is incredibly powerful, you can help it perform even better by following these photography tips:</p>
      <ul>
        <li><strong>Good Lighting:</strong> Ensure your subject is well-lit. Harsh shadows on the background can sometimes confuse the AI.</li>
        <li><strong>Contrast:</strong> The more contrast there is between the subject and the background, the faster and more accurate the cutout will be.</li>
        <li><strong>Focus:</strong> Keep the subject sharp. Blurry edges are difficult for any system to define perfectly.</li>
      </ul>

      <h3>What to do After Removing the BG</h3>
      <p>Once you have your isolated subject, the possibilities are endless. You can upload the transparent PNG into tools like Canva, Figma, or Adobe Express to combine it with text, shapes, and vibrant new backgrounds to create stunning marketing materials.</p>
    `,
    faqs: [
      { q: 'Can I remove the background from a JPEG image?', a: 'Yes, our tool supports JPEG, PNG, and WEBP formats.' },
      { q: 'Will removing the BG affect image quality?', a: 'No. The output is a high-quality transparent PNG that preserves your original subject perfectly.' },
      { q: 'Can I add a new background after removing the old one?', a: 'Yes — once downloaded, you can open the transparent PNG in Canva, Figma, or any editor to add a new background.' },
      { q: 'Does the tool work on complex backgrounds?', a: 'Our AI handles busy, cluttered, and gradient backgrounds with excellent precision.' },
    ],
  },
  '/background-remover-hd': {
    title: 'HD Background Remover — High-Resolution Transparent PNGs',
    h1: 'Background Remover HD',
    keyword: 'remove background in HD quality',
    hero: 'Need print-ready results? Upgrade to Pro to unlock full HD background removal up to 25 Megapixels.',
    article: `
      <h2>Professional HD Background Remover</h2>
      <p>When it comes to professional print media, billboard advertising, or high-end e-commerce, standard resolution just won't cut it. You need a dedicated <strong>HD background remover</strong> that can process massive files without losing a single pixel of detail.</p>
      
      <h3>The Importance of High Definition (HD)</h3>
      <p>Most free tools on the internet compress your images down to 0.25 Megapixels. While fine for Instagram, this ruins images intended for:</p>
      <ul>
        <li><strong>Print Advertising:</strong> Posters, flyers, and magazines require 300 DPI, demanding high-resolution source files.</li>
        <li><strong>Large Web Displays:</strong> Hero images on desktop monitors look blurry if not exported in HD.</li>
        <li><strong>Archival Quality:</strong> Photographers need to maintain the original integrity of their raw files.</li>
      </ul>

      <h3>BGRemover Pro HD Capabilities</h3>
      <p>Our Pro tier supports processing images up to 25 Megapixels. This means you can upload a massive 5000x5000 pixel image, and our AI will process the background removal at full scale, returning a pristine, uncompressed HD PNG.</p>
      
      <h3>Commercial Licensing Included</h3>
      <p>Not only do you get the best resolution possible, but HD removals on our Pro plan also come with a full commercial license. You are free to use the processed images in client work, physical products, and global ad campaigns safely and legally.</p>
    `,
    faqs: [
      { q: 'What resolution does the HD plan support?', a: 'Pro plan users get exports up to 25 Megapixels — perfect for print and large-format use.' },
      { q: 'Is HD background removal available for free?', a: 'Standard quality is free. HD exports require the Pro plan at $9/month.' },
      { q: 'Is HD removal more accurate than standard?', a: 'The same AI processes both. HD simply means the output image is higher resolution.' },
      { q: 'Can I use HD images for commercial purposes?', a: 'Yes. The Pro plan includes a commercial use license.' },
    ],
  },
};

const SeoLandingPage = ({ title, keyword }) => {
  const location = useLocation();
  const content = PAGE_CONTENT[location.pathname] || {
    title, h1: title, keyword, hero: `Use our free AI tool to ${keyword} instantly.`, faqs: [],
  };

  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{content.title} | BGRemover Pro</title>
        <meta name="description" content={content.hero} />
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
      </Helmet>

      {/* Hero */}
      <section style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            {content.h1}
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>{content.hero}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {['No signup required', 'AI-powered precision', '5 free images/day'].map(t => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                <CheckCircle size={15} color="var(--success)" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Tool */}
      <ToolPage />

      {/* SEO Article */}
      <section style={{ background: 'var(--bg-secondary)', padding: '5rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <article
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: content.article }}
          />

          {/* Internal links */}
          <div style={{ marginTop: '3rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600 }}>Related tools:</span>
            {[
              { to: '/remove-background-online', label: 'Remove Background Online' },
              { to: '/free-background-remover', label: 'Free Remover' },
              { to: '/background-remover-hd', label: 'HD Remover' },
            ].filter(l => l.to !== location.pathname).map(({ to, label }) => (
              <Link key={to} to={to} style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {label} <ArrowRight size={13} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {content.faqs.length > 0 && (
        <section style={{ padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '720px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <HelpCircle size={24} color="var(--accent)" />
              <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Frequently Asked Questions</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {content.faqs.map(({ q, a }) => (
                <details key={q} className="card" style={{ padding: '1.25rem 1.5rem', cursor: 'pointer' }}>
                  <summary style={{ fontWeight: 600, fontSize: '1rem', listStyle: 'none', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    {q}
                    <span style={{ color: 'var(--accent)', fontSize: '1.25rem', flexShrink: 0 }}>+</span>
                  </summary>
                  <p style={{ marginTop: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9375rem' }}>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SeoLandingPage;
