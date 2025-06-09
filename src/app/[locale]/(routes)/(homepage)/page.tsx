import { Activity } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Home() {
    const x = 'hello world';
    const t = useTranslations();

    console.log(x);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24  ">
            <p className="bg-soft-pink-500">{t('mahmoued')} </p>
        </main>
    );


}
