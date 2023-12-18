import { Route, Routes } from 'react-router-dom'
import NavMenu from './components/NavMenu'
import HomePage from './pages/HomePage'
import MyRecipesPage from './pages/MyRecipesPage'
import CreateRecipePage from './pages/CreateRecipePage'

function App() {
	return (
		<>
			<>
				<div>
					<NavMenu />
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/myrecipes' element={<MyRecipesPage />} />
						<Route
							path='/createrecipe'
							element={<CreateRecipePage />}
						/>

						{/* Not Found */}
						{/* <Route path='*' element={<PageNotFound />} /> */}
					</Routes>
				</div>
				{/* <ToastContainer theme='colored' autoClose={2000} /> */}
			</>
		</>
	)
}

export default App
