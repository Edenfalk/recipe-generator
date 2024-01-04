import RecipeCard from '@/components/RecipeCard'
import useGetPublicRecipes from '@/hooks/useGetPublicRecipes'

const PublicRecipesPage = () => {
	const { data: publicRecipes } = useGetPublicRecipes()
	return <>{publicRecipes && <RecipeCard recipes={publicRecipes} />}</>
}

export default PublicRecipesPage
