import { z } from 'zod'

export const ZRecipeSchema = z.object({
	servings: z.string().min(1),
	time: z.string().min(1),
	ingredients: z.string().array().min(1),
})

export type TCreateRecipeSchema = z.infer<typeof ZRecipeSchema>
