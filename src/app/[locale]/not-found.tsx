import { useTranslations } from 'next-intl';
import React from 'react';

export default function NotFound() {
    const t = useTranslations();
    return <div>{t('page-is-not-found')}</div>;
}
