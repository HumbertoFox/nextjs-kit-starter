'use client';

import { Eye, EyeClosed, LoaderCircle } from 'lucide-react';
import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/layouts/auth-layout';
import { Icon } from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createAdmin } from '@/app/api/actions/createadmin';
import { useTranslations } from 'next-intl';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    role: string;
    password_confirmation: string;
};

export default function RegisterAdmin() {
    const t = useTranslations('RegisterAdmin');
    const emailRef = useRef<HTMLInputElement>(null);
    const [state, action, pending] = useActionState(createAdmin, undefined);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);
    const [data, setData] = useState<RegisterForm>({
        name: '',
        email: '',
        password: '',
        role: 'ADMIN',
        password_confirmation: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    };
    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => action(formData));
    };

    useEffect(() => {
        if (state?.message) {
            setData({
                name: '',
                email: '',
                password: '',
                role: 'ADMIN',
                password_confirmation: '',
            });
        };
    }, [state]);
    return (
        <AuthLayout title={t('Title')} description={t('Description')}>
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">{t('NameLabel')}</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={handleChange}
                            disabled={pending}
                            placeholder={t('NamePlaceholder')}
                        />
                        <InputError message={state?.errors?.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">{t('EmailLabel')}</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            ref={emailRef}
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={handleChange}
                            disabled={pending}
                            placeholder={t('EmailPlaceholder')}
                        />
                        <InputError message={state?.errors?.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">{t('PasswordLabel')}</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={handleChange}
                                disabled={pending}
                                placeholder={t('PasswordPlaceholder')}
                            />
                            <button
                                type="button"
                                className='absolute right-2 top-[6px] opacity-30 hover:opacity-100 duration-300 cursor-pointer'
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? <Icon iconNode={Eye} /> : <Icon iconNode={EyeClosed} />}
                            </button>
                        </div>
                        <InputError message={state?.errors?.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">{t('ConfirmPasswordLabel')}</Label>
                        <div className="relative">
                            <Input
                                id="password_confirmation"
                                name="password_confirmation"
                                type={showPasswordConfirm ? "text" : "password"}
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={handleChange}
                                disabled={pending}
                                placeholder={t('ConfirmPasswordPlaceholder')}
                            />
                            <button
                                type="button"
                                className='absolute right-2 top-[6px] opacity-30 hover:opacity-100 duration-300 cursor-pointer'
                                onClick={toggleShowPasswordConfirm}
                            >
                                {showPasswordConfirm ? <Icon iconNode={Eye} /> : <Icon iconNode={EyeClosed} />}
                            </button>
                        </div>
                        <InputError message={state?.errors?.password_confirmation} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="role">{t('RoleLabel')}</Label>
                        <Select
                            required
                            value={data.role}
                            onValueChange={(value) => setData((prev) => ({ ...prev, role: value }))}
                            disabled={pending}
                        >
                            <SelectTrigger
                                id="role"
                                name="role"
                                title={t('RoleTitle')}
                                tabIndex={5}
                            >
                                <SelectValue placeholder={t('RolePlaceholder')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ADMIN">
                                    {t('roleItem')}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={state?.errors?.role} />
                    </div>

                    <input type="hidden" name="role" value={data.role} />

                    <Button type="submit" className="mt-2 w-full" tabIndex={6} disabled={pending} aria-busy={pending}>
                        {pending && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {t('Submit')}
                    </Button>
                </div>
            </form>

            {state?.warning && <div className="mb-4 text-center text-sm font-medium text-orange-400">{t(state.warning)}</div>}
        </AuthLayout>
    );
}
