'use client';

import { usePathname } from 'next/navigation';

function videoSrcForPath(pathname: string): string {
  const path = pathname || '/';
  if (path === '/') return '/homebg.mp4';
  if (path.startsWith('/portfolio')) return '/soft-glow-900w.mp4';
  if (path.startsWith('/about')) return '/gradient-1.mp4';
  if (path.startsWith('/contact')) return '/shader-3.mp4';
  if (path.startsWith('/services')) return '/services.mp4';
  return '/soft-glow-900w.mp4';
}

export function PageBackground() {
  const pathname = usePathname() ?? '';
  const src = videoSrcForPath(pathname);

  return (
    <div className="page-bg" aria-hidden="true">
      <video
        key={src}
        className="page-bg-video"
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
      />
      <div className="page-bg-scrim" />
    </div>
  );
}
