'use client';
import React from 'react';
import { NextIntlClientProvider } from 'next-intl';

export default function NextIntlProvider({
    children,
    locale,
    messages,
    now,
    timeZone,
}: NextIntlProviderProps) {
    return (
        <NextIntlClientProvider messages={messages} locale={locale} timeZone={timeZone} now={now}>
            {children}
        </NextIntlClientProvider>
    );
}
