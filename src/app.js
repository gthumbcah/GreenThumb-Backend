import express from 'express'
import { UserModel } from './db.js'

const app = express()

app.get('/', (req, res) => {
    res.send({info : 'Hello!'}) 
})

export default app