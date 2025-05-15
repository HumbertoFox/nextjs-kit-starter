import { deleteUserById } from '@/app/api/actions/deleteadminuser';
import UsersBreadcrumb from '@/components/breadcrumbs/users-breadcrumb';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import prisma from '@/lib/prisma';
import { UserPen, UserX } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export const metadata = { title: 'Users' };

export default async function Users() {
    const users = await prisma.user.findMany({ where: { role: 'USER', deletedAt: null } });
    const t = await getTranslations('Users');
    return (
        <>
            <UsersBreadcrumb />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table className="w-full text-center">
                        <TableHeader>
                            <TableRow className="cursor-default">
                                <TableHead className="text-center">{t('Index')}</TableHead>
                                <TableHead className="text-center">{t('IdUser')}</TableHead>
                                <TableHead className="text-center">{t('Name')}</TableHead>
                                <TableHead className="text-center">{t('Email')}</TableHead>
                                <TableHead className="text-center">{t('Actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.length === 0 && (
                                <TableRow className="text-red-600 cursor-default">
                                    <TableCell colSpan={5}>{t('NotListUser')}</TableCell>
                                </TableRow>
                            )}
                            {users.map((user, index) => (
                                <TableRow key={index} className="cursor-default">
                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell className="flex justify-evenly items-center my-1">
                                        <Link
                                            href={`/dashboard/admins/${user.id}/update`}
                                            title={`${t('LinkTitle')} ${user.name}`}
                                        >
                                            <Icon
                                                iconNode={UserPen}
                                                aria-label={`${t('AriaLabelIcon')} ${user.name}`}
                                                className="size-6 text-yellow-600 hover:text-yellow-500 duration-300"
                                            />
                                        </Link>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button
                                                    type="button"
                                                    title={`${t('DialogButtonTitle')} ${user.name}`}
                                                >
                                                    <Icon
                                                        iconNode={UserX}
                                                        aria-label={`${t('DialogButtonAreaLabel')} ${user.name}`}
                                                        className="size-6 text-red-600 cursor-pointer hover:text-red-500 duration-300"
                                                    />
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>
                                                    {t('DialogTitle')}
                                                </DialogTitle>
                                                <DialogDescription>
                                                    {t('DialogDescription')}
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button type="button" variant="secondary">
                                                            {t('DialogButtonCancel')}
                                                        </Button>
                                                    </DialogClose>
                                                    <form action={deleteUserById}>
                                                        <input type="hidden" name="userId" value={user.id} />
                                                        <Button
                                                            type="submit"
                                                            variant="destructive"
                                                        >
                                                            {t('DialogButtonSubmit')}
                                                        </Button>
                                                    </form>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}
