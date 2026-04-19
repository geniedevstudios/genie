'use client';

import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
