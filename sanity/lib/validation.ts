import {z} from "zod"

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(500),
    category: z.string().min(3).max(20),
    link: z.string().url(), // Validation simple d'URL sans vérification du type de contenu
    pitch: z.string().min(10, { message: "Pitch must be at least 10 characters" }),
});


