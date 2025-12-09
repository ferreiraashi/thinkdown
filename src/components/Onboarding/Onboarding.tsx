'use client';

import React, { useEffect, useState } from 'react';
import { Patrick_Hand } from 'next/font/google';

const patrickHand = Patrick_Hand({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function Onboarding() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="absolute inset-0 bg-black/5 dark:bg-white/5"></div>

      <div className={`${patrickHand.className} text-2xl text-gray-800 dark:text-gray-200`}>
        
        {/* 1. Seta do Título do Cabeçalho - Movida para o lado */}
        <div className="absolute top-5 left-80 md:left-104 animate-bounce-slow">
          <div className="relative flex items-center gap-2">
             <svg width="60" height="40" viewBox="0 0 60 40" className="rotate-12" style={{ overflow: 'visible' }}>
              {/* Caminho Combinado para junção perfeita */}
              <path d="M60 20 Q 30 20 0 20 L 12 12 M 0 20 L 12 28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="w-48 leading-tight font-bold pt-2 ml-4">
              Dê um nome ao seu documento aqui
            </p>
          </div>
        </div>

        {/* Apontando para o painel do editor do lado esquerdo */}
        <div className="hidden md:block absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-bounce-slow" style={{ animationDelay: '0.2s' }}>
          <div className="relative">
            <svg width="100" height="60" viewBox="0 0 100 60" className="absolute -bottom-2 right-12" style={{ overflow: 'visible' }}>
               <path d="M80 10 Q 50 40 10 40 L 22 30 M 10 40 L 22 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="absolute -top-16 left-4 w-48 leading-tight text-center font-bold">
              Escreva seu Markdown aqui...
            </p>
          </div>
        </div>

        {/* Apontando para o painel de pré-visualização do lado direito */}
        <div className="hidden md:block absolute top-1/2 left-[65%] transform -translate-y-1/2 animate-bounce-slow" style={{ animationDelay: '0.4s' }}>
          <div className="relative">
             <svg width="100" height="60" viewBox="0 0 100 60" className="absolute -bottom-2 left-0" style={{ overflow: 'visible' }}>
               <path d="M20 10 Q 50 40 90 40 L 78 30 M 90 40 L 78 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="absolute -top-16 -right-0 w-48 leading-tight text-center font-bold">
              ...e veja o resultado aqui!
            </p>
          </div>
        </div>

        {/* 4. Seta da Barra de Ferramentas */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 animate-bounce-slow" style={{ animationDelay: '0.6s' }}>
          <div className="relative flex flex-col items-center">
            <p className="mb-4 text-center w-64 leading-tight font-bold">
              Barra de ferramentas
            </p>
            <svg width="40" height="50" viewBox="0 0 40 50" className="drop-shadow-sm" style={{ overflow: 'visible' }}>
{/* Curva termina apontando para baixo em (20, 50) */}
              <path d="M10 0 Q 15 25 20 50 L 12 38 M 20 50 L 28 38" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        
        {/* 5. Seta dos Atalhos de Teclado */}
        <div className="hidden md:block absolute top-24 right-20 animate-bounce-slow" style={{ animationDelay: '0.8s' }}>
           <div className="relative">
            <svg width="60" height="60" viewBox="0 0 60 60" className="absolute -top-10 right-4" style={{ overflow: 'visible' }}>
               {/* Curva termina apontando para cima e para a direita em (50, 10) */}
               <path d="M10 50 Q 30 30 50 10 L 38 14 M 50 10 L 46 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="absolute top-4 -right-4 w-48 leading-tight text-right font-bold">
              Veja os atalhos
            </p>
           </div>
        </div>

      </div>
    </div>
  );
}
