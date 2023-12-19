import { TOpenAiRecipe } from '@/types/Recipe.types'
import React from 'react'
import { Button } from './ui/button'
import { ArrowLeftFromLine, Download } from 'lucide-react'

interface RecipeProps {
	recipe: TOpenAiRecipe
	onNewRecipe: () => void
}

const RecipeDisplay: React.FC<RecipeProps> = ({ recipe, onNewRecipe }) => {
	return (
		<div className='max-w-4xl mx-auto p-6 shadow-lg border rounded-lg'>
			<h1 className='text-3xl lg:text-4xl font-bold mb-3'>
				{recipe.title}
			</h1>
			<p className='text-gray-600 text-lg mb-6'>{recipe.description}</p>

			<div className='grid md:grid-cols-2 gap-6 mb-6'>
				<div>
					<h2 className='text-2xl font-semibold mb-3'>Ingredients</h2>
					<ul className='list-disc list-inside text-gray-600'>
						{recipe.ingredients.map((ingredient, index) => (
							<li key={index}>{ingredient}</li>
						))}
					</ul>
				</div>

				<div>
					<h2 className='text-2xl font-semibold mb-3'>
						Instructions
					</h2>
					<ol className='list-decimal list-inside text-gray-600'>
						{recipe.instructions.map((instruction, index) => (
							<li key={index}>{instruction}</li>
						))}
					</ol>
				</div>
			</div>

			<div className='text-gray-800 font-medium mb-3'>
				<span>Time to cook: {recipe.time}</span> |{' '}
				<span>Servings: {recipe.servings}</span>
			</div>
			<div className='flex justify-between'>
				<Button variant='outline' onClick={onNewRecipe}>
					<ArrowLeftFromLine className='pe-2' />
					Create new recipe
				</Button>
				<Button>
					Save to my recipes <Download className='ps-2' />
				</Button>
			</div>
		</div>
	)
}

export default RecipeDisplay
