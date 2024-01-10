import { Link } from 'react-router-dom'
import Container from './Container'
import { Button } from './ui/button.tsx'
import { Menu } from 'lucide-react'
import ProfileButton from './ProfileButton'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { ModeToggle } from './ModeToggle.tsx'
import { useAuth0 } from '@auth0/auth0-react'
import { NavLink } from 'react-router-dom'

const NavMenu = () => {
	const { user, isLoading } = useAuth0()
	const { loginWithRedirect } = useAuth0()
	const handleLogin = () => {
		loginWithRedirect()
	}
	return (
		<>
			<header className='sm:flex sm:justify-between py-3 px-4 border-b'>
				<Container>
					<div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full'>
						<div className='flex items-center'>
							<Sheet>
								<SheetTrigger>
									<Menu className='h-6 md:hidden w-6' />
									<SheetContent
										side='left'
										className='w-[300px] sm:w-[400px]'
									>
										<nav className='flex flex-col gap-4'>
											{user && (
												<>
													<Link
														to='/createrecipe'
														className='block px-2 py-1 lext-lg'
													>
														Create Recipe
													</Link>
													<Link
														to='/myrecipes'
														className='block px-2 py-1 lext-lg'
													>
														My Recipes
													</Link>
												</>
											)}
											<Link
												to='/recipes'
												className='block px-2 py-1 lext-lg'
											>
												Recipes
											</Link>
										</nav>
									</SheetContent>
								</SheetTrigger>
							</Sheet>

							<Link to='/'>
								<h1 className='font-bold'>RECIPE GENERATOR</h1>
							</Link>
						</div>
						<div className='flex items-center'>
							<nav
								className='mx-6 flex space-x-4 lg:space-x-6 hidden md:block'
								id='navbar'
							>
								{user && (
									<Button asChild variant='link'>
										<NavLink to='/createrecipe'>
											Create Recipe
										</NavLink>
									</Button>
								)}
								{user && (
									<Button asChild variant='link'>
										<NavLink to='/myrecipes'>
											My Recipes
										</NavLink>
									</Button>
								)}
								<Button asChild variant='link'>
									<NavLink to='/recipes'>Recipes</NavLink>
								</Button>
							</nav>
							<div aria-label='Toggle Theme' className='mr-6'>
								<ModeToggle />
							</div>
							<span className='sr-only'>Toggle Theme</span>
							{!isLoading && user && <ProfileButton />}
							{!user && !isLoading && (
								<Button onClick={handleLogin}>
									Login / Register
								</Button>
							)}
						</div>
					</div>
				</Container>
			</header>
		</>
	)
}

export default NavMenu
