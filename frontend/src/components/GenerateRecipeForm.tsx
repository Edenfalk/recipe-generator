import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TCreateRecipeSchema, ZRecipeSchema } from '@/zod/ZRecipeSchema'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useState } from 'react'
import { Card } from './ui/card'
import { Plus } from 'lucide-react'

interface GenerateRecipeFormProps {
	onRecipeSubmit: (data: TCreateRecipeSchema) => void
}
const GenerateRecipeForm: React.FC<GenerateRecipeFormProps> = ({
	onRecipeSubmit,
}) => {
	const form = useForm<TCreateRecipeSchema>({
		resolver: zodResolver(ZRecipeSchema),
		defaultValues: {
			servings: '',
			time: '',
			ingredients: [],
		},
	})

	const [ingredients, setIngredients] = useState<string[]>([])
	const [currentIngredient, setCurrentIngredient] = useState('')

	const addIngredient = () => {
		if (currentIngredient) {
			setIngredients([...ingredients, currentIngredient])
			form.setValue('ingredients', [...ingredients, currentIngredient]) // Uppdatera form-värdet
			setCurrentIngredient('')
		}
	}

	const removeIngredient = (e: React.MouseEvent, index: number) => {
		e.preventDefault()
		setIngredients((currentIngredients) =>
			currentIngredients.filter((_, i) => i !== index)
		)
		form.setValue(
			'ingredients',
			ingredients.filter((_, i) => i !== index)
		)
	}
	const handleSubmit = (data: TCreateRecipeSchema) => {
		onRecipeSubmit(data)
	}
	return (
		<div className="min-h-screen flex flex-col justify-center items-center p-12 bg-[url('./assets/img/chickenHero.png')] bg-cover bg-no-repeat bg-center mb-6">
			<h1
				className='text-6xl font-semibold mb-20 text-white'
				style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}
			>
				Create your AI generated recipes
			</h1>
			<Card className='flex lg:flex-row flex-col items-center p-8 max-w-6xl w-full opacity-90 gap-4'>
				<div className='flex flex-col w-full lg:w-1/2'>
					<h2 className='text-xl font-semibold mb-4'>Instructions</h2>
					<ol className='list-decimal list-inside text-left lg:space-y-10 font-semibold'>
						<li>
							Fill in the number of servings and the desired
							cooking time.
						</li>
						<li>Add your ingredients, one at a time.</li>
						<li>Click the 'Create Recipe' button.</li>
						<li>
							Wait for the AI to generate a recipe suggestion.
						</li>
						<li>
							If you like the recipe, save and publish it for
							others to try. An image will be created for your
							recipe upon saving.
						</li>
						<li>Happy Cooking!</li>
					</ol>
				</div>
				<div className='flex flex-col w-full lg:w-1/2'>
					<h2 className='text-xl font-semibold mb-4'>
						Create Your Recipe
					</h2>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className='max-w-md w-full flex flex-col gap-6'
						>
							<FormField
								control={form.control}
								name='servings'
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel className='text-lg'>
												Servings
											</FormLabel>
											<FormControl>
												<Input
													className='sm:max-w-full'
													placeholder='servings'
													type='number'
													min={1}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
							<FormField
								control={form.control}
								name='time'
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel className='text-lg'>
												Cooking time
											</FormLabel>
											<FormControl>
												<Input
													placeholder='Fill in cooking time in minutes'
													type='number'
													min={1}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
							<FormField
								control={form.control}
								name='ingredients'
								render={({ field }) => {
									return (
										<div className='flex flex-col gap-2'>
											<FormLabel className='text-lg'>
												Add ingredients
											</FormLabel>
											<div className='flex gap-2'>
												<FormControl className='flex-grow'>
													<Input
														placeholder='Add ingredients one by one'
														{...field}
														value={
															currentIngredient
														}
														onChange={(e) =>
															setCurrentIngredient(
																e.target.value
															)
														}
														onKeyDown={(e) => {
															if (
																e.key ===
																'Enter'
															) {
																e.preventDefault()
																addIngredient()
															}
														}}
													/>
												</FormControl>
												<Button
													className='flex-shrink-0'
													type='button'
													onClick={addIngredient}
												>
													<Plus />
												</Button>
											</div>
											<FormMessage />
										</div>
									)
								}}
							/>
							<div className='flex flex-wrap gap-2'>
								{ingredients.map((ingredient, index) => (
									<div
										key={index}
										className='flex items-center justify-between border rounded-full p-2'
									>
										<span>{ingredient}</span>
										<button
											className='ps-3'
											onClick={(e) =>
												removeIngredient(e, index)
											}
										>
											X
										</button>
									</div>
								))}
							</div>
							<Button type='submit' variant='default'>
								Create Recipe! 🍕
							</Button>
						</form>
					</Form>
				</div>
			</Card>
		</div>
	)
}

export default GenerateRecipeForm
