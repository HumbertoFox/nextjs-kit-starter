import { z, object, string } from 'zod';

export const createAdminSchema = object({
    name: string()
        .min(1, 'ErrorsZod.NameRequired'),
    email: string()
        .email('ErrorsZod.EmailInvalid'),
    role: z.enum(['ADMIN'], {
        errorMap: () => ({ message: 'ErrorsZod.RoleRequiredAdmin' }),
    }),
    password: string()
        .min(8, 'ErrorsZod.PasswordMin'),
    password_confirmation: string()
        .min(1, 'ErrorsZod.PasswordConfirmRequired')
})
    .refine((data) => data.password === data.password_confirmation, {
        message: "ErrorsZod.PasswordMatch",
        path: ['password_confirmation']
    });

export function getSignUpUpdateSchema(formData: FormData) {
    const isEdit = Boolean(formData.get('id'));

    return object({
        name: string().min(1, 'ErrorsZod.NameRequired'),
        email: string().email('ErrorsZod.EmailInvalid'),
        password: isEdit
            ? string().optional()
            : string().min(8, 'ErrorsZod.PasswordMin'),
        password_confirmation: isEdit
            ? string().optional()
            : string().min(1, 'ErrorsZod.PasswordConfirmRequired'),
        role: z.enum(['USER', 'ADMIN'], {
            errorMap: () => ({ message: 'ErrorsZod.RoleRequiredAdmin' })
        })
    })
        .superRefine((data, ctx) => {
            if (data.password && data.password !== data.password_confirmation) {
                ctx.addIssue({
                    path: ['password_confirmation'],
                    code: 'custom',
                    message: "ErrorsZod.PasswordMatch",
                });
            }
        });
}

export const signInSchema = object({
    email: string({ required_error: "ErrorsZod.EmailRequired" })
        .min(1, "ErrorsZod.EmailMin")
        .email("ErrorsZod.EmailInvalid"),
    password: string({ required_error: "ErrorsZod.PasswordRequired" })
        .min(8, "ErrorsZod.PasswordMin")
        .max(32, "ErrorsZod.PasswordMax")
})

export const updateUserSchema = object({
    name: string()
        .min(1, 'ErrorsZod.NameRequired'),
    email: string({ required_error: "ErrorsZod.EmailRequired" })
        .min(1, "ErrorsZod.EmailMin")
        .email("ErrorsZod.EmailInvalid")
})

export const deleteUserSchema = object({
    password: string()
        .min(8, 'ErrorsZod.PasswordMin')
})

export const passwordUpdateSchema = object({
    current_password: string()
        .min(8, 'ErrorsZod.PasswordCurrentMin'),
    password: string()
        .min(8, 'ErrorsZod.PasswordMin'),
    password_confirmation: string()
        .min(8, 'ErrorsZod.PasswordConfirmRequired')
})
    .refine((data) => data.password === data.password_confirmation, {
        message: "ErrorsZod.PasswordMatch",
        path: ['password_confirmation']
    });

export const passwordResetSchema = object({
    email: string({ required_error: "ErrorsZod.EmailRequired" })
        .min(1, "ErrorsZod.EmailMin")
        .email("ErrorsZod.EmailInvalid"),
    token: string({ required_error: "ErrorsZod.TokenRequired" })
        .min(1, "ErrorsZod.TokenMin"),
    password: string()
        .min(8, 'ErrorsZod.PasswordMin'),
    password_confirmation: string()
        .min(1, 'ErrorsZod.PasswordConfirmRequired')
})
    .refine((data) => data.password === data.password_confirmation, {
        message: "ErrorsZod.PasswordMatch",
        path: ['password_confirmation']
    });

export const passwordForgotSchema = object({
    email: string({ required_error: "ErrorsZod.EmailRequired" })
        .min(1, "ErrorsZod.EmailMin")
        .email("ErrorsZod.EmailInvalid"),
});

export type FormStateCreateAdmin =
    | {
        errors?: {
            name?: string[];
            email?: string[];
            role?: string[];
            password?: string[];
            password_confirmation?: string[];
        }
        message?: boolean;
        warning?: string;
    } | undefined;

export type FormStateCreateUpdateAdminUser =
    | {
        errors?: {
            name?: string[];
            email?: string[];
            role?: string[];
            password?: string[];
            password_confirmation?: string[];
        }
        message?: boolean;
    } | undefined;

export type FormStateLoginUser =
    | {
        errors?: {
            email?: string[];
            password?: string[];
        }
        message?: string;
        warning?: string;
    } | undefined;

export type FormStateUserDelete =
    | {
        errors?: {
            password?: string[];
        }
        message?: boolean;
    } | undefined;

export type FormStatePasswordUpdate =
    | {
        errors?: {
            current_password?: string[];
            password?: string[];
            password_confirmation?: string[];
        }
        message?: boolean;
    } | undefined;

export type FormStateUserUpdate =
    | {
        errors?: {
            name?: string[];
            email?: string[];
        };
        message?: string;
        success?: boolean;
    } | undefined;

export type FormStatePasswordForgot =
    | {
        errors?: {
            email?: string[];
        }
        message?: string;
    } | undefined;

export type FormStatePasswordReset =
    | {
        errors?: {
            email?: string[];
            token?: string[];
            password?: string[];
            password_confirmation?: string[];
        }
        message?: string;
        warning?: string;
    } | undefined;