'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    // Add theme-switching class to html element for 300ms
    const root = document.documentElement;
    root.classList.add('theme-switching');

    const nextTheme = (resolvedTheme || theme) === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);

    setTimeout(() => {
      root.classList.remove('theme-switching');
    }, 300);
  };

  if (!mounted) {
    // Render placeholder with same dimensions to avoid layout shift and hydration mismatch
    return (
      <div
        className={`w-9 h-9 rounded-btn border hairline-border flex items-center justify-center text-text-muted ${className}`}
        aria-hidden="true"
      >
        <span className="w-4 h-4" />
      </div>
    );
  }

  const isDark = (resolvedTheme || theme) === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative w-9 h-9 rounded-btn border hairline-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text flex items-center justify-center focus-ring overflow-hidden ${className}`}
    >
      <div
        className={`transition-all duration-200 transform ${
          isDark ? 'rotate-0 opacity-100 scale-100' : 'rotate-180 opacity-0 scale-50'
        }`}
      >
        <Moon className="w-4 h-4 stroke-[1.5]" />
      </div>
      <div
        className={`absolute transition-all duration-200 transform ${
          isDark ? '-rotate-180 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'
        }`}
      >
        <Sun className="w-4 h-4 stroke-[1.5]" />
      </div>
    </button>
  );
}

