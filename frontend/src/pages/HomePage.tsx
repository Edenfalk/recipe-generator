import Hero from '@/components/Hero'
import RecipeSlider from '@/components/RecipeSlider'
import useGetMostCommented from '@/hooks/useGetMostCommented'
import useGetMostRated from '@/hooks/useGetMostRated'
import useGetRecentlyAddedRecipes from '@/hooks/useGetRecentlyAddedRecipes'
import { createUser } from '@/service/RecipeGeneratorAPI'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

const HomePage = () => {
	const { user, getAccessTokenSilently } = useAuth0()
	const checkNewUser = async () => {
		const token = await getAccessTokenSilently()
		if (user?.email && user.nickname && user.sub && user.picture) {
			const userData = {
				email: user.email,
				nickname: user.nickname,
				auth0Id: user.sub,
				picture: user.picture,
			}
			createUser(userData, token)
		}
	}
	useEffect(() => {
		if (user) {
			checkNewUser()
		}
	})

	const { data: mostCommented } = useGetMostCommented()
	const { data: mostRated } = useGetMostRated()
	const { data: recentlyAdded } = useGetRecentlyAddedRecipes()

	return (
		<div>
			<Hero />
			<p className='text-xl text-center font-bold mt-20 mb-4'>
				Most commented recipes
			</p>
			{mostCommented && <RecipeSlider recipes={mostCommented} />}
			<p className='text-xl text-center font-bold mt-20 mb-4'>
				Popular recipes
			</p>
			{mostRated && <RecipeSlider recipes={mostRated} />}
			<p className='text-xl text-center font-bold mt-20 mb-4'>
				Recently added recipes
			</p>
			{recentlyAdded && <RecipeSlider recipes={recentlyAdded} />}
		</div>
	)
}

export default HomePage
