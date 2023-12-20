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

	const removeIngredient = (index: number) => {
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
		<div className='flex justify-center items-center p-12'>
			<Card className='flex flex-col items-center p-8 max-w-md w-full'>
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
										<FormLabel>Servings</FormLabel>
										<FormControl>
											<Input
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
										<FormLabel>Cooking time</FormLabel>
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
										<FormLabel>Add ingredients</FormLabel>
										<div className='flex gap-2'>
											<FormControl className='flex-grow'>
												<Input
													placeholder='Add ingredients one by one'
													{...field}
													value={currentIngredient}
													onChange={(e) =>
														setCurrentIngredient(
															e.target.value
														)
													}
													onKeyDown={(e) => {
														if (e.key === 'Enter') {
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
										onClick={() => removeIngredient(index)}
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
			</Card>
		</div>
	)
}

export default GenerateRecipeForm
