'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PhoneCountrySelect } from '@/components/common/PhoneCountrySelect';
import { FormProtection, useFormProtection } from '@/components/common/FormProtection';
import {
  DEFAULT_PHONE_COUNTRY_ID,
  findCountryById,
  nationalLengthHint,
  nationalLengthOk,
  normalizeNationalDigits,
} from '@/lib/phoneCountries';
import styles from './form.module.css';

export function QuoteForm() {
  const protection = useFormProtection();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneCountryId: DEFAULT_PHONE_COUNTRY_ID,
    phoneLocal: '',
    message: '',
    privacyAccepted: false,
  });

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (formData.name.trim().length < 2) nextErrors.name = 'Enter your name.';
    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    const country = findCountryById(formData.phoneCountryId) ?? findCountryById(DEFAULT_PHONE_COUNTRY_ID)!;
    const national = normalizeNationalDigits(formData.phoneLocal);
    if (national.length === 0) {
      nextErrors.phone = 'Enter a phone or WhatsApp number.';
    } else if (!nationalLengthOk(national, country.nsnMin, country.nsnMax)) {
      nextErrors.phone = `Enter ${nationalLengthHint(country)} for ${country.name}.`;
    }

    if (formData.message.trim().length < 10 || formData.message.trim().length > 4000) {
      nextErrors.message = 'Tell us a little more about the project (10–4,000 characters).';
    }
    if (!formData.privacyAccepted) nextErrors.privacy = 'Please accept the privacy policy.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === 'loading' || !validate() || !protection.turnstileToken) return;

    setStatus('loading');
    setSubmitError('');

    const country = findCountryById(formData.phoneCountryId) ?? findCountryById(DEFAULT_PHONE_COUNTRY_ID)!;
    const national = normalizeNationalDigits(formData.phoneLocal);
    const dialDigits = country.dial.replace(/\D/g, '');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          turnstileToken: protection.turnstileToken,
          companyWebsite: protection.companyWebsite,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: `+${dialDigits}${national}`,
          message: formData.message.trim(),
          privacyAccepted: formData.privacyAccepted,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        setSubmitError(typeof result.error === 'string' ? result.error : "We couldn't send your request. Please try again.");
        setStatus('error');
        return;
      }

      setStatus('success');
      setErrors({});
    } catch {
      setSubmitError('Please check your connection and try again.');
      setStatus('error');
    } finally {
      protection.resetVerification();
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formSideTextWrap}>
        <span className={styles.formSideText}>Your next chapter</span>
      </div>

      <div className={styles.formMain}>
        {status === 'success' ? (
          <div className={styles.successInner}>
            <h2 className={styles.stepTitle}>Request sent</h2>
            <p className={styles.successDesc}>
              Thanks. We received your details and will email you a quote shortly.
            </p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <h2 className={styles.stepTitle}>Tell us about the project</h2>
            <p className={styles.intro}>
              A few details are all we need to start. Tell us about your idea, who it’s for, and what you’d like it to do. We’ll take it from there.
            </p>

            <div className={styles.fields}>
              <label className={styles.field} htmlFor="quote-name">
                <span>Name</span>
                <input
                  id="quote-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  placeholder="Your name"
                  className={styles.inputLine}
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <span className={styles.fieldHint}>{errors.name}</span>}
              </label>

              <label className={styles.field} htmlFor="quote-email">
                <span>Email</span>
                <input
                  id="quote-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  placeholder="you@company.com"
                  className={styles.inputLine}
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <span className={styles.fieldHint}>{errors.email}</span>}
              </label>

              <div className={styles.field}>
                <label htmlFor="quote-phone">Phone / WhatsApp</label>
                <PhoneCountrySelect
                  countryId={formData.phoneCountryId}
                  onCountryChange={(phoneCountryId) => setFormData((prev) => ({ ...prev, phoneCountryId }))}
                  phoneValue={formData.phoneLocal}
                  onPhoneChange={(phoneLocal) => setFormData((prev) => ({ ...prev, phoneLocal }))}
                  inputId="quote-phone"
                  errorMessage={errors.phone}
                  theme="dark"
                  placeholder="Phone number"
                />
              </div>

              <label className={styles.field} htmlFor="quote-message">
                <span>Project details</span>
                <textarea
                  id="quote-message"
                  name="message"
                  className={styles.textArea}
                  placeholder="What do you want built, and who is it for?"
                  maxLength={4000}
                  rows={6}
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && <span className={styles.fieldHint}>{errors.message}</span>}
              </label>

              <label className={styles.privacy}>
                <input
                  type="checkbox"
                  checked={formData.privacyAccepted}
                  onChange={(event) => setFormData({ ...formData, privacyAccepted: event.target.checked })}
                />
                <span>
                  You agree to our <Link href="/privacy">privacy policy</Link>.
                  {errors.privacy && <span className={styles.fieldHint}>{errors.privacy}</span>}
                </span>
              </label>
            </div>

            <FormProtection
              action="quote"
              onTokenChange={protection.setTurnstileToken}
              version={protection.verificationVersion}
              companyWebsite={protection.companyWebsite}
              onCompanyWebsiteChange={protection.setCompanyWebsite}
            />

            {submitError && <p className={styles.submitError} role="alert">{submitError}</p>}

            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={status === 'loading' || !protection.turnstileToken}
            >
              {status === 'loading' ? 'Sending…' : 'Send my project idea'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
