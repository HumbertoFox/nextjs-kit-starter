'use client';

import LoadingLoginSimple from '@/components/loadings/loading-login-simple';
import { useRouter } from 'next/navigation';
import { deleteSession } from '@/app/api/actions/logoutuser';
import { useEffect } from 'react';

export default function Logout() {
    const router = useRouter();
    useEffect(() => {
        const logout = async () => {
            const success = await deleteSession();
            if (success) {
                router.push('/');
            } else {
                router.push('/login');
            };
        };
        const timer = setTimeout(logout, 1000);
        return () => clearTimeout(timer);
    }, [router]);
    return <LoadingLoginSimple />;
}