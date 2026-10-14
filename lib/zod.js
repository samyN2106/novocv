import * as z from 'zod'
 
export const InscriptionFormSchema = z.object({

  email: z.email({ error: 'Veuillez saisir une adresse e-mail valide.' }).trim(),
  password: z
    .string()
    .min(8, { error: 'Le mot de passe doit contenir au moins 8 caractères' })
    .regex(/[a-zA-Z]/, { error: 'Le mot de passe doit contenir au moins une lettre' })
    .regex(/[0-9]/, { error: 'Le mot de passe doit contenir au moins un chiffre.' })
    .trim(),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, { error: "Le mot de passe ne correspondent pas.", path: ["confirmPassword"], });



export const ConnexionFormSchema=z.object({
  email: z.email({ error: 'Veuillez saisir une adresse e-mail valide.' }).trim(),
  password: z
    .string()
    .min(1, { error: '' })
    .trim(),
})