export interface MarkdownDocument {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export type DocumentContextType = {
  documents: MarkdownDocument[];
  createDocument: () => string; 
  updateDocument: (id: string, updates: Partial<MarkdownDocument>) => void;
  deleteDocument: (id: string) => void;
  getDocument: (id: string) => MarkdownDocument | undefined;
};
