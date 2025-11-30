import prisma from '@/lib/prisma';
import RegisterAdmin from './form-register-admin';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getSession } from '@/lib/session';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('RegisterAdmin.Metadata');
  return {
    title: t('Title')
  };
};

export default async function Register() {
  const session = await getSession();
  const adminCount = await prisma.user.count({
    where: { role: 'ADMIN' }
  });
  const hasAdmin = adminCount > 0;
  if (hasAdmin) {
    if (session) redirect('/dashboard');
    redirect('/');
  }

  return <RegisterAdmin />;
}