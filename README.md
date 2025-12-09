# Markdown Editor - Desafio ADA

Este projeto é um editor de documentos Markdown desenvolvido como parte do processo seletivo para o Projeto ADA.

## 🚀 Como rodar o projeto

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

3.  **Acesse a aplicação:**
    Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## ✨ Funcionalidades Implementadas

### Obrigatórias
*   **CRUD de Documentos:** Criação, Listagem, Edição, Renomeação e Exclusão de documentos.
*   **Armazenamento Local:** Persistência de dados utilizando `localStorage`.
*   **Editor com Preview:** Edição em tempo real com visualização lado a lado (split view).
*   **Toolbar de Estilização:** Botões para Negrito, Itálico, Títulos, Listas e Código Inline.
*   **Roteamento:** Navegação entre a lista de documentos e a tela de edição via URL (`/doc/:id`).
*   **Context API:** Gerenciamento global do estado dos documentos.

### Extras / Diferenciais
*   **Autosave:** Salvamento automático do conteúdo com *debounce* para evitar escritas excessivas.
*   **Renomeação na Listagem:** Possibilidade de renomear documentos diretamente na tela inicial.
*   **Atalhos de Teclado:** Suporte para `Ctrl+B` (Negrito) e `Ctrl+I` (Itálico).
*   **Layout Responsivo:** Adaptação para dispositivos móveis com alternância entre Editor/Preview.
*   **Styling Moderno:** Interface limpa construída com Tailwind CSS.
*   **Ícones:** Utilização da biblioteca `lucide-react` para uma UI consistente.

## 🧐 O que gostaria que fosse avaliado

*   **Organização do Código:** Estrutura de pastas, separação de componentes e responsabilidades.
*   **Uso de Hooks:** `useEffect`, `useCallback`, `useRef` e Custom Hooks (`useDocuments`).
*   **UX/UI:** Feedback visual, facilidade de uso e design limpo.
*   **Qualidade do Código:** Tipagem TypeScript, tratamento de erros básicos e código limpo.

## 🛠️ Tecnologias Utilizadas

*   **Next.js** (App Router)
*   **React**
*   **TypeScript**
*   **Tailwind CSS** (v4) + Typography Plugin
*   **react-markdown**
*   **lucide-react** (Ícones)
*   **uuid** (Geração de IDs)

---
Desenvolvido por Ferreiraashi