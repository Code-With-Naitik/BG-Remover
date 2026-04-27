import React from 'react';
import { Helmet } from 'react-helmet-async';

const Section = ({ title, children }) => (
  <section style={{ marginBottom: '3rem' }}>
    <h2 style={{ fontSize: '1.375rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{title}</h2>
    <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9375rem' }}>{children}</div>
  </section>
);

const TermsPage = () => (
  <>
    <Helmet>
      <title>Terms of Service — BGRemover Pro</title>
      <meta name="description" content="Read the Terms of Service for BGRemover Pro. By using our service you agree to these terms." />
    </Helmet>
    <div className="container" style={{ maxWidth: '780px', padding: '4rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Terms of Service</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '0.9rem' }}>Last updated: April 27, 2026</p>

      <Section title="1. Acceptance of Terms">
        <p>By accessing or using BGRemover Pro ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>
      </Section>

      <Section title="2. Use of the Service">
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li>You must be at least 13 years old to use the Service.</li>
          <li>Free plan usage is limited to 5 background removals per day per IP address.</li>
          <li>You may not use the Service for illegal, abusive, or harmful purposes.</li>
          <li>You may not attempt to reverse-engineer or circumvent any rate-limiting mechanisms.</li>
        </ul>
      </Section>

      <Section title="3. Content Ownership">
        <p>You retain full ownership of any images you upload. By uploading an image you grant us a temporary, limited license to process the image solely for the purpose of providing the Service.</p>
      </Section>

      <Section title="4. Free vs. Premium">
        <p>The free plan is provided as-is with no uptime guarantee. Premium subscriptions are billed monthly and may be cancelled at any time, with access continuing until the end of the current billing period.</p>
      </Section>

      <Section title="5. Disclaimer of Warranties">
        <p>The Service is provided "as is" without warranty of any kind. We do not guarantee that the AI will produce perfect results for every image. Processing accuracy may vary.</p>
      </Section>

      <Section title="6. Limitation of Liability">
        <p>To the maximum extent permitted by law, BGRemover Pro shall not be liable for any indirect, incidental, or consequential damages arising from use of the Service.</p>
      </Section>

      <Section title="7. Changes to Terms">
        <p>We may update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms.</p>
      </Section>

      <Section title="8. Contact">
        <p>Questions about these Terms? Email <a href="mailto:legal@bgremoverpro.com">legal@bgremoverpro.com</a>.</p>
      </Section>
    </div>
  </>
);

export default TermsPage;
