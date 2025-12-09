'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function AlertModal({ isOpen, onClose, onConfirm, title, message }: AlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100 border border-gray-100 dark:border-gray-700" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={32} strokeWidth={2.5} />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{message}</p>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium shadow-lg shadow-red-500/30 transition-all hover:scale-[1.02]"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
