import React from 'react';
import { Helmet } from 'react-helmet-async';

const Section = ({ title, children }) => (
  <section style={{ marginBottom: '3rem' }}>
    <h2 style={{ fontSize: '1.375rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{title}</h2>
    <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9375rem' }}>{children}</div>
  </section>
);

const PrivacyPage = () => (
  <>
    <Helmet>
      <title>Privacy Policy — BGRemover Pro</title>
      <meta name="description" content="Read our Privacy Policy to understand how BGRemover Pro collects, uses, and protects your data." />
    </Helmet>
    <div className="container" style={{ maxWidth: '780px', padding: '4rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '0.9rem' }}>Last updated: April 27, 2026</p>

      <Section title="1. Information We Collect">
        <p>We collect only the minimum data necessary to provide the service:</p>
        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
          <li>Images you upload for background removal (deleted immediately after processing)</li>
          <li>IP address (for rate limiting and abuse prevention)</li>
          <li>Anonymous usage analytics (page views, tool usage counts)</li>
        </ul>
      </Section>

      <Section title="2. How We Use Your Data">
        <p>We use the data we collect to operate the service, prevent abuse, and improve our AI model accuracy. We do <strong>not</strong> sell your data to third parties, and we do not use your images to train our AI without explicit consent.</p>
      </Section>

      <Section title="3. Image Handling">
        <p>Images you upload are transmitted securely over HTTPS, forwarded to our background removal provider (remove.bg), and immediately deleted from our servers once processing is complete. We retain no copies of your original or processed images.</p>
      </Section>

      <Section title="4. Cookies & Analytics">
        <p>We use Google Analytics (anonymized IP) to understand aggregate usage patterns. We use a single functional cookie to remember your light/dark mode preference. No advertising cookies are set without your consent.</p>
      </Section>

      <Section title="5. Third-Party Services">
        <p>We integrate with remove.bg for image processing. Their privacy policy applies to data transmitted to their API. We also use Google AdSense for advertising, which may use cookies as described in Google's Privacy Policy.</p>
      </Section>

      <Section title="6. Your Rights">
        <p>Since we do not store personal data beyond your IP address (which is automatically purged after 30 days), there is nothing to delete on request. If you have concerns, please contact us at <a href="mailto:privacy@bgremoverpro.com">privacy@bgremoverpro.com</a>.</p>
      </Section>

      <Section title="7. Contact">
        <p>For any privacy-related questions, email <a href="mailto:privacy@bgremoverpro.com">privacy@bgremoverpro.com</a>.</p>
      </Section>
    </div>
  </>
);

export default PrivacyPage;
