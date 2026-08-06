'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GenieMark } from '@/components/common/GenieMark';
import styles from './form.module.css';

const PROJECT_TYPES = ['Website', 'Web App', 'Mobile App', 'E-commerce', 'Dashboard / Admin System'];
const FEATURES = [
  'User accounts', 'Payments', 'Booking / Scheduling', 
  'Admin dashboard', 'Inventory / Products', 'Analytics / Reports', 
  'Third-party integrations', 'AI features'
];
const BUDGETS = ['Under $500', '$500–$1,500', '$1,500–$3,000', '$3,000–$10,000', '$10,000+'];
const TIMEFRAMES = ['Immediately', 'Within 2 weeks', 'Within 1 month', 'Just exploring'];

const STEP_LABELS = ['Project Type', 'Features', 'Details', 'Budget', 'Contact'];

export function QuoteForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [projectType, setProjectType] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [contact, setContact] = useState({ name: '', email: '', whatsapp: '' });

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
    setIsLoading(true);
    
    try {
      const estimate = calculateEstimate();
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType,
          features,
          description,
          budget,
          timeframe,
          contact,
          estimate
        })
      });
    } catch (e) {
      console.error('Failed to submit quote:', e);
    }
    
    setIsLoading(false);
    nextStep(); // Go to step 6 (success)
  };

  const calculateEstimate = () => {
    let score = 0;
    if (projectType === "Website") score += 1;
    if (projectType === "E-commerce") score += 3;
    if (projectType === "Web App") score += 3;
    if (projectType === "Mobile App") score += 4;
    if (projectType === "Dashboard / Admin System") score += 3;

    if (features.includes("Payments")) score += 2;
    if (features.includes("Admin dashboard")) score += 2;
    if (features.includes("AI features")) score += 4;
    if (features.includes("User accounts")) score += 1;
    if (features.includes("Booking / Scheduling")) score += 2;
    if (features.includes("Inventory / Products")) score += 2;
    if (features.includes("Third-party integrations")) score += 2;

    if (score <= 2) return "$500 – $1,500";
    if (score <= 5) return "$1,500 – $3,000";
    return "$3,000 – $10,000+";
  };

  const toggleFeature = (feat: string) => {
    setFeatures(prev => 
      prev.includes(feat) ? prev.filter(f => f !== feat) : [...prev, feat]
    );
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 20 : -20 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -20 : 20 })
  };

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
            
            {/* STEP 1 */}
            {step === 1 && (
              <div className={styles.stepInner}>
                <h2 className={styles.stepTitle}>Tell us about your project</h2>
                <div className={styles.radioGrid}>
                  {PROJECT_TYPES.map(type => (
                    <button 
                      key={type} 
                      type="button"
                      className={`${styles.selectCard} ${projectType === type ? styles.selectCardActive : ''}`}
                      onClick={() => setProjectType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <div className={styles.stepFooter}>
                  <div></div>
                  <button 
                    className={styles.primaryBtn} 
                    onClick={nextStep}
                    disabled={!projectType}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className={styles.stepInner}>
                <h2 className={styles.stepTitle}>Which capabilities are important?</h2>
                <div className={styles.checkboxGrid}>
                  {FEATURES.map(feat => (
                    <label 
                      key={feat} 
                      className={`${styles.checkboxCard} ${features.includes(feat) ? styles.checkboxCardActive : ''}`}
                    >
                      <input 
                        type="checkbox" 
                        checked={features.includes(feat)}
                        onChange={() => toggleFeature(feat)}
                        className={styles.hiddenCheckbox}
                      />
                      <span className={styles.checkboxLabel}>{feat}</span>
                    </label>
                  ))}
                </div>
                <div className={styles.stepFooter}>
                  <button className={styles.textBtn} onClick={prevStep}>Back</button>
                  <button className={styles.primaryBtn} onClick={nextStep}>Next</button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className={styles.stepInner}>
                <h2 className={styles.stepTitle}>What should the product do?</h2>
                <textarea 
                  className={styles.textArea}
                  placeholder="Describe your idea, the users, and the main features you have in mind."
                  value={description}
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

            {/* STEP 4 */}
            {step === 4 && (
              <div className={styles.stepInner}>
                <div className={styles.splitGrid}>
                  <div>
                    <h2 className={styles.stepTitleSmall}>Budget range</h2>
                    <div className={styles.radioList}>
                      {BUDGETS.map(b => (
                        <button 
                          key={b} 
                          type="button"
                          className={`${styles.selectCard} ${budget === b ? styles.selectCardActive : ''}`}
                          onClick={() => setBudget(b)}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className={styles.stepTitleSmall}>Start timeframe</h2>
                    <div className={styles.radioList}>
                      {TIMEFRAMES.map(t => (
                        <button 
                          key={t} 
                          type="button"
                          className={`${styles.selectCard} ${timeframe === t ? styles.selectCardActive : ''}`}
                          onClick={() => setTimeframe(t)}
                        >
                          {t}
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

            {/* STEP 5 */}
            {step === 5 && (
              <div className={styles.stepInner}>
                <h2 className={styles.stepTitle}>Contact details</h2>
                <div className={styles.inputStack}>
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className={styles.inputLine} 
                    value={contact.name}
                    onChange={e => setContact({...contact, name: e.target.value})}
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className={styles.inputLine}
                    value={contact.email}
                    onChange={e => setContact({...contact, email: e.target.value})}
                  />
                  <input 
                    type="tel" 
                    placeholder="WhatsApp (Numbers only)" 
                    className={styles.inputLine}
                    value={contact.whatsapp}
                    onChange={e => setContact({...contact, whatsapp: e.target.value.replace(/[^\d+]/g, '')})}
                  />
                </div>
                <div className={styles.stepFooter}>
                  <button className={styles.textBtn} onClick={prevStep}>Back</button>
                  <button 
                    className={styles.primaryBtn} 
                    onClick={handleSubmit}
                    disabled={
                      !contact.name || 
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) || 
                      !contact.whatsapp || 
                      isLoading
                    }
                  >
                    {isLoading ? 'Processing...' : 'Get Quote'}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6 (Success) */}
            {step === 6 && (
              <div className={styles.successInner}>
                <div className={styles.successIcon}>🎉</div>
                <h1 className={styles.successTitle}>Preliminary Estimate</h1>
                <div className={styles.estimateBox}>
                  Estimated range: <strong>{calculateEstimate()}</strong>
                </div>
                <p className={styles.successDesc}>
                  Based on the information you provided, this appears to be a <strong>{features.length > 3 ? 'high-complexity' : 'medium-complexity'} custom development project</strong>.
                </p>
                <div className={styles.noticeBox}>
                  This is a <strong>preliminary estimate</strong>, not a final quotation. We'll review your requirements and provide a detailed proposal within <strong>24 hours</strong>.
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
                  Thank you for reaching out to <span className={styles.inlineLogoWrap}><GenieMark width={24} className={styles.inlineMark} /> | dev</span>. We've received your request and will get back to you within 24 hours with a tailored proposal.
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
