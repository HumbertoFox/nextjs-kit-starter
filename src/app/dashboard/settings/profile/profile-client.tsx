'use client';

import { Transition } from '@headlessui/react';
import { startTransition, useActionState, useEffect, useState } from 'react';
import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateUser } from '@/app/api/actions/updateuser';
import { emailVerifiedChecked } from '@/app/api/actions/emailverified';
import { useRouter } from 'next/navigation';
import { useBreadcrumbs } from '@/context/breadcrumb-context';

type ProfileForm = {
    name: string;
    email: string;
};

type Props = ProfileForm & {
    mustVerifyEmail: boolean;
};

export default function ProfilePageClient({ name, email, mustVerifyEmail }: Props) {
    const router = useRouter();
    const { setBreadcrumbs } = useBreadcrumbs();
    const [state, action, pending] = useActionState(updateUser, undefined);
    const [status, setStatus] = useState<string | null>(null);
    const [recentlySuccessful, setRecentlySuccessful] = useState<boolean>(false);
    const [data, setData] = useState<ProfileForm>({
        name: name ?? '',
        email: email ?? ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    };
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => action(formData));
    };
    const handleVerifildEmail = async () => {
        const result = await emailVerifiedChecked();
        setStatus(result);
        if (result === 'verification-link-sent') {
            setTimeout(() => router.push('/logout'), 3000);
        }
    };

    useEffect(() => {
        setBreadcrumbs([
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Profile', href: '/dashboard/settings/profile' }
        ]);
    }, [setBreadcrumbs]);
    useEffect(() => {
        if (state?.success) {
            setRecentlySuccessful(true);
            router.refresh();
            setTimeout(() => setRecentlySuccessful(false), 2000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);
    return (
        <>
            <div className="space-y-6">
                <HeadingSmall title="Profile information" description="Update your name and email address" />

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            className="mt-1 block w-full"
                            value={data.name ?? ""}
                            onChange={handleChange}
                            required
                            autoComplete="name"
                            placeholder="Full name"
                        />
                        <InputError className="mt-2" message={state?.errors?.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email ?? ""}
                            onChange={handleChange}
                            required
                            autoComplete="username"
                            placeholder="Email address"
                        />
                        <InputError className="mt-2" message={state?.errors?.email} />
                    </div>

                    {mustVerifyEmail && (
                        <div>
                            <p className="text-muted-foreground -mt-4 text-sm">
                                Your email address is unverified.&nbsp;&nbsp;
                                <button
                                    type="button"
                                    onClick={handleVerifildEmail}
                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                >
                                    Click here to resend the verification email.
                                </button>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button disabled={pending}>Save</Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Saved</p>
                        </Transition>
                    </div>
                </form>
            </div>

            <DeleteUser />
        </>
    );
}
