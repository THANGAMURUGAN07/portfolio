import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

function getPreferredTheme(): 'dark' | 'light' {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') return saved;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>(getPreferredTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Initialize on mount
    setTheme(getPreferredTheme());
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        aria-label="Toggle theme"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="glass-card flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 dark:hover:border-white/30 hover:scale-105 transition-all"
      >
        {theme === 'dark' ? (
          <>
            <Sun className="w-5 h-5 text-yellow-300" />
            <span className="text-sm text-white">Light</span>
          </>
        ) : (
          <>
            <Moon className="w-5 h-5 text-indigo-600" />
            <span className="text-sm text-gray-800">Dark</span>
          </>
        )}
      </button>
    </div>
  );
}
