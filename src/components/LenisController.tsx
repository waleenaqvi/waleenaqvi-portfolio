import React, { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { useTheme } from '../context/ThemeContext';
import { setLenisInstance } from '../utils/scroll';

/** Registers Lenis for programmatic scroll and pauses it while modals are open. */
export const LenisController: React.FC = () => {
  const lenis = useLenis();
  const { isContactModalOpen, selectedProject, isProjectManagerOpen } = useTheme();

  useEffect(() => {
    setLenisInstance(lenis ?? null);
    return () => setLenisInstance(null);
  }, [lenis]);

  const modalOpen =
    isContactModalOpen || selectedProject !== null || isProjectManagerOpen;

  useEffect(() => {
    if (!lenis) return;
    if (modalOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, modalOpen]);

  return null;
};
