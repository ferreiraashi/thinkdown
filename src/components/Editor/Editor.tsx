'use client';

import React, { useState, useEffect, useRef } from 'react';

import { useDocuments } from '@/context/DocumentsContext';

import Toolbar from '@/components/Toolbar/Toolbar';

import Header from '@/components/Header/Header';

import Preview from '@/components/Preview/Preview';

import ShortcutsModal from '@/components/ShortcutsModal/ShortcutsModal';

import Onboarding from '@/components/Onboarding/Onboarding';

import { Loader2, Eye, Edit3, FileQuestion, ArrowLeft } from 'lucide-react';

import { useSearchParams } from 'next/navigation';

import Link from 'next/link';

interface EditorProps {
  id: string;
}

export default function Editor({ id }: EditorProps) {
  const { getDocument, updateDocument } = useDocuments();
  const searchParams = useSearchParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false); // Mobile toggle
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initializedId = useRef<string | null>(null);
    const triggerHighlight = (format: string) => {
      setActiveHighlight(format);
      setTimeout(() => setActiveHighlight(null), 200);
    };
      useEffect(() => {
        if (initializedId.current === id) return;
            const doc = getDocument(id);
            if (doc) {
                                  setTimeout(() => {
                                    setContent(doc.content);
                                    setTitle(doc.title);
                                    setIsLoading(false);
                                    initializedId.current = id;
                                  }, 0);
              if (searchParams.get('new') === 'true') {
                setTimeout(() => setShowOnboarding(true), 0);
                window.history.replaceState(null, '', `/doc/${id}`);
              }
            } else {
                            setTimeout(() => {
                              setNotFound(true);
                              setIsLoading(false);
                            }, 0);
            }
          }, [id, getDocument, searchParams, setNotFound]);
        useEffect(() => {
          if (!showOnboarding) return;
          const dismiss = () => setShowOnboarding(false);
          window.addEventListener('mousedown', dismiss);
          window.addEventListener('keydown', dismiss);
          return () => {
            window.removeEventListener('mousedown', dismiss);
            window.removeEventListener('keydown', dismiss);
          };
        }, [showOnboarding]);
    useEffect(() => {
      if (isLoading) return;
      const handler = setTimeout(() => {
        const titleToSave = title.trim() === '' ? 'Sem título' : title;
        updateDocument(id, { title: titleToSave, content });
      }, 500); // 500ms debounce
      return () => clearTimeout(handler);
    }, [content, title, id, updateDocument, isLoading]);
    const handleFormat = (format: string) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const before = text.substring(0, start);
      const selection = text.substring(start, end);
      const after = text.substring(end);
      let newText = text;
      let newCursorPos = end;
      switch (format) {
        case 'bold':
          newText = `${before}**${selection}**${after}`;
          newCursorPos = selection.length > 0 ? end + 4 : start + 2;
          break;
        case 'italic':
          newText = `${before}*${selection}*${after}`;
          newCursorPos = selection.length > 0 ? end + 2 : start + 1;
          break;
        case 'code':
          newText = `${before}\`${selection}\`${after}`;
          newCursorPos = selection.length > 0 ? end + 2 : start + 1;
          break;
        case 'heading':
          newText = `${before}# ${selection}${after}`;
          newCursorPos = selection.length > 0 ? end + 2 : start + 2;
          break;
        case 'list':
          newText = `${before}- ${selection}${after}`;
          newCursorPos = selection.length > 0 ? end + 2 : start + 2;
          break;
        case 'quote':
          newText = `${before}> ${selection}${after}`;
          newCursorPos = selection.length > 0 ? end + 2 : start + 2;
          break;
        case 'link':
          newText = `${before}[${selection}](url)${after}`;
          newCursorPos = selection.length > 0 ? end + 6 : start + 1; 
          break;
      }
      setContent(newText);
      setTimeout(() => {
        textarea.focus();
        if (selection.length > 0) {
          if (format === 'bold' || format === 'italic' || format === 'code') {
             const wrapLen = format === 'bold' ? 2 : 1;
             textarea.setSelectionRange(start + wrapLen, end + wrapLen);
          } else if (format === 'link') {
             textarea.setSelectionRange(end + 3, end + 6);
          } else {
             textarea.setSelectionRange(newCursorPos, newCursorPos);
          }
        } else {
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (showShortcuts) {
        if (e.key === 'Escape') {
          setShowShortcuts(false);
        }
        return;
      }
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'b') {
          e.preventDefault();
          handleFormat('bold');
          triggerHighlight('bold');
        } else if (e.key === 'i') {
          e.preventDefault();
          handleFormat('italic');
          triggerHighlight('italic');
        } else if (e.key === 'k') { 
          e.preventDefault();
          handleFormat('link');
          triggerHighlight('link');
        } else if (e.shiftKey) {
          if (e.key === 'H' || e.key === 'h') {
            e.preventDefault();
            handleFormat('heading');
            triggerHighlight('heading');
          } else if (e.key === 'U' || e.key === 'u') {
            e.preventDefault();
            handleFormat('list');
            triggerHighlight('list');
          } else if (e.key === 'C' || e.key === 'c') {
            e.preventDefault();
            handleFormat('code');
            triggerHighlight('code');
          } else if (e.key === 'Q' || e.key === 'q') { 
            e.preventDefault();
            handleFormat('quote');
            triggerHighlight('quote');
          }
        }
      }
    };
                  if (isLoading) {
                    return (
                      <div className="flex items-center justify-center min-h-screen text-gray-500 dark:text-gray-400">
                        <Loader2 className="animate-spin mr-2" /> Carregando...
                      </div>
                    );
                  }
                  if (notFound) {
                    return (
                      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4 text-center">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                          <FileQuestion size={40} className="text-gray-400 dark:text-gray-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Documento não encontrado</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                          O documento que você está tentando acessar não existe ou foi excluído.
                        </p>
                        <Link 
                          href="/"
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all font-medium"
                        >
                          <ArrowLeft size={20} />
                          Voltar para o início
                        </Link>
                      </div>
                    );
                  }
                  return (
              <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
                <Header 
                  title={title} 
                  onTitleChange={setTitle} 
                  onShowShortcuts={() => setShowShortcuts(true)}
                />
                            <ShortcutsModal 
                              isOpen={showShortcuts} 
                              onClose={() => setShowShortcuts(false)} 
                            />
                            {showOnboarding && <Onboarding />}
                            <div className="flex-1 flex overflow-hidden relative pb-24"> 
              <div className={`flex-1 h-full bg-white dark:bg-gray-800 relative ${showPreview ? 'hidden md:block' : 'block'}`}>
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  className="w-full h-full p-8 resize-none focus:outline-none font-mono text-base text-gray-800 dark:text-gray-200 bg-transparent"
                  placeholder="Comece a escrever seu markdown..."
                />
              </div>
              <div className="hidden md:block w-px bg-gray-200 dark:bg-gray-700"></div>
              <div className={`flex-1 h-full bg-gray-50 dark:bg-gray-900 overflow-hidden ${!showPreview ? 'hidden md:block' : 'block'}`}>
                 <div className="h-full overflow-auto p-8">
                   <Preview content={content} />
                 </div>
              </div>
                      <Toolbar onFormat={handleFormat} activeHighlight={activeHighlight} />
                      <button
                        onClick={() => setShowPreview(!showPreview)}
                className="md:hidden absolute bottom-24 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-20"
              >
                {showPreview ? <Edit3 size={24} /> : <Eye size={24} />}
              </button>
            </div>
          </div>
        );
      }