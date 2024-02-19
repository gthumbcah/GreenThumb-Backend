import express from 'express'
import { UserModel } from './db.js'

const app = express()

app.get('/', (req, res) => {
    res.send('<h2>Hello!</h2>') 
})

app.use('/entries', entryRoutes)

export default app