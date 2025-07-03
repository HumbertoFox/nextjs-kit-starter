import prisma from '@/lib/prisma';
import RegisterAdmin from './form-register-admin';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('RegisterAdmin.Metadata');
  return {
    title: t('Title')
  };
};
export default async function Register() {
    const isUserAdmin = await prisma.user.findMany({ where: { role: 'ADMIN' } });
    if (isUserAdmin.length > 0) redirect('/dashboard');
    return <RegisterAdmin />;
}