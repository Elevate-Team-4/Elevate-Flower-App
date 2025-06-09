declare type ProvidersProps = {
    children: React.ReactNode;
};

declare type NextIntlProviderProps = {
    locale: string;
    messages: any;
    now: Date;
    timeZone: string;
}& ProvidersProps ;