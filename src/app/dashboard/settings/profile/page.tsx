import { getUser } from '@/lib/dal';
import ProfilePageClient from './profile-client';

export const metadata = { title: 'Profile' };

export default async function Profile() {
    const user = await getUser();
    if (!user) return null;
    return (
        <ProfilePageClient name={user.name} email={user.email} mustVerifyEmail={!user.emailVerified} />
    );
}