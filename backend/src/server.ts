import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import axios from 'axios'
import { auth } from 'express-oauth2-jwt-bearer'
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
app.get('/protected', (req, res) => {
	console.log('hello from protected express')
	res.status(200)
	res.json({ message: 'hello from protected route' })
})

app.use('/api', router)
export default app
