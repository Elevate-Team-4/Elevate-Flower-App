// import { Messages } from 'next-intl';
declare type Messages = {
  [key: string]: string | Messages;
};

declare type ProvidersProps = {
  children: React.ReactNode;
};

declare type NextIntlProviderProps = {
  locale: string;
  messages: Messages;
  now: Date;
  timeZone: string;
} & ProvidersProps;
