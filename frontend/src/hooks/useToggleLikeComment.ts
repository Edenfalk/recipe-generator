import { useToast } from '@/components/ui/use-toast'
import { likeComment } from '@/service/RecipeGeneratorAPI'
import { TRecipe } from '@/types/Recipe.types'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useToggleLikeComment = () => {
	const { getAccessTokenSilently } = useAuth0()
	const { toast } = useToast()
	const queryClient = useQueryClient()

	type LikeCommentInput = {
		commentId: string
		recipeId: string
	}

	return useMutation<TRecipe, Error, LikeCommentInput>({
		mutationFn: async ({ commentId }) => {
			const token = await getAccessTokenSilently()
			return await likeComment(token, commentId)
		},
		onSuccess: (_data, { recipeId, commentId }) => {
			queryClient.invalidateQueries({
				queryKey: ['Single Recipe', recipeId],
			})
			queryClient.invalidateQueries({
				queryKey: ['likeStatus', commentId],
			})
		},

		onError: () => {
			toast({
				title: 'Error',
				description: 'Could not process your like. Please try again.',
			})
		},
	})
}

export default useToggleLikeComment
