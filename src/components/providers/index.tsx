import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactQueryProvider from './components/react-query.provider';
import NextIntlProvider from './components/next-intl-provider';
import { NextIntlProviderProps } from '@/lib/types/providers';
import SessionClientProvider from './components/session-client-provider';

export default function Providers({
    children,
    locale,
    messages,
    now,
    timeZone,
}: NextIntlProviderProps) {
    return (
        <SessionClientProvider>
            <ReactQueryProvider>
                <ReactQueryDevtools initialIsOpen={false} />
                <NextIntlProvider locale={locale} messages={messages} timeZone={timeZone} now={now}>
                    {children}
                </NextIntlProvider>
            </ReactQueryProvider>
        </SessionClientProvider>
    );
}
