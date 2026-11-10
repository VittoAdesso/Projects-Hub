import { useContext } from 'react';
import { ThemeContext, type Theme } from '@/app/providers/ThemeContext';

export type { Theme };

export interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

export function useTheme(): UseThemeReturn {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return {
    theme: context.theme,
    toggleTheme: context.toggleTheme,
    setTheme: context.setTheme,
    isDark: context.theme === 'dark',
  };
}
