import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

const corsOptions = {
	origin: 'http://localhost:5173/',
}

// Allow only localhost/5173 to access the API
app.use(cors(corsOptions))

//Global middleware, must be first in order if the routes is protected by middleware. Logs all the requests
app.use(morgan('dev'))
// Allows a client to send JSON to the server
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
	console.log('hello from express')
	res.status(200)
	res.json({ message: 'hello' })
})

app.use('/api', router)
export default app
