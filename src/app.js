import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user_routes.js'
import jobRoutes from './routes/job_routes.js'
import authRoutes from './routes/auth_routes.js'
import timesheetRoutes from './routes/timesheet_routes.js'

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.send({info : 'Hello!'}) 
})

app.use('/login', authRoutes)

app.use('/users', userRoutes)

app.use('/jobs', jobRoutes)

app.use('/timesheets', timesheetRoutes)

export default app
