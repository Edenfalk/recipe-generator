import useGetRecipesByUser from '@/hooks/useGetRecipesByUser'

const MyRecipesPage = () => {
	const myRecipes = useGetRecipesByUser()
	console.log(myRecipes.data)
	return <div></div>
}

export default MyRecipesPage
