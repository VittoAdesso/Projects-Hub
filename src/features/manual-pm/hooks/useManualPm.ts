import { useCallback, useState } from 'react';
import type { AreaId, SectionId } from '../types';

export function useManualPm() {
  const [activeSection, setActiveSection] = useState<SectionId>('inicio');
  const [activeArea, setActiveArea] = useState<AreaId>('rrhh');
  const [isKitOpen, setIsKitOpen] = useState<boolean>(false);

  const goToSection = useCallback((id: SectionId) => {
    setActiveSection(id);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  const toggleKit = useCallback(() => {
    setIsKitOpen((prev) => !prev);
  }, []);

  return {
    activeSection,
    goToSection,
    activeArea,
    setActiveArea,
    isKitOpen,
    toggleKit,
  };
}
