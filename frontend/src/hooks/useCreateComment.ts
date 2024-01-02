import { useToast } from '@/components/ui/use-toast'
import { createComment } from '@/service/RecipeGeneratorAPI'
import { TCreateComment } from '@/types/Comments.types'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateComment = () => {
	const { getAccessTokenSilently } = useAuth0()
	const { toast } = useToast()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (comment: TCreateComment) => {
			const token = await getAccessTokenSilently()
			return createComment(token, comment)
		},
		onSuccess: (data) => {
			toast({
				title: 'Success',
				description: 'Comment posted!',
			})
			queryClient.invalidateQueries({
				queryKey: ['Single Recipe', data.recipeId],
			})
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'Could not post comment. Please try again.',
			})
		},
	})
}

export default useCreateComment
