import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import axios from 'axios'
import { auth } from 'express-oauth2-jwt-bearer'
import { Request, Response, NextFunction } from 'express'
import { HttpError } from './types.ts/error.types'
const app = express()

// Allow only localhost/5173 to access the API
app.use(
	cors({
		origin: 'http://localhost:5173',
	})
)

const jwtCheck = auth({
	audience: 'recipe identifier',
	issuerBaseURL: 'https://dev-3nj4djtzbgg2m04j.us.auth0.com/',
	tokenSigningAlg: 'RS256',
})

//Global middleware, must be first in order if the routes is protected by middleware. Logs all the requests
app.use(morgan('dev'))
// Allows a client to send JSON to the server
app.use(jwtCheck, express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
	console.log('hello from express')
	res.status(200)
	res.json({ message: 'hello' })
})
app.get('/protected', async (req, res) => {
	try {
		console.log('hello from protected express')
		// Extrahera access token från Authorization-header
		const parts = req.headers.authorization?.split(' ')
		if (parts && parts.length === 2 && parts[0] === 'Bearer') {
			const accessToken = parts[1]
			const response = await axios.get(
				'https://dev-3nj4djtzbgg2m04j.us.auth0.com/userinfo',
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)

			const userInfo = response.data
			console.log(userInfo)

			// Skicka tillbaka användarinformationen
			res.status(200).json(userInfo)
		} else {
			// Om token inte finns eller är felaktigt formaterad
			res.status(401).send('Unauthorized')
		}
	} catch (error) {
		console.error(error)
		res.status(500).send('Internal Server Error')
	}
})

app.use('/api', router)
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
