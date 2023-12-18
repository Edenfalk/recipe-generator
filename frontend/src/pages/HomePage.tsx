import useOpenAiRecipe from '@/hooks/useOpenAiRecipe'
import { createUser } from '@/service/RecipeGeneratorAPI'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

const HomePage = () => {
	const { user, getAccessTokenSilently } = useAuth0()
	const checkNewUser = async () => {
		const token = await getAccessTokenSilently()
		if (user?.email && user.nickname && user.sub) {
			const userData = {
				email: user.email,
				nickname: user.nickname,
				auth0Id: user.sub,
			}
			createUser(userData, token)
		}
	}
	useEffect(() => {
		if (user) {
			checkNewUser()
		}
	})

	const ingredients = ['cod loin', 'bacon', 'potatoes', 'beets', 'cream']
	const time = '60'
	const servings = '6'

	const { data } = useOpenAiRecipe(ingredients, time, servings)

	console.log('data from HP', data)

	return <div></div>
}

export default HomePage
