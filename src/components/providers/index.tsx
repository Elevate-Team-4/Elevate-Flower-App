import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactQueryProvider from './components/react-query.provider';
import NextIntlProvider from './components/next-intl-provider';
import { NextIntlProviderProps } from '@/lib/types/providers';

export default function Providers({
    children,
    locale,
    messages,
    now,
    timeZone,
}: NextIntlProviderProps) {
    return (
            <ReactQueryProvider>
                <ReactQueryDevtools initialIsOpen={false} />
                <NextIntlProvider locale={locale} messages={messages} timeZone={timeZone} now={now}>
                    {children}
                </NextIntlProvider>
            </ReactQueryProvider>
    );
}
