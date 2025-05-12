import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import DashboardPageClient from './dashboard-client';
import { getUser } from '@/lib/dal';

export const metadata = { title: 'Dashboard' };

export default async function Dashboard() {
    const sessionUser = await getUser();
    const user = await prisma.user.findUnique({ where: { id: sessionUser?.id } });
    if (!sessionUser?.id || !user?.id) redirect('/login');
    return <DashboardPageClient />;
}