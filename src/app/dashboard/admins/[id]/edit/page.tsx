import RegisterUserForm from '@/app/dashboard/admins/form-register-user';
import EditUserBreadcrumb from '@/components/breadcrumbs/edit-user-breadcrumb';
import prisma from '@/lib/prisma';
import { User } from '@/types';

interface UserProps {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly role: string;
}

export const metadata = { title: 'Edit' };

export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await prisma.user.findUnique({ where: { id, deletedAt: null }, select: { id: true, name: true, email: true, role: true } });
    return (
        <>
            <EditUserBreadcrumb user={user as User} />
            <div className="flex gap-4 rounded-xl p-4">
                <RegisterUserForm user={user as UserProps} valueButton="Edit" />
            </div>
        </>
    );
}