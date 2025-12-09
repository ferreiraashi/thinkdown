<div align="center">

  <img src="public/capa-thinkdown.png" alt="Capa ThinkDown" width="100%" />

  <br />
  <br />

  <img src="public/logo-thinkdown.png" alt="Logo ThinkDown" width="100" />

  <h1 align="center">ThinkDown</h1>

  <p align="center">
    <strong>Um editor de Markdown simples, elegante e funcional.</strong>
    <br />
    Desenvolvido como parte do Desafio Técnico para o Projeto ADA.
  </p>

  <p align="center">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-red.svg?style=flat-square">
    <img alt="React" src="https://img.shields.io/badge/React-19-blue?logo=react&style=flat-square">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&style=flat-square">
    <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&style=flat-square">
  </p>
</div>

<br />

<div align="center">
  <img src="public/screenshot.png" alt="Screenshot da Aplicação ThinkDown" width="100%" style="border-radius: 10px; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);" />
</div>

<br />

## 🎯 Sobre o Projeto

O **ThinkDown** é uma aplicação web moderna que permite criar, editar, visualizar e gerenciar documentos em Markdown diretamente no navegador. O objetivo é fornecer uma interface limpa e reativa, focada na experiência do usuário, onde a edição e o preview acontecem lado a lado.

O projeto foi construído com foco em **Performance**, **Clean Code** e **UX**, utilizando as funcionalidades mais recentes do Next.js e React.

## ✨ Funcionalidades

O projeto atende a todos os requisitos obrigatórios e implementa diversas melhorias opcionais:

### 📝 Essenciais
- **CRUD Completo**: Criação, leitura, atualização e exclusão de documentos.
- **Persistência Local**: Dados salvos automaticamente no `localStorage` do navegador.
- **Split-View**: Editor à esquerda e Preview (renderizado) à direita em tempo real.
- **Roteamento**: URLs dinâmicas para cada documento (`/doc/:id`).

### 🚀 Diferenciais (Extras)
- 💾 **Autosave**: Salvamento automático com *debounce* para performance.
- 🌓 **Tema Dark/Light**: Alternância de temas com detecção de preferência do sistema.
- ⌨️ **Atalhos de Teclado**: Suporte para `Ctrl+B` (Negrito), `Ctrl+I` (Itálico), etc.
- 🎨 **Toolbar Inteligente**: Manipulação da posição do cursor e seleção de texto.
- 📱 **Responsividade**: Layout adaptável para mobile (alternância entre Editor/Preview).
- 👋 **Onboarding**: Animações de boas-vindas para novos documentos.

## 🛠️ Tecnologias

Este projeto utiliza uma stack moderna e robusta:

* **[Next.js 16](https://nextjs.org/)** (App Router) - Framework React.
* **[React 19](https://react.dev/)** - Biblioteca de UI.
* **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática e segurança.
* **[Tailwind CSS v4](https://tailwindcss.com/)** - Estilização utilitária.
* **[Lucide React](https://lucide.dev/)** - Ícones consistentes e leves.
* **[React Markdown](https://github.com/remarkjs/react-markdown)** - Renderização segura de MD.
* **[Zod](https://zod.dev/)** - (Opcional) Validação de esquemas.

## 🔍 Para Avaliação (ADA)

Esta seção destaca pontos específicos da implementação para os avaliadores:

1.  **Context API:** Utilizada para evitar *prop drilling* no gerenciamento de documentos e tema.
2.  **Custom Hooks:** A lógica de manipulação de documentos foi abstraída para manter os componentes limpos.
3.  **UX/UI:** Imporntancia com O UX do usuário, e desiigne simples.
4.  **Clean Code:** Nomes de variáveis descritivos, funções pequenas e separação de responsabilidades.

---


## 📦 Como Rodar

Para clonar e executar este aplicativo, você precisará do [Git](https://git-scm.com) e do [Node.js](https://nodejs.org/en/download/) instalados.

```bash
# Clone este repositório
$ git clone [https://github.com/ferreiraashi/thinkdown.git](https://github.com/ferreiraashi/thinkdown.git)

# Acesse a pasta do projeto
$ cd thinkdown

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev
```

<div align="center">
  Feito com 💙 por <strong>Washington Ferreira</strong> para o desafio ADA.
</div>
