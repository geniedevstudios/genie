'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';

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
  const [ready, setReady] = useState(false);
  const revealedRef = useRef(false);

  const handleReady = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setReady(true);
  }, []);

  /* Reset when the video source changes (route change) */
  const handleLoadStart = useCallback(() => {
    revealedRef.current = false;
    setReady(false);
  }, []);

  return (
    <div className="page-bg" aria-hidden="true">
      <video
        key={src}
        className={`page-bg-video${ready ? ' page-bg-video--ready' : ''}`}
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onLoadStart={handleLoadStart}
        onCanPlay={handleReady}
        onPlaying={handleReady}
        onTimeUpdate={(e) => {
          if (e.currentTarget.currentTime > 0.05) handleReady();
        }}
      />
      <div className="page-bg-scrim" />
    </div>
  );
}
