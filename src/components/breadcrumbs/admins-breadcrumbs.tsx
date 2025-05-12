'use client';

import { useEffect } from 'react';
import { useBreadcrumbs } from '@/context/breadcrumb-context';

export default function AdminsBreadcrumbs() {
    const { setBreadcrumbs } = useBreadcrumbs();

    useEffect(() => {
        setBreadcrumbs([
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Administrators', href: '/dashboard/admins' },
        ]);
    }, [setBreadcrumbs]);

    return null;
}