"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryProvider from "./components/react-query.provider";
import { ThemeProvider } from "./components/theme-provider";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <ReactQueryProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
