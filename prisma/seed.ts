
import prisma from '@/lib/prisma';
import { hashSync } from 'bcrypt-ts';


async function main() {
    const email = 'betofoxnet@nextjs.com';
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        console.log('User already exists:', existingUser);
        return;
    }

    const password = 'Admin@BetoFoxNet';

    const hashedPassword = hashSync(password, 12);

    const user = await prisma.user.create({
        data: {
            name: 'Humberto Ribeiro',
            email,
            emailVerified: new Date(),
            password: hashedPassword,
            role: 'ADMIN'
        },
    });

    console.log('User created:', user);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
