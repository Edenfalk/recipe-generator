import RecipeSlider from '@/components/RecipeSlider'
import useGetPublicRecipes from '@/hooks/useGetPublicRecipes'
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

	const { data: recipes } = useGetPublicRecipes()

	return (
		<div>
			<p className='text-xl text-center mb-2 font-bold'>
				What to cook tonight?
			</p>
			{recipes && <RecipeSlider recipes={recipes} />}
		</div>
	)
}

export default HomePage
