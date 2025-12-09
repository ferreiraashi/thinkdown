'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { clsx } from 'clsx';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
    );
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "relative p-2 rounded-full transition-all duration-300 ease-in-out",
        "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
        "text-gray-600 dark:text-yellow-400",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      )}
      title={resolvedTheme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
      aria-label="Alternar tema"
    >
      <div className="relative w-5 h-5">
        <Sun 
          size={20} 
          className={clsx(
            "absolute inset-0 transition-all duration-300 transform",
            resolvedTheme === 'dark' ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
          )} 
        />
        <Moon 
          size={20} 
          className={clsx(
            "absolute inset-0 transition-all duration-300 transform",
            resolvedTheme === 'dark' ? "opacity-100 rotate-0 scale-100 text-blue-400" : "opacity-0 -rotate-90 scale-0"
          )} 
        />
      </div>
    </button>
  );
}