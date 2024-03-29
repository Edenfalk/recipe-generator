import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import axios from 'axios'
import { auth } from 'express-oauth2-jwt-bearer'
import { Request, Response, NextFunction } from 'express'
import { HttpError } from './types.ts/error.types'
import { jwtCheck, validateJwt } from './middleware/jwtMiddleware'
import userRoutes from './routes/userRoutes'
import recipeRoutes from './routes/recipeRoutes'
import commentRoutes from './routes/commentRoutes'
import ratingRoutes from './routes/ratingRoutes'
const app = express()

app.use(
	cors({
		origin: 'https://recipegen.onrender.com',
	})
)

//Global middleware, must be first in order if the routes is protected by middleware. Logs all the requests
app.use(morgan('dev'))
// Allows a client to send JSON to the server
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/users', userRoutes)
app.use('/api/recipes', recipeRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/ratings', ratingRoutes)
app.get('/', (req, res) => {
	console.log('hello from express')
	res.status(200)
	res.json({ message: 'hello' })
})

app.use((req, res, next) => {
	const error = new Error('404 Not found') as HttpError
	error.status = 404
	next(error)
})
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
	const status = error.status || 500
	const message = error.message || 'Internal server error'

	res.status(status).send(message)
})

export default app
