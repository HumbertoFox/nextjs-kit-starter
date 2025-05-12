'use client';

import { useEffect } from 'react';
import { useBreadcrumbs } from '@/context/breadcrumb-context';

export default function UsersBreadcrumb() {
    const { setBreadcrumbs } = useBreadcrumbs();

    useEffect(() => {
        setBreadcrumbs([
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Administrators', href: '/dashboard/admins' },
            { title: 'Users', href: '/dashboard/admins/users' }
        ]);
    }, [setBreadcrumbs]);

    return null;
}