import { z } from 'zod'

export const ZCommentSchema = z.object({
	comment: z.string().min(1, {
		message: 'Comment must be at least 1 character.',
	}),
})

export type TCreateCommentSchema = z.infer<typeof ZCommentSchema>
