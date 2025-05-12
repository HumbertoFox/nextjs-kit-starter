'use client';

import { useEffect } from 'react';
import { useBreadcrumbs } from '@/context/breadcrumb-context';

export default function RegisterUserBreadcrumb() {
    const { setBreadcrumbs } = useBreadcrumbs();

    useEffect(() => {
        setBreadcrumbs([
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Administrators', href: '/dashboard/admins' },
            { title: 'Register', href: '/dashboard/admins/register' }
        ]);
    }, [setBreadcrumbs]);

    return null;
}