import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DocumentsProvider } from "@/context/DocumentsContext";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ThinkDown - Editor Markdown",
  description: "Um editor de markdown simples, moderno e eficiente.",
  icons: {
    icon: '/logo-thinkdown.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-200`}>
        <ThemeProvider>
          <DocumentsProvider>
            {children}
          </DocumentsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}