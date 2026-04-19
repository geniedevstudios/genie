'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ShoppingBag, Heart, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const icons = [
  { id: 'cart', Icon: ShoppingBag, label: 'Cart', count: 0, href: '#cart' },
  { id: 'wishlist', Icon: Heart, label: 'Wishlist', count: 0, href: '#wishlist' },
  { id: 'profile', Icon: User, label: 'Profile', count: null, href: '#account' },
];

export const RotatingUtility: React.FC<{ scrolled: boolean }> = ({ scrolled }) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % icons.length);
    }, 7000);
  }, []);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  const handleManualClick = (e: React.MouseEvent) => {
    // If it's the cart, we might want to prevent default and open drawer
    // For now, let's just reset the timer
    startInterval();
  };

  const currentIcon = icons[index];

  return (
    <div 
      className="rotating-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative' }}
    >
      <div className="icon-slot" onClick={handleManualClick}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIcon.id}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <currentIcon.Icon size={22} color={scrolled ? 'var(--blue-athracite)' : '#fff'} />
            {currentIcon.count !== null && currentIcon.count > 0 && (
              <span className={`badge ${scrolled ? 'badge-scrolled' : ''}`}>
                {currentIcon.count}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop Dropdown */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="utility-dropdown glass"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {icons.map((item) => (
              <Link key={item.id} href={item.href} className="dropdown-item">
                <item.Icon size={18} />
                <span>{item.label}</span>
                {item.count !== null && <span className="item-count">({item.count})</span>}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .rotating-container {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .icon-slot {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .badge {
          position: absolute;
          top: -4px;
          right: -8px;
          width: 16px;
          height: 16px;
          background: var(--brand-primary);
          color: #000;
          border-radius: 50%;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-family: var(--font-label);
        }

        .badge-scrolled {
          background: var(--brand-primary);
          color: #000;
        }

        .utility-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: -8px;
          min-width: 160px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 0.5rem;
          z-index: 100;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.8rem;
          color: var(--blue-athracite);
          font-size: 0.85rem;
          font-family: var(--font-label);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.2s ease;
          border-radius: 4px;
        }

        .dropdown-item:hover {
          background: rgba(0,0,0,0.05);
          color: var(--brand-primary);
        }

        .item-count {
          margin-left: auto;
          opacity: 0.6;
          font-size: 0.75rem;
        }

        @media (max-width: 768px) {
          .utility-dropdown {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
