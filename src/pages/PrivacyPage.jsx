import React from 'react';
import { Helmet } from 'react-helmet-async';

const Section = ({ title, children }) => (
  <section style={{ marginBottom: '3.5rem' }}>
    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{title}</h2>
    <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.125rem' }}>{children}</div>
  </section>
);

const PrivacyPage = () => (
  <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '6rem', paddingBottom: '6rem' }}>
    <Helmet>
      <title>Privacy Policy — Snaplix AI | Secure Background Remover</title>
      <meta name="description" content="Read the Snaplix AI Privacy Policy. We guarantee 100% data privacy for your images when using our AI background remover and photo editing tools." />
    </Helmet>
    <div className="container" style={{ maxWidth: '850px' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Data Security</p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Last updated: May 18, 2026</p>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '3.5rem', borderRadius: '2rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
        <Section title="1. Introduction and Core Philosophy">
          <p style={{ marginBottom: '1.5rem' }}>
            At <strong>Snaplix AI</strong>, we believe that your digital assets and personal data belong entirely to you. When you use our industry-leading background removal tool, AI upscale features, or photo enhancement services, you are trusting us with your files. This Privacy Policy outlines our strict guidelines on how we collect, process, and secure your information.
          </p>
          <p>
            Our core promise is simple: <strong>We process your images directly in memory and delete them instantly after your download is complete or your session expires.</strong> We do not train our AI models on your private images without your explicit consent.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p style={{ marginBottom: '1rem' }}>To provide you with lightning-fast, high-quality AI photo editing, we collect the bare minimum amount of data:</p>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><strong>Uploaded Images:</strong> The photographs or graphics you upload specifically for background removal or editing.</li>
            <li><strong>Technical Data:</strong> Your IP address, browser type, and device information to ensure our servers route your request efficiently and to prevent abuse.</li>
            <li><strong>Account Information:</strong> If you choose to register for a Snaplix AI Pro account, we collect your email address and name.</li>
            <li><strong>Analytics:</strong> Anonymous usage metrics (such as the number of images processed per hour) to help us scale our server infrastructure.</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Data">
          <p style={{ marginBottom: '1.5rem' }}>We only use the data we collect to operate and improve our service. Specifically, we use your data to:</p>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li>Execute the AI background removal algorithm accurately on your specific uploaded file.</li>
            <li>Manage your subscription, credits, and billing if you are a premium user.</li>
            <li>Prevent fraudulent activity, scraping, and abuse of our free tier.</li>
          </ul>
          <p style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'var(--accent-light)', color: 'var(--text-primary)', borderRadius: '1rem', fontWeight: 500 }}>
            <strong style={{ color: 'var(--accent)' }}>Zero Data Selling:</strong> We have never, and will never, sell your personal information, images, or metadata to third-party data brokers or advertising networks.
          </p>
        </Section>

        <Section title="4. Image Handling & Data Retention">
          <p style={{ marginBottom: '1.5rem' }}>
            Security is built into the architecture of Snaplix AI. When you upload an image for background removal:
          </p>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li>Files are transmitted over a secure, enterprise-grade HTTPS encrypted connection (TLS 1.3).</li>
            <li>Your images are processed temporarily on our secure servers or via our trusted processing partners (such as remove.bg) depending on server load.</li>
            <li><strong>Instant Deletion:</strong> Processed files are wiped from our active servers immediately. We retain no copies of your original photos or the resulting transparent PNGs.</li>
          </ul>
        </Section>

        <Section title="5. Cookies & Third-Party Tracking">
          <p style={{ marginBottom: '1.5rem' }}>
            We utilize standard web technologies like cookies to provide a seamless user experience. We use functional cookies to remember your theme preferences (Dark/Light mode) and keep you logged into your account.
          </p>
          <p>
            We also use privacy-first analytics tools to understand aggregate user behavior. You can opt-out of non-essential cookies via your browser settings at any time without affecting the core functionality of the background remover.
          </p>
        </Section>

        <Section title="6. Your Data Rights (GDPR & CCPA Compliant)">
          <p style={{ marginBottom: '1.5rem' }}>
            Whether you are located in the European Union, California, or anywhere else in the world, we grant you the right to:
          </p>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li>Access the personal data we hold about you (which is typically just your email if registered).</li>
            <li>Request immediate deletion of your account and associated billing data.</li>
            <li>Opt-out of any marketing communications instantly.</li>
          </ul>
        </Section>

        <Section title="7. Contact Our Privacy Team">
          <p>
            If you have any questions about this Privacy Policy, our data handling practices, or if you wish to exercise your data rights, please contact our Data Protection Officer at:
          </p>
          <p style={{ marginTop: '1rem' }}>
            <a href="mailto:privacy@snaplix.ai" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>privacy@snaplix.ai</a>
          </p>
        </Section>
      </div>
    </div>
  </div>
);

export default PrivacyPage;
