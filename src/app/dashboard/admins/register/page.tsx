import RegisterUserForm from '@/app/dashboard/admins/form-register-user';
import RegisterUserBreadcrumb from '@/components/breadcrumbs/register-user-breadcrumb';

export const metadata = { title: 'Register' };

export default function RegisterUserPage() {
    return (
        <>
            <RegisterUserBreadcrumb />
            <div className="flex gap-4 rounded-xl p-4">
                <RegisterUserForm valueButton="Register" />
            </div>
        </>
    );
}