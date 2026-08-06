'use client';

import React, { useMemo, useState, useRef, useEffect, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  PHONE_COUNTRIES,
  DEFAULT_PHONE_COUNTRY_ID,
  findCountryById,
  countryFlagSrc,
  normalizeNationalDigits,
  clampNationalDigits,
  type PhoneCountry,
} from '@/lib/phoneCountries';
import styles from './PhoneCountrySelect.module.css';

type Props = {
  countryId: string;
  onCountryChange: (id: string) => void;
  phoneValue: string;
  onPhoneChange: (value: string) => void;
  inputId: string;
  /** Shown under the field; linked for assistive tech. */
  errorMessage?: string;
  theme?: 'light' | 'dark';
  placeholder?: string;
};

export const PhoneCountrySelect: React.FC<Props> = ({
  countryId,
  onCountryChange,
  phoneValue,
  onPhoneChange,
  inputId,
  errorMessage,
  theme = 'dark',
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const errorId = `${inputId}-error`;

  const selected: PhoneCountry = useMemo(
    () => findCountryById(countryId) ?? findCountryById(DEFAULT_PHONE_COUNTRY_ID)!,
    [countryId],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase().replace(/^\+/, '');
    if (!q) return PHONE_COUNTRIES;
    return PHONE_COUNTRIES.filter((c) => {
      const dialDigits = c.dial.replace(/\D/g, '');
      return (
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase() === q ||
        c.dial.toLowerCase().includes(q) ||
        dialDigits.includes(q)
      );
    });
  }, [search]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const c = findCountryById(countryId) ?? findCountryById(DEFAULT_PHONE_COUNTRY_ID)!;
    const normalized = normalizeNationalDigits(phoneValue);
    const clamped = clampNationalDigits(normalized, c.nsnMax);
    if (clamped !== phoneValue) {
      onPhoneChange(clamped);
    }
  }, [countryId, phoneValue, onPhoneChange]);

  const pick = (c: PhoneCountry) => {
    onCountryChange(c.id);
    setOpen(false);
    setSearch('');
  };

  return (
    <div className={styles.wrap} data-theme={theme} ref={wrapRef}>
      <div className={styles.row}>
        <button
          type="button"
          className={styles.trigger}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((o) => !o)}
        >
          <img
            className={styles.flagImg}
            src={countryFlagSrc(selected.id, 40)}
            alt=""
            width={40}
            height={30}
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <span>{selected.dial}</span>
          <ChevronDown size={16} className={styles.chevron} aria-hidden strokeWidth={2} />
        </button>
        <input
          id={inputId}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          className={styles.input}
          maxLength={selected.nsnMax}
          value={phoneValue}
          placeholder={placeholder}
          onChange={(e) => {
            const normalized = normalizeNationalDigits(e.target.value);
            onPhoneChange(clampNationalDigits(normalized, selected.nsnMax));
          }}
          aria-invalid={Boolean(errorMessage)}
          aria-describedby={errorMessage ? errorId : undefined}
        />
      </div>
      {errorMessage ? (
        <p id={errorId} className={styles.error} role="alert">
          {errorMessage}
        </p>
      ) : null}

      {open ? (
        <div className={styles.dropdown} role="presentation">
          <div className={styles.search}>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              aria-label="Search countries"
            />
          </div>
          <ul id={listId} className={styles.list} role="listbox" aria-label="Countries">
            {filtered.length === 0 ? (
              <li className={styles.empty}>No matches</li>
            ) : (
              filtered.map((c) => {
                const isSel = c.id === countryId;
                return (
                  <li key={c.id} role="none">
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSel}
                      className={`${styles.item} ${isSel ? styles.itemSelected : ''}`}
                      onClick={() => pick(c)}
                    >
                      <img
                        className={styles.itemFlagImg}
                        src={countryFlagSrc(c.id, 20)}
                        alt=""
                        width={20}
                        height={15}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                      <span className={styles.itemName}>{c.name}</span>
                      <span className={styles.itemDial}>{c.dial}</span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
