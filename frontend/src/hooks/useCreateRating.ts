import { useToast } from '@/components/ui/use-toast'
import { createRating } from '@/service/RecipeGeneratorAPI'
import { TCreateRating } from '@/types/Ratings.types'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateRating = () => {
	const { getAccessTokenSilently } = useAuth0()
	const { toast } = useToast()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (rating: TCreateRating) => {
			const token = await getAccessTokenSilently()
			return createRating(token, rating)
		},
		onSuccess: (_data, rating) => {
			toast({
				title: 'Success',
				description: 'Rating submitted successfully!',
			})
			queryClient.invalidateQueries({
				queryKey: ['Single Recipe', rating.recipeId],
			})
		},
		onError: () => {
			toast({
				variant: 'destructive',
				title: 'Error',
				description: 'Could not submit rating. Please try again.',
			})
		},
	})
}

export default useCreateRating
