import React, { useSyncExternalStore } from 'react';
import { ReactLenis } from 'lenis/react';
import { prefersReducedMotion } from '../utils/scroll';

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', onStoreChange);
  return () => mq.removeEventListener('change', onStoreChange);
}

function getReducedMotionSnapshot() {
  return prefersReducedMotion();
}

function getReducedMotionServerSnapshot() {
  return false;
}

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.25,
        anchors: true,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
};
