/** Shared “genie” reveal used by Hero pills and other overlays (clip-path + scaleY). */
export type GenieOpenDir = 'up' | 'down';

export function buildGenieVariants(dir: GenieOpenDir) {
  const isUp = dir === 'up';
  return {
    hidden: {
      clipPath: isUp
        ? 'polygon(15% 88%, 85% 88%, 90% 100%, 10% 100%)'
        : 'polygon(10% 0%,  90% 0%,  85% 12%, 15% 12%)',
      opacity: 0,
      scaleY: 0.06,
    },
    visible: {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      opacity: 1,
      scaleY: 1,
      transition: {
        clipPath: { duration: 0.48, ease: [0.16, 1, 0.3, 1] as const },
        scaleY: { duration: 0.48, ease: [0.34, 1.4, 0.64, 1] as const },
        opacity: { duration: 0.14 },
      },
    },
    exit: {
      clipPath: isUp
        ? 'polygon(32% 84%, 68% 84%, 72% 100%, 28% 100%)'
        : 'polygon(28% 0%,  72% 0%,  68% 16%, 32% 16%)',
      opacity: 0,
      scaleY: 0.04,
      transition: { duration: 0.26, ease: [0.4, 0, 0.6, 1] as const },
    },
  };
}
