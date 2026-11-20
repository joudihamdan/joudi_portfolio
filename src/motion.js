// One scroll-reveal for the whole site: it starts the moment any part of an
// element enters the viewport, lasts 0.35s, and has no stagger delays, so
// content is never hidden for long (e.g. after jumping from the nav).
// With prefers-reduced-motion it returns nothing and content is simply shown.
export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const REVEAL_DURATION = 0.35

export function reveal({ x = 0, y = 14 } = {}) {
  if (prefersReducedMotion) return {}
  return {
    initial: { opacity: 0, x, y },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, amount: 0 },
    transition: { duration: REVEAL_DURATION, ease: 'easeOut' },
  }
}
