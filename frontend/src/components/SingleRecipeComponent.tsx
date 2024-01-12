import { Clock, User } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import { useMakeRecipePublic } from '@/hooks/useMakeRecipePublic'
import RateRecipe from './RateRecipe'
import { TRecipe } from '@/types/Recipe.types'
interface RecipeProps {
	recipe: TRecipe
}

const SingleRecipeComponent: React.FC<RecipeProps> = ({ recipe }) => {
	const { mutate: makePublic } = useMakeRecipePublic()
	const { user } = useAuth0()
	const userId = user?.sub
	if (!recipe) {
		return
	}

	const handleMakeRecipePublic = () => {
		makePublic(recipe.id)
	}

	return (
		<div className='mx-auto max-w-7xl flex flex-col items-center justify-center p-8'>
			<div className='flex flex-col md:flex-row w-full'>
				<div className='w-full md:w-1/2'>
					<img
						src={recipe.imageUrl}
						alt={recipe.title}
						className='w-full h-auto md:h-full object-cover md:object-contain'
					/>
				</div>

				<div className='w-full md:w-1/2 flex flex-col gap-4 p-4 md:self-center'>
					<h1 className='text-3xl font-bold uppercase'>
						{recipe.title}
					</h1>
					<div>
						<span>
							{recipe.time} <Clock className='inline me-3' />
						</span>
						<span>
							{recipe.servings} servings{' '}
							<User className='inline ml-1' />
						</span>
					</div>
					<p>{recipe.description}</p>
					<RateRecipe recipe={recipe} />
					{recipe.isPublic === false &&
						userId === recipe.authorId && (
							<div className='flex justify-end items-end'>
								<Button
									onClick={handleMakeRecipePublic}
									variant='outline'
								>
									release to community
								</Button>
							</div>
						)}
				</div>
			</div>

			<div className='w-full flex flex-col md:flex-row gap-4 p-8 md:border mt-4'>
				<div className='w-full md:w-1/2'>
					<h2 className='text-xl font-bold mb-3'>Ingredients</h2>
					<ul className='list-disc pl-5'>
						{recipe.ingredients.map((ingredient, index) => (
							<li key={index}>{ingredient}</li>
						))}
					</ul>
				</div>

				<div className='w-full md:w-1/2'>
					<h2 className='text-xl font-bold mb-3'>Instructions</h2>
					<ol className='list-decimal pl-5'>
						{recipe.instructions.map((instruction, index) => (
							<li key={index}>{instruction}</li>
						))}
					</ol>
				</div>
			</div>
		</div>
	)
}

export default SingleRecipeComponent
