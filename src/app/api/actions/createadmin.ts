'use server';

import { createAdminSchema, FormStateCreateAdmin } from '@/lib/definitions';
import prisma from '@/lib/prisma';
import { createSession } from '@/lib/session';
import * as bcrypt from 'bcrypt-ts';

export async function createAdmin(state: FormStateCreateAdmin, formData: FormData): Promise<FormStateCreateAdmin> {
    const validatedFields = createAdminSchema.safeParse({
        name: formData.get('name') as string,
        email: (formData.get('email') as string)?.toLowerCase().trim(),
        password: formData.get('password') as string,
        role: formData.get('role') as string,
        password_confirmation: formData.get('password_confirmation') as string
    });

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    };

    const { name, email, password, role } = validatedFields.data;

    try {
        const hashedPassword = password ? await bcrypt.hash(password, 12) : undefined;

        const user = await prisma.user.create({
            data: { name, email, role, password: hashedPassword! }
        });

        await createSession(user.id);

        return { message: true };
    } catch (error) {
        console.error(error);
        return { warning: 'Something went wrong. Please try again later.' };
    }
}