/**
 * Subscribe to layout-affecting viewport changes (window + VisualViewport).
 * `window.resize` alone misses some mobile toolbar / devtools emulation cases.
 */
export function subscribeViewport(callback: () => void) {
  callback();

  window.addEventListener('resize', callback);
  window.addEventListener('orientationchange', callback);

  const vv = window.visualViewport;
  if (vv) {
    vv.addEventListener('resize', callback);
    vv.addEventListener('scroll', callback);
  }

  return () => {
    window.removeEventListener('resize', callback);
    window.removeEventListener('orientationchange', callback);
    if (vv) {
      vv.removeEventListener('resize', callback);
      vv.removeEventListener('scroll', callback);
    }
  };
}
