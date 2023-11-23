import { z } from "zod";

const ContactGetSchema = z.object({
    params: z.object({
        owner: z.string()
    })
});

export type ContactGetType = z.infer<typeof ContactGetSchema>;
