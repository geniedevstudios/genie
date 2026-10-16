'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GenieMark } from '@/components/common/GenieMark';
import { PhoneCountrySelect } from '@/components/common/PhoneCountrySelect';
import { FormProtection, useFormProtection } from '@/components/common/FormProtection';
import {
  DEFAULT_PHONE_COUNTRY_ID,
  findCountryById,
  normalizeNationalDigits,
  nationalLengthOk,
} from '@/lib/phoneCountries';
import {
  ALLOWED_FEATURES,
  BUDGET_BANDS,
  BUDGET_ORDER,
  SERVICE_LABELS,
  SERVICE_ORDER,
  TIMEFRAME_LABELS,
  TIMEFRAME_ORDER,
  type Budget,
  type QuoteResult,
  type Service,
  type Timeframe,
} from '@/lib/quotePricing';
import styles from './form.module.css';

const STEP_LABELS = ['Project Type', 'Features', 'Details', 'Budget', 'Contact'];

const COMPLEXITY_LABEL: Record<QuoteResult['complexity'], string> = {
  low: 'low-complexity',
  medium: 'medium-complexity',
  high: 'high-complexity',
};

export function QuoteForm() {
  const protection = useFormProtection();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [serverQuote, setServerQuote] = useState<QuoteResult | null>(null);

  const [service, setService] = useState<Service | ''>('');
  const [features, setFeatures] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState<Budget | ''>('');
  const [timeframe, setTimeframe] = useState<Timeframe | ''>('');
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phoneCountryId: DEFAULT_PHONE_COUNTRY_ID,
    phoneLocal: '',
  });

  const nextStep = () => {
    if (step < 6) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!service || !budget || !timeframe || isLoading || !protection.turnstileToken) return;

    setIsLoading(true);
    setSubmitError('');

    try {
      const country = findCountryById(contact.phoneCountryId) ?? findCountryById(DEFAULT_PHONE_COUNTRY_ID)!;
      const national = normalizeNationalDigits(contact.phoneLocal);
      const dialDigits = country.dial.replace(/\D/g, '');
      const finalWhatsApp = national.length > 0 ? `+${dialDigits}${national}` : '';

      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          turnstileToken: protection.turnstileToken,
          companyWebsite: protection.companyWebsite,
          service,
          features,
          description,
          budget,
          timeframe,
          contact: {
            name: contact.name,
            email: contact.email,
            whatsapp: finalWhatsApp,
          },
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        setSubmitError(typeof result.error === 'string' ? result.error : "We couldn't send your request. Please try again.");
        return;
      }

      const { quote } = (await response.json()) as { quote?: QuoteResult };
      if (!quote?.estimate) {
        setSubmitError("We couldn't send your request. Please try again.");
        return;
      }

      setServerQuote(quote);
      nextStep();
    } catch (e) {
      console.error('Failed to submit quote:', e);
      setSubmitError("We couldn't send your request. Please try again.");
    } finally {
      protection.resetVerification();
      setIsLoading(false);
    }
  };

  const toggleFeature = (feat: string) => {
    setFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 20 : -20 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -20 : 20 }),
  };

  const selectedCountry = findCountryById(contact.phoneCountryId) ?? findCountryById(DEFAULT_PHONE_COUNTRY_ID)!;
  const isPhoneOk = nationalLengthOk(
    normalizeNationalDigits(contact.phoneLocal),
    selectedCountry.nsnMin,
    selectedCountry.nsnMax
  );

  return (
    <div className={styles.formContainer}>
      <div className={styles.formSideTextWrap}>
        <span className={styles.formSideText}>Get a quote</span>
      </div>

      <div className={styles.formMain}>
        {step < 6 && (
          <div className={styles.wizardHeader}>
            <div className={styles.progressSteps}>
              {STEP_LABELS.map((label, idx) => {
                const s = idx + 1;
                return (
                  <div key={idx} className={styles.progressStepCol}>
                    <span className={s === step ? styles.activeLabel : (s < step ? styles.completedLabel : styles.pendingLabel)}>
                      {label}
                    </span>
                    <div className={`${styles.progressDash} ${s <= step ? styles.progressDashActive : ''}`} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className={styles.wizardContent}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={styles.stepContainer}
          >

            {step === 1 && (
              <div className={styles.stepInner}>
                <h2 className={styles.stepTitle}>Tell us about your project</h2>
                <div className={styles.radioGrid}>
                  {SERVICE_ORDER.map((key) => (
                    <button
                      key={key}
                      type="button"
                      className={`${styles.selectCard} ${service === key ? styles.selectCardActive : ''}`}
                      onClick={() => {
                        setService(key);
                        setFeatures([]);
                      }}
                    >
                      {SERVICE_LABELS[key]}
                    </button>
                  ))}
                </div>
                <div className={styles.stepFooter}>
                  <div></div>
                  <button
                    className={styles.primaryBtn}
                    onClick={nextStep}
                    disabled={!service}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={styles.stepInner}>
                <h2 className={styles.stepTitle}>Which capabilities are important?</h2>
                <div className={styles.checkboxGrid2}>
                  {(service ? ALLOWED_FEATURES[service] : []).map((feat) => (
                    <label key={feat} className={`${styles.checkboxCard} ${features.includes(feat) ? styles.checkboxCardActive : ''}`}>
                      <input
                        type="checkbox"
                        value={feat}
                        checked={features.includes(feat)}
                        onChange={() => toggleFeature(feat)}
                        className={styles.hiddenCheckbox}
                      />
                      <span className={styles.checkboxLabel}>{feat}</span>
                    </label>
                  ))}
                </div>
                {features.length === 0 && (
                  <p className={styles.fieldHint}>Select at least one capability.</p>
                )}
                <div className={styles.stepFooter}>
                  <button className={styles.textBtn} onClick={prevStep}>Back</button>
                  <button
                    className={styles.primaryBtn}
                    onClick={nextStep}
                    disabled={features.length === 0}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={styles.stepInner}>
                <h2 className={styles.stepTitle}>What should the product do?</h2>
                <textarea
                  className={styles.textArea}
                  placeholder="Describe your idea, the users, and the main features you have in mind."
                  value={description}
                  maxLength={4000}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className={styles.stepFooter}>
                  <button className={styles.textBtn} onClick={prevStep}>Back</button>
                  <button
                    className={styles.primaryBtn}
                    onClick={nextStep}
                    disabled={description.trim().length < 10}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className={styles.stepInner}>
                <div className={styles.splitGrid}>
                  <div>
                    <h2 className={styles.stepTitleSmall}>Budget range</h2>
                    <div className={styles.radioList}>
                      {BUDGET_ORDER.map((key) => (
                        <button
                          key={key}
                          type="button"
                          className={`${styles.selectCard} ${budget === key ? styles.selectCardActive : ''}`}
                          onClick={() => setBudget(key)}
                        >
                          {BUDGET_BANDS[key].label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className={styles.stepTitleSmall}>Start timeframe</h2>
                    <div className={styles.radioList}>
                      {TIMEFRAME_ORDER.map((key) => (
                        <button
                          key={key}
                          type="button"
                          className={`${styles.selectCard} ${timeframe === key ? styles.selectCardActive : ''}`}
                          onClick={() => setTimeframe(key)}
                        >
                          {TIMEFRAME_LABELS[key]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.stepFooter}>
                  <button className={styles.textBtn} onClick={prevStep}>Back</button>
                  <button
                    className={styles.primaryBtn}
                    onClick={nextStep}
                    disabled={!budget || !timeframe}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className={styles.stepInner}>
                <h2 className={styles.stepTitle}>Contact details</h2>
                <div className={styles.inputStack}>
                  <input
                    type="text"
                    placeholder="Name"
                    maxLength={100}
                    autoComplete="name"
                    className={styles.inputLine}
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    maxLength={254}
                    autoComplete="email"
                    className={styles.inputLine}
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  />
                  <div className={styles.phoneFieldWrap}>
                    <PhoneCountrySelect
                      countryId={contact.phoneCountryId}
                      onCountryChange={(phoneCountryId) => setContact((prev) => ({ ...prev, phoneCountryId }))}
                      phoneValue={contact.phoneLocal}
                      onPhoneChange={(phoneLocal) => setContact((prev) => ({ ...prev, phoneLocal }))}
                      inputId="quote-whatsapp"
                      theme="light"
                      placeholder="WhatsApp (Numbers only)"
                    />
                  </div>
                </div>
                <FormProtection
                  action="quote"
                  onTokenChange={protection.setTurnstileToken}
                  version={protection.verificationVersion}
                  companyWebsite={protection.companyWebsite}
                  onCompanyWebsiteChange={protection.setCompanyWebsite}
                />
                {submitError && <p className={styles.submitError} role="alert">{submitError}</p>}
                <div className={styles.stepFooter}>
                  <button className={styles.textBtn} onClick={prevStep} disabled={isLoading}>Back</button>
                  <button
                    className={styles.primaryBtn}
                    onClick={handleSubmit}
                    disabled={
                      contact.name.trim().length < 2 ||
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) ||
                      !isPhoneOk ||
                      !protection.turnstileToken ||
                      isLoading
                    }
                  >
                    {isLoading ? 'Processing...' : 'Get Quote'}
                  </button>
                </div>
              </div>
            )}

            {step === 6 && serverQuote && (
              <div className={styles.successInner}>
                <div className={styles.successIcon}>🎉</div>
                <h1 className={styles.successTitle}>Preliminary project range</h1>
                <div className={styles.estimateBox}>
                  Estimated range: <strong>{serverQuote.estimate}</strong>
                </div>
                <p className={styles.successDesc}>
                  Based on the information you provided, this appears to be a <strong>{COMPLEXITY_LABEL[serverQuote.complexity]} custom development project</strong>.
                </p>
                <div className={serverQuote.budgetFit === 'scope-exceeds-budget' ? styles.noticeBox : styles.noticeBoxCalm}>
                  {serverQuote.message}
                </div>
                <div className={styles.noticeBox}>
                  This is a <strong>preliminary cedi range</strong>, not a final quotation. Discovery confirms the <strong>fixed quote</strong> and milestones. We&apos;ll review your requirements and provide a detailed proposal within <strong>24 hours</strong>.
                </div>

                <div className={styles.nextSteps}>
                  <h3>What happens next?</h3>
                  <ul>
                    <li><span>✅</span> We review your project details</li>
                    <li><span>✅</span> We prepare a tailored scope and timeline</li>
                    <li><span>✅</span> We contact you via <strong>email or WhatsApp</strong></li>
                  </ul>
                </div>

                <p className={styles.thankYouMsg}>
                  Thank you for reaching out to <span className={styles.inlineLogoWrap}><GenieMark width={24} className={styles.inlineMark} /> | dev studios</span>. We&apos;ve received your request and will get back to you within 24 hours with a tailored proposal.
                </p>

                <div className={styles.successFooter}>
                   <button className={styles.primaryBtn} onClick={() => window.location.reload()}>Close</button>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
