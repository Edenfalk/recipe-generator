import useCreateRating from '@/hooks/useCreateRating'
import { TRecipe } from '@/types/Recipe.types'
import { useState } from 'react'
import StarRatings from 'react-star-ratings'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './ui/alert-dialog'
import { Star } from 'lucide-react'

interface RecipeProps {
	recipe: TRecipe
}

const RateRecipe: React.FC<RecipeProps> = ({ recipe }) => {
	const { mutate: submitRating } = useCreateRating()
	const [rating, setRating] = useState(0)
	const [hover, setHover] = useState(0)
	const handleMouseOver = (value: number) => {
		setHover(value)
	}
	const handleMouseLeave = () => {
		setHover(0)
	}
	const handleClick = (value: number) => {
		setRating(value)
	}
	const handleRating = () => {
		const recipeRating = {
			recipeId: recipe.id,
			value: rating,
		}
		submitRating(recipeRating)
	}
	return (
		<div>
			{recipe.averageRating && (
				<div className='flex items-center'>
					<StarRatings
						rating={Number(recipe.averageRating) ?? 0}
						starDimension='22px'
						starRatedColor='#f9cb14'
						starSpacing='6px'
					/>
					<span className='ml-2'>{recipe.averageRating}</span>
					<span className='ml-2'>({recipe.ratings.length})</span>
				</div>
			)}
			<AlertDialog>
				<AlertDialogTrigger
					asChild
					className='underline cursor-pointer'
				>
					<span>Rate</span>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Rate recipe</AlertDialogTitle>
						<AlertDialogDescription className='flex gap-2 justify-center'>
							{[1, 2, 3, 4, 5].map((star, index) => (
								<Star
									key={index}
									className={`h-8 w-8 cursor-pointer ${
										(hover || rating) >= star
											? 'text-yellow-500'
											: 'text-gray-300'
									}`}
									onMouseOver={() => handleMouseOver(star)}
									onMouseLeave={handleMouseLeave}
									onClick={() => handleClick(star)}
								/>
							))}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleRating}>
							Send
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}

export default RateRecipe
