import { Button } from '@/components/ui/button'
import useOpenAiRecipe from '@/hooks/useOpenAiRecipe'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

const HomePage = () => {
	const { getAccessTokenSilently } = useAuth0()
	const callApi = async () => {
		const response = await axios.get('http://localhost:3001')
		console.log(response.data)
	}
	const callProtectedApi = async () => {
		const token = await getAccessTokenSilently()
		console.log(token)
		const response = await axios.get('http://localhost:3001/protected', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log(response.data)
	}
	const ingredients = ['potatoes', 'bacon', 'all spice', 'onions']
	const time = '30'
	const servings = '4'

	const { data } = useOpenAiRecipe(ingredients, time, servings)

	console.log('data from HP', data)

	return (
		<div>
			<Button onClick={callApi}>Call API route</Button>
			<Button onClick={callProtectedApi}>Call Protected API route</Button>
		</div>
	)
}

export default HomePage
