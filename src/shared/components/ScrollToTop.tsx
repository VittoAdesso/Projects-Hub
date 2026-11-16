import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export interface ScrollToTopProps {
  threshold?: number;
  className?: string;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({
  threshold = 400,
  className,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver arriba"
      title="Volver arriba"
      className={cn(
        'fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 cursor-pointer',
        visible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-4 opacity-0 pointer-events-none',
        className
      )}
      data-testid="scroll-to-top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};
