import express from 'express'
import { UserModel } from './db.js'
import cors from 'cors'
import userRoutes from './routes/user_route.js'

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.send({info : 'Hello!'}) 
})

app.use('user', userRoutes)

export default app
