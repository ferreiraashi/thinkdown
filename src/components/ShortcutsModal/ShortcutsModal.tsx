'use client';

import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all scale-100" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <Keyboard size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Atalhos de Teclado</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Formatação de Texto</h3>
            
            <ShortcutItem label="Negrito" keys={['Ctrl', 'B']} />
            <ShortcutItem label="Itálico" keys={['Ctrl', 'I']} />
            <ShortcutItem label="Título" keys={['Ctrl', 'Shift', 'H']} />
            <ShortcutItem label="Lista" keys={['Ctrl', 'Shift', 'U']} />
            <ShortcutItem label="Citação" keys={['Ctrl', 'Shift', 'Q']} />
            <ShortcutItem label="Link" keys={['Ctrl', 'K']} />
            <ShortcutItem label="Código Inline" keys={['Ctrl', 'Shift', 'C']} />
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          Pressione <kbd className="px-2 py-0.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded text-xs font-mono">Esc</kbd> para fechar
        </div>
      </div>
    </div>
  );
}

function ShortcutItem({ label, keys }: { label: string, keys: string[] }) {
  return (
    <div className="flex items-center justify-between py-2 group hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg px-2 -mx-2 transition-colors">
      <span className="text-gray-600 dark:text-gray-300 font-medium">{label}</span>
      <div className="flex gap-1">
        {keys.map((key, index) => (
          <React.Fragment key={key}>
            <kbd className="min-w-[24px] px-2 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md text-xs font-mono text-gray-500 dark:text-gray-400 shadow-sm flex items-center justify-center">
              {key}
            </kbd>
            {index < keys.length - 1 && <span className="text-gray-300 dark:text-gray-600 flex items-center">+</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
