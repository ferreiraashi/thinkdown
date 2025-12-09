'use client';

import React from 'react';
import { ArrowLeft, Keyboard } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  onTitleChange: (title: string) => void;
  onShowShortcuts?: () => void;
}

export default function Header({ title, onTitleChange, onShowShortcuts }: HeaderProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10 w-full">
      <Link 
        href="/" 
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 transition-colors"
        title="Voltar para lista"
      >
        <ArrowLeft size={20} />
      </Link>
      <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2 hidden sm:block"></div>
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="text-lg font-semibold bg-transparent border-none focus:ring-0 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 w-full flex-1 text-gray-800 dark:text-gray-100"
        placeholder="Título do Documento"
      />
      
      <div className="flex items-center gap-2">
        {onShowShortcuts && (
          <button
            onClick={onShowShortcuts}
            className="p-2 text-gray-400 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors"
            title="Ver atalhos de teclado"
          >
            <Keyboard size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
