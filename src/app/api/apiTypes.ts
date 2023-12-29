import { z } from "zod";

const ContactGetSchema = z.object({
    params: z.object({
        _id: z.string(),
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        note: z.string(),
        status: z.string(),
        owner: z.string()
    })
});

export type ContactGetType = z.infer<typeof ContactGetSchema>;
