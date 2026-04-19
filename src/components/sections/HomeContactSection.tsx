'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, RefreshCcw } from 'lucide-react';
import styles from './HomeContactSection.module.css';

export const HomeContactSection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          privacyAccepted: formData.privacyAccepted,
          purpose: formData.message.trim() || 'Home page contact',
        }),
      });

      if (res.ok) {
        setStatus('success');
        setErrors({});
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
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
    <section
      id="book"
      className={`${styles.section} section-spacing`}
      aria-labelledby="home-booking-heading"
    >
      <div className={`container ${styles.shell}`}>
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={styles.statusPanel}
            >
              <CheckCircle size={56} className={styles.statusIconOk} aria-hidden />
              <h3 className={styles.statusTitle}>Message received</h3>
              <p className={styles.statusCopy}>
                We&apos;ll get back to you shortly. Thanks for reaching out.
              </p>
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
              <RefreshCcw size={56} className={styles.statusIconErr} aria-hidden />
              <h3 className={styles.statusTitle}>Something went wrong</h3>
              <p className={styles.statusCopy}>Please try again in a moment.</p>
              <button type="button" onClick={() => setStatus('idle')} className={styles.btnGhost}>
                Try again
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
            >
              <h2 id="home-booking-heading" className={styles.title}>
                Let&apos;s build something{' '}
                <span className={styles.titleAccent}>meaningful together</span>
              </h2>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="home-firstName">First name</label>
                    <input
                      id="home-firstName"
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
                    <label htmlFor="home-lastName">Last name</label>
                    <input
                      id="home-lastName"
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
                  <div className={styles.field}>
                    <label htmlFor="home-email">Email</label>
                    <input
                      id="home-email"
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
                </div>

                <div className={`${styles.field} ${styles.fieldMessage}`}>
                  <label htmlFor="home-message">How can we help?</label>
                  <textarea
                    id="home-message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={errors.message ? styles.inputError : ''}
                  />
                  {errors.message && <span className={styles.errorHint}>{errors.message}</span>}
                </div>

                <div className={styles.privacyBlock}>
                  <label className={styles.privacyWrap}>
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
                      You agree to our friendly{' '}
                      <a href="#" className={styles.privacyLink} onClick={(e) => e.preventDefault()}>
                        privacy policy
                      </a>
                      .
                      {errors.privacy && <span className={styles.errorHint}>{errors.privacy}</span>}
                    </span>
                  </label>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="submit"
                    className={styles.btnSend}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Sending…' : 'Send message'}
                  </button>
                  <Link href="/contact" className={styles.fullPageLink}>
                    Full contact page →
                  </Link>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
