'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, RefreshCcw } from 'lucide-react';
import { LinkedinIcon, InstagramIcon, XIcon, GithubIcon } from '@/components/common/BrandIcons';
import { SOCIAL_LINKS } from '@/lib/socialLinks';
import { PhoneCountrySelect } from '@/components/common/PhoneCountrySelect';
import {
  DEFAULT_PHONE_COUNTRY_ID,
  findCountryById,
  normalizeNationalDigits,
  nationalLengthOk,
  nationalLengthHint,
} from '@/lib/phoneCountries';
import styles from './ContactForm.module.css';

const SUPPORT_EMAIL = 'geniedev.noreply@gmail.com';
const PHONE_DISPLAY = '+233 53 943 3339';
const PHONE_TEL = '+233539433339';

export const ContactPageForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCountryId: DEFAULT_PHONE_COUNTRY_ID,
    phoneLocal: '',
    message: '',
    privacyAccepted: false,
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.privacyAccepted) newErrors.privacy = 'Please accept the privacy policy';

    const country =
      findCountryById(formData.phoneCountryId) ?? findCountryById(DEFAULT_PHONE_COUNTRY_ID)!;
    const national = normalizeNationalDigits(formData.phoneLocal);

    if (national.length > 0 && !nationalLengthOk(national, country.nsnMin, country.nsnMax)) {
      newErrors.phone = `Enter ${nationalLengthHint(country)} for ${country.name}.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    const country =
      findCountryById(formData.phoneCountryId) ?? findCountryById(DEFAULT_PHONE_COUNTRY_ID)!;
    const national = normalizeNationalDigits(formData.phoneLocal);
    const dialDigits = country.dial.replace(/\D/g, '');
    const phone = national.length > 0 ? `+${dialDigits}${national}` : undefined;

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone,
          privacyAccepted: formData.privacyAccepted,
          purpose: formData.message.trim() || 'Contact form',
        }),
      });

      if (res.ok) {
        setStatus('success');
        setErrors({});
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneCountryId: DEFAULT_PHONE_COUNTRY_ID,
          phoneLocal: '',
          message: '',
          privacyAccepted: false,
        });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className={styles.wrap} aria-labelledby="contact-hero-heading">
      <div className={styles.inner}>
        <aside className={styles.aside}>
          <div className={styles.mapBg} aria-hidden />
          <h1 id="contact-hero-heading" className={styles.heroTitle}>
            Let us hear from you
          </h1>
          <p className={styles.headline}>
            We are always ready to assist you, anywhere in the world.
          </p>
          <p className={styles.lede}>
            Our team is focused on clear communication and solid delivery. Whether you have a specific build in mind or
            a question about scope, we&apos;re here to help you move forward with confidence.
          </p>

          <div className={styles.contactGrid}>
            <div className={styles.contactBlock}>
              <h3>Support</h3>
              <p>Our friendly team is here to help.</p>
              <a className={styles.contactLink} href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
            </div>
            <div className={styles.contactBlock}>
              <h3>Phone</h3>
              <p>Mon–Fri, 8am–5pm (GMT).</p>
              <a className={styles.contactLink} href={`tel:${PHONE_TEL}`}>
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className={styles.socialRow} aria-label="Social links">
            <a
              href={SOCIAL_LINKS.linkedin}
              className={styles.socialBtn}
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={SOCIAL_LINKS.x}
              className={styles.socialBtn}
              aria-label="X"
              target="_blank"
              rel="noopener noreferrer"
            >
              <XIcon size={16} />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              className={styles.socialBtn}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={SOCIAL_LINKS.github}
              className={styles.socialBtn}
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={18} />
            </a>
          </div>
        </aside>

        <div className={styles.formCard}>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={styles.statusPanel}
              >
                <CheckCircle size={52} className={styles.statusIconOk} aria-hidden />
                <h2 className={styles.statusTitle}>Message received</h2>
                <p className={styles.statusCopy}>We&apos;ll get back to you shortly. Thanks for reaching out.</p>
                <button type="button" onClick={() => setStatus('idle')} className={styles.btnGhost}>
                  Send another message
                </button>
              </motion.div>
            ) : status === 'error' ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={styles.statusPanel}
              >
                <RefreshCcw size={52} className={styles.statusIconErr} aria-hidden />
                <h2 className={styles.statusTitle}>Something went wrong</h2>
                <p className={styles.statusCopy}>Please try again in a moment.</p>
                <button type="button" onClick={() => setStatus('idle')} className={styles.btnGhost}>
                  Try again
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              >
                <h2 className={styles.formTitle} id="contact-form-heading">
                  Get in touch
                </h2>
                <p className={styles.formSubtitle}>Our friendly team would love to hear from you.</p>

                <form className={styles.form} onSubmit={handleSubmit} noValidate aria-labelledby="contact-form-heading">
                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label htmlFor="cp-firstName">First name</label>
                      <input
                        id="cp-firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) => {
                          setFormData({ ...formData, firstName: e.target.value });
                          if (errors.firstName) setErrors({ ...errors, firstName: '' });
                        }}
                        className={errors.firstName ? styles.inputError : ''}
                      />
                      {errors.firstName && <span className={styles.errorHint}>{errors.firstName}</span>}
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="cp-lastName">Last name</label>
                      <input
                        id="cp-lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        required
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) => {
                          setFormData({ ...formData, lastName: e.target.value });
                          if (errors.lastName) setErrors({ ...errors, lastName: '' });
                        }}
                        className={errors.lastName ? styles.inputError : ''}
                      />
                      {errors.lastName && <span className={styles.errorHint}>{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="cp-email">Email</label>
                    <input
                      id="cp-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={errors.email ? styles.inputError : ''}
                    />
                    {errors.email && <span className={styles.errorHint}>{errors.email}</span>}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="cp-phone">Phone number</label>
                    <PhoneCountrySelect
                      countryId={formData.phoneCountryId}
                      onCountryChange={(phoneCountryId) => {
                        setErrors((prev) => ({ ...prev, phone: '' }));
                        setFormData((prev) => ({ ...prev, phoneCountryId }));
                      }}
                      phoneValue={formData.phoneLocal}
                      onPhoneChange={(phoneLocal) => {
                        setErrors((prev) => ({ ...prev, phone: '' }));
                        setFormData((prev) => ({ ...prev, phoneLocal }));
                      }}
                      inputId="cp-phone"
                      errorMessage={errors.phone}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="cp-message">How can we help?</label>
                    <textarea
                      id="cp-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      className={errors.message ? styles.inputError : ''}
                    />
                    {errors.message && <span className={styles.errorHint}>{errors.message}</span>}
                  </div>

                  <label className={styles.privacy}>
                    <input
                      type="checkbox"
                      checked={formData.privacyAccepted}
                      onChange={(e) => {
                        setFormData({ ...formData, privacyAccepted: e.target.checked });
                        if (errors.privacy) setErrors({ ...errors, privacy: '' });
                      }}
                      required
                    />
                    <span>
                      You agree to our{' '}
                      <Link href="/privacy">
                        privacy policy
                      </Link>
                      .
                      {errors.privacy && <span className={styles.errorHint}>{errors.privacy}</span>}
                    </span>
                  </label>

                  <button
                    type="submit"
                    className={styles.submit}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Sending…' : 'Send message'}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
