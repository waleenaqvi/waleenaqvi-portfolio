import type Lenis from 'lenis';

const HEADER_SCROLL_OFFSET = -80;

let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null): void {
  lenisInstance = instance;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function scrollWindowTo(
  top: number,
  behavior: 'smooth' | 'instant' = 'smooth',
): void {
  const immediate = behavior === 'instant' || prefersReducedMotion();

  if (lenisInstance) {
    lenisInstance.scrollTo(top, { immediate });
    return;
  }

  window.scrollTo({
    top,
    left: 0,
    behavior: immediate ? 'instant' : 'smooth',
  });
}

export function scrollToTop(behavior: 'smooth' | 'instant' = 'smooth'): void {
  scrollWindowTo(0, behavior);
}

export function scrollToElement(
  element: HTMLElement,
  options?: { behavior?: 'smooth' | 'instant'; block?: ScrollLogicalPosition },
): void {
  const immediate =
    options?.behavior === 'instant' || prefersReducedMotion();

  if (lenisInstance) {
    lenisInstance.scrollTo(element, {
      immediate,
      offset: HEADER_SCROLL_OFFSET,
    });
    return;
  }

  element.scrollIntoView({
    behavior: immediate ? 'instant' : 'smooth',
    block: options?.block ?? 'start',
  });
}
