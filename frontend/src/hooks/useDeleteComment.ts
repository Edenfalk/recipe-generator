import { useToast } from '@/components/ui/use-toast'
import { deleteComment } from '@/service/RecipeGeneratorAPI'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteComment = () => {
	const { getAccessTokenSilently } = useAuth0()
	const { toast } = useToast()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (commentId: string) => {
			const token = await getAccessTokenSilently()
			return deleteComment(token, commentId)
		},
		onSuccess: (data) => {
			toast({
				title: 'Success',
				description: 'Comment deleted!',
			})
			// invalidate comments
			queryClient.invalidateQueries({
				queryKey: ['Single Recipe', data.recipeId],
			})
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'Could not delete comment. Please try again.',
			})
		},
	})
}

export default useDeleteComment
