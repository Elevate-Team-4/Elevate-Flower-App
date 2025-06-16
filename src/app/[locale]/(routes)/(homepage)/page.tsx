import { useTranslations } from 'next-intl';

export default function Home() {
    const t = useTranslations();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24  ">
            <p className="bg-soft-pink-500">{t('mahmoued')} </p>
        </main>
    );
}
