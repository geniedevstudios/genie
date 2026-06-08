'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { GenieMark } from '@/components/common/GenieMark';
import { LinkedinIcon, InstagramIcon, XIcon, GithubIcon } from '@/components/common/BrandIcons';
import { SOCIAL_LINKS } from '@/lib/socialLinks';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState('');
  const [mapOpen, setMapOpen] = useState(false);

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

  useEffect(() => {
    if (!mapOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMapOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mapOpen]);

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo-link" aria-label="Home">
              <span className="footer-logo">
                <GenieMark width={28} className="footer-logo-img" />
                <span className="footer-logo-text">| dev</span>
              </span>
            </Link>
            <p className="footer-desc">
              Innovating at the intersection of design and technology to create exceptional digital
              experiences that drive growth and empower businesses worldwide.
            </p>
            <div className="social-row" aria-label="Social links">
              <a
                href={SOCIAL_LINKS.linkedin}
                className="social-btn"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon size={18} />
              </a>
              <a href={SOCIAL_LINKS.x} className="social-btn" aria-label="X" target="_blank" rel="noopener noreferrer">
                <XIcon size={16} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                className="social-btn"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.github}
                className="social-btn"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon size={18} />
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
              <button
                type="button"
                className="contact-line contact-line-btn"
                onClick={() => setMapOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={mapOpen}
                aria-label="Open map for Accra, Ghana"
              >
                <span className="contact-icon" aria-hidden>
                  <MapPin size={16} strokeWidth={2} />
                </span>
                <span>Accra, Ghana</span>
              </button>
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

      {mapOpen ? (
        <div className="map-backdrop" role="presentation" onClick={() => setMapOpen(false)}>
          <div
            className="map-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Google Map — Accra, Ghana"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="map-modal-top">
              <span className="map-modal-title">Accra, Ghana</span>
              <button type="button" className="map-close" onClick={() => setMapOpen(false)} aria-label="Close map">
                ×
              </button>
            </div>
            <div className="map-frame">
              <iframe
                title="Google Maps — Accra, Ghana"
                src="https://www.google.com/maps?q=Accra%2C%20Ghana&z=12&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              className="map-open"
              href="https://www.google.com/maps?q=Accra%2C%20Ghana&z=12"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      ) : null}

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

        @media (max-width: 640px) {
          .footer-inner {
            padding: 0 1.25rem;
          }
        }


        .footer-grid {
          display: grid;
          grid-template-columns: 1.35fr 1.25fr 0.85fr 0.85fr;
          gap: clamp(2rem, 4vw, 3.5rem);
          margin-bottom: clamp(2.5rem, 5vw, 4rem);
        }

        .footer-logo-link {
          text-decoration: none;
          color: inherit;
          display: inline-block;
          margin-bottom: 1.25rem;
        }

        .footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: inherit;
        }

        .footer-logo-img {
          display: block;
          flex-shrink: 0;
        }

        .footer-logo-text {
          font-family: var(--font-jakarta), sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #fff;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.55);
          line-height: 1;
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
          font-size: 1rem;
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

        .contact-line-btn {
          background: transparent;
          border: none;
          padding: 0;
          text-align: left;
          cursor: pointer;
        }

        .contact-line-btn:hover {
          color: var(--footer-heading);
        }

        .contact-line-btn:focus-visible {
          outline: 2px solid rgba(255, 255, 255, 0.7);
          outline-offset: 3px;
          border-radius: 8px;
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

        .map-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1rem, 4vw, 1.75rem);
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .map-modal {
          width: min(100%, 48rem);
          background: rgba(8, 10, 20, 0.94);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 1.1rem;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
        }

        .map-modal-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.85rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .map-modal-title {
          font-family: var(--font-heading);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: rgba(255, 255, 255, 0.92);
        }

        .map-close {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
          cursor: pointer;
          font-size: 1.25rem;
          line-height: 1;
        }

        .map-close:hover {
          background: rgba(255, 255, 255, 0.14);
        }

        .map-close:focus-visible {
          outline: 2px solid rgba(255, 255, 255, 0.7);
          outline-offset: 2px;
        }

        .map-frame {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: rgba(255, 255, 255, 0.04);
        }

        .map-frame :global(iframe) {
          width: 100%;
          height: 100%;
          border: 0;
        }

        .map-open {
          display: block;
          padding: 0.75rem 1rem 0.95rem;
          font-family: var(--font-heading);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.88);
          text-decoration: none;
        }

        .map-open:hover {
          color: #fff;
          text-decoration: underline;
          text-decoration-color: rgba(255, 255, 255, 0.5);
          text-underline-offset: 0.18em;
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
            gap: 2.75rem;
            text-align: center;
          }

          .footer-brand, .footer-connect {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .footer-desc {
            margin-left: auto;
            margin-right: auto;
          }

          .social-row, .newsletter-form, .footer-contact-lines {
            justify-content: center;
          }

          .footer-nav {
            align-items: center;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
          }

          .footer-legal {
            justify-content: center;
          }

          .footer-copyright {
            justify-content: center;
          }
        }

      `}</style>
    </footer>
  );
};
