import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextIntlClientProvider, useLocale, useMessages, useNow, useTimeZone } from "next-intl";
import ReactQueryProvider from "./components/react-query.provider";
import SessionClientProvider from "./components/session-client-provider";
import { ThemeProvider } from "./components/theme-provider";

export default function Providers({ children }: ProvidersProps) {
  const locale = useLocale();
  const now = useNow();
  const timeZone = useTimeZone();
  const messages = useMessages();
  return (
    <SessionClientProvider>
      <ReactQueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ReactQueryDevtools initialIsOpen={false} />
          <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone} now={now}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </ReactQueryProvider>
    </SessionClientProvider>
  );
}
