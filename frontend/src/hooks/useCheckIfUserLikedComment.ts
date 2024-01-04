import { checkIfUserLikedComment } from '@/service/RecipeGeneratorAPI'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'

const useCheckIfUserLikedComment = (commentId: string) => {
	const { getAccessTokenSilently, isAuthenticated } = useAuth0()

	return useQuery({
		queryKey: ['likeStatus', commentId],
		queryFn: async () => {
			if (!isAuthenticated) {
				return { likedByUser: false }
			}
			const token = await getAccessTokenSilently()
			return checkIfUserLikedComment(token, commentId)
		},
		enabled: !!commentId && isAuthenticated, // Kör bara query om commentId finns och användaren är inloggad
	})
}

export default useCheckIfUserLikedComment
