'use client';

import React from 'react';
import { Bold, Italic, Heading, List, Code, Quote, Link2 } from 'lucide-react';
import { clsx } from 'clsx';

interface ToolbarProps {
  onFormat: (format: string) => void;
  activeHighlight?: string | null;
}

export default function Toolbar({ onFormat, activeHighlight }: ToolbarProps) {
  const getButtonClass = (format: string) => clsx(
    "p-2 rounded-full transition-all duration-200",
    activeHighlight === format 
      ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 scale-110 ring-2 ring-blue-300 dark:ring-blue-700" 
      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
  );

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 rounded-full px-6 py-3 flex items-center gap-4 z-50 transition-all hover:shadow-2xl hover:-translate-y-1">
      <button
        onClick={() => onFormat('bold')}
        className={getButtonClass('bold')}
        title="Negrito (Ctrl+B)"
      >
        <Bold size={20} />
      </button>
      <div className="w-px h-5 bg-gray-200 dark:bg-gray-700"></div>
      <button
        onClick={() => onFormat('italic')}
        className={getButtonClass('italic')}
        title="Itálico (Ctrl+I)"
      >
        <Italic size={20} />
      </button>
      <div className="w-px h-5 bg-gray-200 dark:bg-gray-700"></div>
      <button
        onClick={() => onFormat('heading')}
        className={getButtonClass('heading')}
        title="Título (Ctrl+Shift+H)"
      >
        <Heading size={20} />
      </button>
      <div className="w-px h-5 bg-gray-200 dark:bg-gray-700"></div>
      <button
        onClick={() => onFormat('list')}
        className={getButtonClass('list')}
        title="Lista (Ctrl+Shift+U)"
      >
        <List size={20} />
      </button>
      <div className="w-px h-5 bg-gray-200 dark:bg-gray-700"></div>
      <button
        onClick={() => onFormat('quote')}
        className={getButtonClass('quote')}
        title="Citação (Ctrl+Shift+Q)"
      >
        <Quote size={20} />
      </button>
      <div className="w-px h-5 bg-gray-200 dark:bg-gray-700"></div>
      <button
        onClick={() => onFormat('link')}
        className={getButtonClass('link')}
        title="Link (Ctrl+K)"
      >
        <Link2 size={20} />
      </button>
      <div className="w-px h-5 bg-gray-200 dark:bg-gray-700"></div>
      <button
        onClick={() => onFormat('code')}
        className={getButtonClass('code')}
        title="Código inline (Ctrl+Shift+C)"
      >
        <Code size={20} />
      </button>
    </div>
  );
}