import { TOpenAiRecipe } from '@/types/Recipe.types'
import React from 'react'
import { Button } from './ui/button'
import { ArrowLeftFromLine, Download } from 'lucide-react'
import { useCreateRecipe } from '@/hooks/useCreateRecipe'
import { BeatLoader } from 'react-spinners'

interface RecipeProps {
	recipe: TOpenAiRecipe
	onNewRecipe: () => void
}

const RecipeDisplay: React.FC<RecipeProps> = ({ recipe, onNewRecipe }) => {
	const { mutate, isPending } = useCreateRecipe()
	const handleCreateRecipe = async () => {
		mutate(recipe)
	}
	return (
		<div className='max-w-7xl mx-auto p-6 shadow-lg border rounded-lg mt-10'>
			<h1 className='text-3xl lg:text-4xl font-bold mb-3'>
				{recipe.title}
			</h1>
			<p className='text-lg mb-6'>{recipe.description}</p>

			<div className='grid md:grid-cols-2 gap-6 mb-6'>
				<div>
					<h2 className='text-2xl font-semibold mb-3'>Ingredients</h2>
					<ul className='list-disc list-inside'>
						{recipe.ingredients.map((ingredient, index) => (
							<li key={index}>{ingredient}</li>
						))}
					</ul>
				</div>

				<div>
					<h2 className='text-2xl font-semibold mb-3'>
						Instructions
					</h2>
					<ol className='list-decimal list-inside'>
						{recipe.instructions.map((instruction, index) => (
							<li key={index}>{instruction}</li>
						))}
					</ol>
				</div>
			</div>

			<div className='font-medium mb-3'>
				<span>Time to cook: {recipe.time}</span> |{' '}
				<span>Servings: {recipe.servings}</span>
			</div>
			<div className='flex justify-between'>
				<Button variant='outline' onClick={onNewRecipe}>
					<ArrowLeftFromLine className='pe-2' />
					Create new recipe
				</Button>
				<Button onClick={handleCreateRecipe} disabled={isPending}>
					{isPending ? (
						<BeatLoader size={8} className='px-10' />
					) : (
						<>
							Save to my recipes <Download className='ps-2' />
						</>
					)}
				</Button>
			</div>
		</div>
	)
}

export default RecipeDisplay
