import { makeRecipePublic } from '@/service/RecipeGeneratorAPI'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'

export const useMakeRecipePublic = () => {
	const { getAccessTokenSilently } = useAuth0()
	const { toast } = useToast()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (recipeId: string) => {
			const token = await getAccessTokenSilently()
			return makeRecipePublic(token, recipeId)
		},
		onSuccess: (data) => {
			toast({
				title: 'Success',
				description: 'Recipe released to community successfully!',
			})
			queryClient.invalidateQueries({
				queryKey: ['Single Recipe', data.id],
			})
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'Could not release the recipe. Please try again.',
			})
		},
	})
}
