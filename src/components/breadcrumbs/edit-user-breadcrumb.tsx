'use client';

import { useEffect } from 'react';
import { useBreadcrumbs } from '@/context/breadcrumb-context';
import { type User } from '@/types';

export default function EditUserBreadcrumb({ user }: { user: User }) {
    const { setBreadcrumbs } = useBreadcrumbs();

    useEffect(() => {
        setBreadcrumbs([
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Administrators', href: '/dashboard/admins' },
            {
                title: user?.name ? `Edit ${user.name}` : 'Edit User',
                href: `/dashboard/admins/edit/${user.id}`
            }
        ]);
    }, [setBreadcrumbs, user]);

    return null;
}