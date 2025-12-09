'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MarkdownDocument, DocumentContextType } from '@/types';

const DocumentsContext = createContext<DocumentContextType | undefined>(undefined);

const STORAGE_KEY = 'markdown-editor-documents';

export function DocumentsProvider({ children }: { children: React.ReactNode }) {
  const [documents, setDocuments] = useState<MarkdownDocument[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega do localStorage ao montar
  useEffect(() => {    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setTimeout(() => {
          setDocuments(JSON.parse(saved));
        }, 0);
      } catch (e) {
        console.error('Failed to parse documents from localStorage', e);
      }
    }
    setTimeout(() => setIsLoaded(true), 0);
  }, []);

  // Salva no localStorage sempre que os documentos mudam
  useEffect(() => {    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    }
  }, [documents, isLoaded]);

  const createDocument = useCallback(() => {
    const baseTitle = 'Sem título';
    let title = baseTitle;
    let counter = 1;

    // Verifica os títulos existentes para encontrar o próximo incremento disponível
    // Usamos o estado atual 'documents' aqui
    const existingTitles = new Set(documents.map((d) => d.title));
    if (existingTitles.has(title)) {
      while (existingTitles.has(`${baseTitle} ${counter}`)) {
        counter++;
      }
      title = `${baseTitle} ${counter}`;
    }

    const newDoc: MarkdownDocument = {
      id: uuidv4(),
      title: title,
      content: '',
      updatedAt: new Date().toISOString(),
    };
    setDocuments((prev) => [newDoc, ...prev]);
    return newDoc.id;
  }, [documents]);

  const updateDocument = useCallback((id: string, updates: Partial<MarkdownDocument>) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? { ...doc, ...updates, updatedAt: new Date().toISOString() }
          : doc
      )
    );
  }, []);

  const deleteDocument = useCallback((id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  }, []);

  const getDocument = useCallback((id: string) => {
    return documents.find((doc) => doc.id === id);
  }, [documents]);

  const value = {
    documents,
    createDocument,
    updateDocument,
    deleteDocument,
    getDocument,
  };

  if (!isLoaded) {
    return null; 
  }

  return (
    <DocumentsContext.Provider value={value}>
      {children}
    </DocumentsContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentsContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentsProvider');
  }
  return context;
}
