'use client';

import { usePathname } from 'next/navigation';
import { HomeBackdrop } from './HomeBackdrop';

export function PageBackground() {
  const pathname = usePathname();
  return <div className="page-bg" aria-hidden="true"><HomeBackdrop showTools={pathname === '/'} /></div>;
}
