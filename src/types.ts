import { z } from 'zod';

const UserSchema = z.object({
    name: z.string(),
    mail: z.string().email(),
    photoURL: z.string().url(),
    uid: z.string(),
    token: z.string(),
    bizName: z.string(),
    country: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;

export interface GoogleObject {
    name: string | null;
    mail: string | null;
    photoURL: string | null;
    uid: string | null;
    token: string | null;
}

const contactsSchema = z.array(z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    note: z.string(),
    status: z.string(),
    owner: z.string(),
    _id: z.string()
}))

export type ContactsType = z.infer<typeof contactsSchema>



export const contactFormSchema = z.object({
    name: z.string().min(2, { message: 'At least 2 characters long' }),
    email: z.string().email({ message: 'Invalid email' }),
    phone: z.string().optional(),
    note: z.string().optional(),
    status: z.string(),
});


const contactSchema = z.object({
    name: z.any() || null,
    email: z.any() || null,
    phone: z.any() || null,
    note: z.any() || null,
    status: z.any() || null,
    owner: z.any() || null,
})

export type ContactType = z.infer<typeof contactSchema>

// Email form
export const formTypes = z
    .object({
        email: z.string().email(),
        recipientName: z.string(),
        fromName: z.string(),
        subject: z.string(),
        bodyTitle: z.string(),
        body: z.string(),
    })

export type formSchema = z.infer<typeof formTypes>;

// Create new contact form
export const createNewContactFormType = z.object({
    name: z.string().min(2, { message: 'At least 2 characters long' }),
    email: z.string().email({ message: 'Invalid email' }).optional(),
    phone: z.string().optional(),
    note: z.string().optional(),
    status: z.string(),
    owner: z.string(),
})

export type CreateNewContactFormSchema = z.infer<typeof createNewContactFormType>;