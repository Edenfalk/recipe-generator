import { TRecipe } from '@/types/Recipe.types'
import React from 'react'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from './ui/carousel'
import { Card, CardContent, CardFooter, CardTitle } from './ui/card'
import { Link } from 'react-router-dom'
import { MessageSquare, Star } from 'lucide-react'

interface SliderRecipeProps {
	recipes: TRecipe[]
}

const RecipeSlider: React.FC<SliderRecipeProps> = ({ recipes }) => {
	return (
		<div className='flex justify-center mb-5'>
			<Carousel
				opts={{
					align: 'start',
					loop: true,
				}}
				className='w-full max-w-screen-2xl'
			>
				<CarouselContent>
					{recipes.map((recipe) => (
						<CarouselItem
							key={recipe.id}
							className='sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
						>
							<Card className='flex flex-col justify-between h-full'>
								<CardContent className='flex aspect-square items-center justify-center p-6'>
									<Link to={`/recipes/${recipe.id}`}>
										<img
											src={recipe.imageUrl}
											alt={recipe.title}
											className='w-full h-auto object-cover'
										/>
										<CardTitle className='pt-2 text-md'>
											{recipe.title}
										</CardTitle>
									</Link>
								</CardContent>
								<CardFooter className='flex justify-between'>
									<div className='flex items-center'>
										<Star className='me-2' />
										<span className='me-2'>
											{recipe.averageRating}
										</span>
										<span>({recipe.ratings.length})</span>
									</div>
									<div className='flex items-center'>
										<MessageSquare className='me-2' />

										<span>
											{recipe.comments.length
												? recipe.comments.length
												: 0}
										</span>
									</div>
								</CardFooter>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	)
}

export default RecipeSlider
