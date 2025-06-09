import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactQueryProvider from './components/react-query.provider';
import NextIntlProvider from './components/next-intl-provider';

export default function Providers({
    children,
    locale,
    messages,
    now,
    timeZone,
}: NextIntlProviderProps) {
    console.log('Messages:', messages, typeof messages);

    return (
        <ReactQueryProvider>
            <ReactQueryDevtools initialIsOpen={false} /> 
            <NextIntlProvider locale={locale} messages={messages}  timeZone={timeZone} now={now}>
                {children}
            </NextIntlProvider>
      </ReactQueryProvider> 
    );
}
