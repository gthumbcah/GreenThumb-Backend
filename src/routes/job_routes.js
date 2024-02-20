import { Router } from "express"
import { JobModel, UserModel } from "../db.js"


const router = Router()

// View all Jobs
router.get('/', async (req, res) => {
    res.send(await JobModel.find().populate('users'))
})

// create job
router.post('/', async (req, res) => {
    try {
        const newJob = await JobModel.create(req.body)
        res.send(newJob)
    }
    catch (err) {
        res.status(400).send({ err: err.message })
    }
})

// read 1 job
router.get('/:id', async (req, res) => {
    const job = await JobModel.findById(req.params.id).populate('users')
    if (job) {
        res.send(job)
    } else{
        res.status(400).send({ 'Error': 'Job not found'})
    }
})

// update
router.put('/:id', async (req, res) => {
    const job = await JobModel.findById(req.params.id)
    const users = await UserModel.find()
    // need to make handler for if user id added isnt a user id
    if (job) {
        const updatedJob = await JobModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.send(updatedJob)
    } else{
        res.status(400).send({ 'Error': 'Job not found'})
    }
})

//delete
router.delete('/:id', async (req, res) => {
    const job = await JobModel.findById(req.params.id)
    if (job) {
        await JobModel.findByIdAndDelete(req.params.id)
        res.send(job) // Should we make it send back a message??
    } else{
        res.status(400).send({ 'Error': 'Job not found'})
    }
})

export default router