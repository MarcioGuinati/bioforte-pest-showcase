import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useAdminTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('admin-theme');
    return (stored as Theme) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('admin-theme', theme);
    
    // Apply/remove dark class on document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return { theme, setTheme, toggleTheme };
}
