'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { GenieMark } from '@/components/common/GenieMark';
import { LinkedinIcon, InstagramIcon, FacebookIcon, XIcon } from '@/components/common/BrandIcons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState('');

  const onNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    } else if (!emailPattern.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setJoined(true);
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo" aria-label="Home">
              <GenieMark width={32} />
              <span className="footer-logo-text">| dev</span>
            </Link>
            <p className="footer-desc">
              Innovating at the intersection of design and technology to create exceptional digital
              experiences that drive growth and empower businesses worldwide.
            </p>
            <div className="social-row" aria-label="Social links">
              <a href="https://linkedin.com" className="social-btn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon size={18} />
              </a>
              <a href="https://x.com" className="social-btn" aria-label="X" target="_blank" rel="noopener noreferrer">
                <XIcon size={16} />
              </a>
              <a href="https://instagram.com" className="social-btn" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <InstagramIcon size={18} />
              </a>
              <a href="https://facebook.com" className="social-btn" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <FacebookIcon size={17} />
              </a>
            </div>
          </div>

          <div className="footer-connect">
            <h2 id="footer-loop-heading" className="footer-heading">
              Stay in the loop
            </h2>
            <p className="footer-newsletter-copy">
              Subscribe to our newsletter for the latest tech insights and company updates.
            </p>
            <form className="newsletter-form" onSubmit={onNewsletterSubmit} noValidate>
              <label htmlFor="footer-email" className="visually-hidden">
                Email address
              </label>
              <div className="newsletter-field">
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className={`newsletter-input ${error ? 'input-error' : ''}`}
                />
                <button type="submit" className="newsletter-join">
                  Join
                </button>
              </div>
              {error ? (
                <p className="error-hint" role="alert">
                  {error}
                </p>
              ) : null}
            </form>
            {joined ? (
              <p className="newsletter-thanks" role="status">
                Thanks — you&apos;re on the list.
              </p>
            ) : null}

            <div className="footer-contact-lines">
              <a
                href="mailto:geniedev.noreply@gmail.com?subject=Project%20Inquiry"
                className="contact-line"
              >
                <span className="contact-icon" aria-hidden>
                  <Mail size={16} strokeWidth={2} />
                </span>
                geniedev.noreply@gmail.com
              </a>
              <a href="tel:+233539433339" className="contact-line">
                <span className="contact-icon" aria-hidden>
                  <Phone size={16} strokeWidth={2} />
                </span>
                +233 53 943 3339
              </a>
              <div className="contact-line">
                <span className="contact-icon" aria-hidden>
                  <MapPin size={16} strokeWidth={2} />
                </span>
                <span>Accra, Ghana</span>
              </div>
            </div>
          </div>

          <nav className="footer-nav" aria-labelledby="footer-company-heading">
            <h2 id="footer-company-heading" className="footer-heading">
              Company
            </h2>
            <Link href="/">Home</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact us</Link>
          </nav>

          <nav className="footer-nav" aria-labelledby="footer-services-heading">
            <h2 id="footer-services-heading" className="footer-heading">
              Services
            </h2>
            <Link href="/services#web-apps">Website and Web Apps Development</Link>
            <Link href="/services#ui-ux">UI/UX Designs</Link>
            <Link href="/services#mobile-apps">Mobile Apps Development</Link>
            <Link href="/services#cybersecurity">Cybersecurity</Link>
            <Link href="/services#it-consultancy">IT Consultancy</Link>
          </nav>
        </div>

        <div className="footer-bottom">
          <p
            className="footer-copyright"
            aria-label={`© ${currentYear} GENIE | dev. All rights reserved.`}
          >
            <span aria-hidden="true">© {currentYear} </span>
            <span className="footer-copyright-mark" aria-hidden="true">
              <GenieMark width={13} />
            </span>
            <span aria-hidden="true"> | dev. All rights reserved.</span>
          </p>
          <div className="footer-legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          --footer-bg: #cb5c24;
          --footer-muted: hsla(0, 0%, 100%, 0.82);
          --footer-heading: #fffefc;
          --footer-accent: hsl(210, 100%, 52%);
          --footer-accent-hover: hsl(210, 100%, 58%);
          --footer-input-bg: rgba(255, 255, 255, 0.12);
          --footer-social-bg: rgba(255, 255, 255, 0.14);

          background-color: var(--footer-bg);
          color: var(--footer-muted);
          padding: clamp(3rem, 6vw, 5rem) 0 2rem;
        }

        .footer-inner {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 var(--container-padding);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.35fr 1.25fr 0.85fr 0.85fr;
          gap: clamp(2rem, 4vw, 3.5rem);
          margin-bottom: clamp(2.5rem, 5vw, 4rem);
        }

        .footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          text-decoration: none;
          color: inherit;
          margin-bottom: 1.25rem;
        }

        .footer-logo-text {
          font-family: var(--font-jakarta), sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #fff;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.55);
        }

        .footer-desc {
          font-size: 0.9375rem;
          line-height: 1.65;
          max-width: 32rem;
          margin-bottom: 1.75rem;
          color: var(--footer-muted);
        }

        .social-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .social-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 9999px;
          background: var(--footer-social-bg);
          color: var(--footer-heading);
          transition:
            color 0.2s ease,
            background 0.2s ease,
            transform 0.2s ease;
        }

        .social-btn:hover {
          color: var(--footer-accent);
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
        }

        .footer-heading {
          font-family: var(--font-heading);
          font-size: 0.8125rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--footer-heading);
          margin-bottom: 1.35rem;
        }

        .footer-nav {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }

        .footer-nav :global(a) {
          font-size: 0.9375rem;
          color: var(--footer-muted);
          transition: color 0.2s ease;
        }

        .footer-nav :global(a:hover) {
          color: var(--footer-heading);
        }

        .footer-newsletter-copy {
          font-size: 0.875rem;
          line-height: 1.55;
          margin-bottom: 1.25rem;
          max-width: 22rem;
        }

        .newsletter-form {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .newsletter-input {
          flex: 1 1 140px;
          min-width: 0;
          padding: 0.65rem 1rem;
          border-radius: 10px;
          border: 1px solid hsla(0, 0%, 100%, 0.22);
          background: var(--footer-input-bg);
          color: var(--footer-heading);
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .newsletter-input::placeholder {
          color: hsla(0, 0%, 100%, 0.45);
        }

        .newsletter-input:focus-visible {
          border-color: var(--footer-accent);
        }

        .newsletter-join {
          padding: 0.65rem 1.35rem;
          border-radius: 10px;
          border: none;
          background: var(--footer-accent);
          color: #fff;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .newsletter-join:hover {
          background: var(--footer-accent-hover);
        }

        .newsletter-join:active {
          transform: scale(0.98);
        }

        .newsletter-field {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          width: 100%;
        }

        .error-hint {
          font-size: 0.75rem;
          color: #f87171;
          margin-top: 0.4rem;
          font-weight: 500;
          width: 100%;
        }

        .input-error {
          border-color: #f87171 !important;
          box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.15) !important;
        }

        .newsletter-thanks {
          font-size: 0.8125rem;
          color: var(--footer-accent);
          margin-bottom: 1rem;
        }

        .footer-contact-lines {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }

        .contact-line {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.875rem;
          color: var(--footer-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        a.contact-line:hover {
          color: var(--footer-heading);
        }

        .contact-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: 9999px;
          background: var(--footer-social-bg);
          color: var(--footer-heading);
          flex-shrink: 0;
        }

        .footer-bottom {
          padding-top: 1.75rem;
          border-top: 1px solid hsla(0, 0%, 100%, 0.18);
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          font-size: 0.75rem;
          color: hsla(0, 0%, 100%, 0.72);
        }

        .footer-copyright {
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.2rem 0.35rem;
          margin: 0;
          max-width: none;
          font-size: 0.75rem;
          line-height: 1.4;
        }

        .footer-copyright-mark {
          display: inline-flex;
          align-items: center;
          line-height: 0;
        }

        .footer-copyright-mark :global(img) {
          display: block;
        }

        .footer-legal {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
        }

        .footer-legal :global(a) {
          color: hsla(0, 0%, 100%, 0.72);
          transition: color 0.2s ease;
        }

        .footer-legal :global(a:hover) {
          color: var(--footer-accent);
        }

        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }

          .footer-legal {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};
