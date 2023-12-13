import { z } from 'zod';

const UserSchema = z.object({
    name: z.string(),
    mail: z.string().email(),
    photoURL: z.string().url(),
    uid: z.string(),
    token: z.string()
});

export type UserType = z.infer<typeof UserSchema>;

export interface GoogleObject {
    name: string | null;
    mail: string | null;
    photoURL: string | null;
    uid: string | null;
    token: string | null;
}