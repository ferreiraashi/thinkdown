'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDocuments } from '@/context/DocumentsContext';
import { Plus, Trash2, FileText, Edit2, Check, X, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import AlertModal from '../AlertModal/AlertModal';

export default function DocumentList() {
  const { documents, createDocument, deleteDocument, updateDocument } = useDocuments();
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreate = () => {
    const id = createDocument();
    router.push(`/doc/${id}?new=true`);
  };

  const confirmDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteId(id);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteDocument(deleteId);
      setDeleteId(null);
    }
  };

  const startEditing = (e: React.MouseEvent, id: string, currentTitle: string) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const saveTitle = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (editTitle.trim()) {
      updateDocument(id, { title: editTitle });
    }
    setEditingId(null);
  };

  const cancelEditing = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingId(null);
  };

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 transition-colors">
      {/* Barra de Navegação */}
      <nav className="sticky top-0 z-10 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm">
              <Image 
                src="/logo-thinkdown.png" 
                alt="ThinkDown Logo" 
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              ThinkDown
            </h1>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative group flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Buscar documentos..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 text-sm transition-all text-gray-800 dark:text-gray-200"
              />
            </div>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Seus Projetos</h2>
            <p className="text-gray-500 dark:text-gray-400">Gerencie suas ideias e anotações.</p>
          </div>
          <button
            onClick={handleCreate}
            className="group flex items-center gap-2 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 px-5 py-3 rounded-2xl transition-all shadow-xl shadow-gray-900/10 dark:shadow-white/5 hover:scale-[1.02] active:scale-95 font-medium"
          >
            <Plus size={20} className="transition-transform group-hover:rotate-90" />
            Novo Documento
          </button>
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <FileText size={40} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {searchTerm ? 'Nenhum resultado encontrado' : 'Tudo limpo por aqui'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8">
              {searchTerm ? 'Tente buscar por outro termo.' : 'Crie seu primeiro documento Markdown para começar a organizar suas ideias.'}
            </p>
            {!searchTerm && (
              <button onClick={handleCreate} className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Criar agora &rarr;
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 p-5 cursor-pointer flex flex-col h-56 overflow-hidden"
            >
              <Link href={`/doc/${doc.id}`} className="absolute inset-0 z-10" />
              
              <div className="flex justify-between items-start mb-3 relative">
                <div className="flex-1 mr-2 min-w-0">
                  {editingId === doc.id ? (
                    <div className="flex items-center gap-1 animate-in fade-in slide-in-from-left-2 duration-200 relative z-20">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full text-base font-bold bg-white dark:bg-gray-700 border-2 border-blue-500 rounded-lg px-2 py-1 focus:outline-none shadow-lg text-gray-900 dark:text-white"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveTitle(e as unknown as React.MouseEvent, doc.id);
                          if (e.key === 'Escape') cancelEditing(e as unknown as React.MouseEvent);
                        }}
                      />
                      <button onClick={(e) => saveTitle(e, doc.id)} className="p-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg hover:scale-110 transition-transform">
                        <Check size={16} strokeWidth={3} />
                      </button>
                      <button onClick={cancelEditing} className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-lg hover:scale-110 transition-transform">
                        <X size={16} strokeWidth={3} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 truncate tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" title={doc.title}>
                        {doc.title}
                      </h3>
                      <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        {new Date(doc.updatedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 relative z-20">
                    {!editingId && (
                       <button
                       onClick={(e) => startEditing(e, doc.id, doc.title)}
                       className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all hover:scale-105"
                       title="Renomear"
                     >
                       <Edit2 size={18} />
                     </button>
                    )}
                    <button
                      onClick={(e) => confirmDelete(e, doc.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all hover:scale-105"
                      title="Excluir"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="relative flex-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-4 leading-relaxed font-normal">
                    {doc.content ? doc.content : <span className="italic opacity-50">Comece a escrever algo incrível...</span>}
                  </div>
                  {/* Efeito de fade out na parte inferior do cartão */}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white dark:from-gray-800 to-transparent pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <AlertModal 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Excluir Documento?"
        message="Esta ação não pode ser desfeita. O documento será permanentemente removido da sua biblioteca."
      />
    </div>
  );
}
