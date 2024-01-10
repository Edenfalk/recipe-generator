import { Route, Routes } from 'react-router-dom'
import NavMenu from './components/NavMenu'
import HomePage from './pages/HomePage'
import MyRecipesPage from './pages/MyRecipesPage'
import CreateRecipePage from './pages/CreateRecipePage'
import LoadingSpinner from './components/LoadingSpinner'
import { Toaster } from './components/ui/toaster'
import SingleRecipePage from './pages/SingleRecipePage'
import PublicRecipesPage from './pages/PublicRecipesPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
	return (
		<>
			<>
				<div>
					<NavMenu />
					<LoadingSpinner />
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route
							path='/myrecipes'
							element={
								<ProtectedRoute>
									<MyRecipesPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/createrecipe'
							element={
								<ProtectedRoute>
									<CreateRecipePage />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/recipes'
							element={<PublicRecipesPage />}
						/>
						<Route
							path='/recipes/:id'
							element={<SingleRecipePage />}
						/>

						{/* Not Found */}
						{/* <Route path='*' element={<PageNotFound />} /> */}
					</Routes>
					<Toaster />
				</div>
			</>
		</>
	)
}

export default App
