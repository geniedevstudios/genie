'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Script from 'next/script';
import styles from './FormProtection.module.css';

type TurnstileOptions = {
  sitekey: string;
  action: string;
  size: 'flexible' | 'compact';
  theme: 'auto';
  'response-field': false;
  'refresh-expired': 'auto';
  'refresh-timeout': 'auto';
  callback: (token: string) => void;
  'expired-callback': () => void;
  'timeout-callback': () => void;
  'error-callback': () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string;
      remove: (widgetId: string) => void;
    };
  }
}

export function useFormProtection() {
  const [turnstileToken, setTurnstileToken] = useState('');
  const [verificationVersion, setVerificationVersion] = useState(0);
  const [companyWebsite, setCompanyWebsite] = useState('');

  function resetVerification() {
    setTurnstileToken('');
    setVerificationVersion((version) => version + 1);
  }

  return { turnstileToken, setTurnstileToken, verificationVersion, resetVerification, companyWebsite, setCompanyWebsite };
}

export function FormProtection({ action, onTokenChange, version, companyWebsite, onCompanyWebsiteChange }: {
  action: 'contact' | 'quote';
  onTokenChange: (token: string) => void;
  version: number;
  companyWebsite: string;
  onCompanyWebsiteChange: (value: string) => void;
}) {
  const id = useId();
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || ready) return;
    const timer = window.setTimeout(() => {
      onTokenChange('');
      setError('Verification is taking too long to load. Please reload the page or email geniedev.noreply@gmail.com.');
    }, 15000);
    return () => window.clearTimeout(timer);
  }, [siteKey, ready, onTokenChange]);

  useEffect(() => {
    const api = window.turnstile;
    if (!ready || !container.current || !siteKey) return;
    let active = true;
    const clearToken = () => { if (active) onTokenChange(''); };
    const showError = () => {
      if (!active) return;
      onTokenChange('');
      setError('Verification could not finish. Please retry, or email geniedev.noreply@gmail.com.');
    };
    let widgetId: string | undefined;
    try {
      if (!api) throw new Error('Verification script did not initialize.');
      widgetId = api.render(container.current, {
        sitekey: siteKey,
        action,
        size: container.current.clientWidth < 300 ? 'compact' : 'flexible',
        theme: 'auto',
        'response-field': false,
        'refresh-expired': 'auto',
        'refresh-timeout': 'auto',
        callback: (token) => {
          if (!active) return;
          setError('');
          onTokenChange(token);
        },
        'expired-callback': clearToken,
        'timeout-callback': clearToken,
        'error-callback': showError,
      });
    } catch {
      showError();
    }
    return () => {
      active = false;
      onTokenChange('');
      if (widgetId !== undefined) api?.remove(widgetId);
    };
  }, [ready, siteKey, action, onTokenChange, version, retry]);

  return (
    <div className={styles.wrap}>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={id}>Company website (leave empty)</label>
        <input id={id} name="companyWebsite" type="text" tabIndex={-1} autoComplete="off"
          value={companyWebsite} onChange={(event) => onCompanyWebsiteChange(event.target.value)} />
      </div>
      {siteKey ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            onReady={() => { setError(''); setReady(true); }}
            onError={() => {
              onTokenChange('');
              setError('Verification could not load. Please reload the page or email geniedev.noreply@gmail.com.');
            }} />
          <div ref={container} aria-label="Spam protection verification" />
          {!ready && !error && <p role="status" className={styles.message}>Loading verification…</p>}
          {error && (
            <div role="alert" className={styles.message}>
              <p>{error}</p>
              {ready && <button type="button" onClick={() => {
                onTokenChange('');
                setError('');
                setRetry((value) => value + 1);
              }}>Retry verification</button>}
            </div>
          )}
        </>
      ) : (
        <p role="alert" className={styles.message}>
          The form is temporarily unavailable. Please email{' '}
          <a href="mailto:geniedev.noreply@gmail.com">geniedev.noreply@gmail.com</a>.
        </p>
      )}
    </div>
  );
}
