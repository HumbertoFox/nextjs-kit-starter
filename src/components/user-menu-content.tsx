'use client';

import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { LogOut, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface UserMenuContentProps {
    user: User;
};

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();
    const t = useTranslations('UserMenuContent');
    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm cursor-default">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link className="block w-full cursor-pointer" href="/dashboard/settings/profile" prefetch onClick={cleanup}>
                        <Settings className="mr-2" />
                        {t('LinkSettings')}
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link className="block w-full cursor-pointer" href="/logout" onClick={cleanup}>
                    <LogOut className="mr-2 rotate-180" />
                    {t('Logout')}
                </Link>
            </DropdownMenuItem>
        </>
    );
}
