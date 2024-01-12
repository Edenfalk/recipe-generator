import RecipeCard from '@/components/RecipeCard'
import useGetPublicRecipes from '@/hooks/useGetPublicRecipes'

const PublicRecipesPage = () => {
	const { data: publicRecipes } = useGetPublicRecipes()
	return (
		<>
			<h1 className='text-xl text-center font-bold mt-5'>All recipes</h1>
			{publicRecipes && <RecipeCard recipes={publicRecipes} />}
		</>
	)
}

export default PublicRecipesPage
