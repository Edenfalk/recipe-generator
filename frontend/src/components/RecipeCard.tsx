import React from 'react'
import { TRecipe } from '@/types/Recipe.types'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card'
import { Clock, MessageSquare, Star, User } from 'lucide-react'
import { Link } from 'react-router-dom'

interface RecipeCardProps {
	recipes: TRecipe[]
}

const truncate = (str: string, num: number) => {
	if (str.length <= num) {
		return str
	}
	return str.slice(0, num) + '...'
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipes }) => {
	return (
		<>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto p-10'>
				{recipes &&
					recipes.map((recipe) => {
						return (
							<Card
								key={recipe.id}
								className='flex flex-col justify-between h-full'
							>
								<CardHeader className='flex flex-col sm:flex-row gap-4 items-center'>
									<div className='flex-1'>
										<Link to={`/recipes/${recipe.id}`}>
											<img
												src={recipe.imageUrl}
												alt={recipe.title}
												className='w-full h-auto max-w-xs max-h-xs object-cover'
											/>
											<CardTitle className='pt-4'>
												{recipe.title}
											</CardTitle>
										</Link>
										<CardDescription className='pt-4'>
											<span className='me-4'>
												{recipe.time}{' '}
												<Clock className='inline' />
											</span>
											<span>
												{recipe.servings}
												<User className='inline ml-1' />
											</span>
										</CardDescription>
									</div>
								</CardHeader>
								<CardContent className='flex-1'>
									{truncate(recipe.description, 100)}
								</CardContent>
								<CardFooter className='flex justify-between mt-4'>
									<div className='flex items-center'>
										<Star className='me-2' />
										<span className='me-2'>
											{recipe.averageRating}
										</span>
										<span>({recipe.ratings.length})</span>
									</div>
									<div className='flex items-center'>
										<MessageSquare className='me-2' />
										{recipe.comments.length > 0 && (
											<span>
												{recipe.comments.length}
											</span>
										)}
									</div>
								</CardFooter>
							</Card>
						)
					})}
			</div>
		</>
	)
}

export default RecipeCard
