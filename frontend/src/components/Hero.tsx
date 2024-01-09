import { useAuth0 } from '@auth0/auth0-react'
import { Button } from './ui/button'

const Hero = () => {
	const { loginWithRedirect } = useAuth0()
	return (
		<div className="min-h-screen flex flex-row justify-between items-center lg:px-32 px-5 bg-[url('./assets/img/codHero.png')] bg-cover bg-no-repeat bg-center mb-6">
			<div
				className='w-full lg:w-2/3 space-y-5 max-w-5xl lg:pl-32 text-white'
				style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}
			>
				<h1 className='text-6xl font-semibold'>
					Start getting creative with AI generated recipes
				</h1>
				<p className='font-bold text-xl'>
					Elevate your cooking game with AI. Create, share, and
					explore innovative recipes. Dive into a world of culinary
					magic today!
				</p>

				<div className='flex justify-end'>
					<Button size='lg' onClick={() => loginWithRedirect()}>
						Register Free Account
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Hero
