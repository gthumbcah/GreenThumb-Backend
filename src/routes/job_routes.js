import { Router } from "express"
import { JobModel, UserModel } from "../db.js"
import j_auth from '../middleware/j_auth.js'
import { validationResult } from 'express-validator'
import { newJobValidate } from "../middleware/validations.js"

const router = Router()

// View all Jobs -- Admin/ Owners (list of jobs they are assoc with)
router.get('/',j_auth, async (req, res) => {
    res.send(await JobModel.find().populate('users'))
})

// create job  --- Admin Only
router.post('/', newJobValidate, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const newJob = await (await JobModel.create(req.body)).populate('users')
        res.send(newJob)
    }
    catch (err) {
        res.status(400).send({ err: err.message })
    }
})

// read 1 job  -- ((Admin and owner))
router.get('/:id',j_auth, async (req, res) => {
    const job = await JobModel.findById(req.params.id).populate('users')
    if (job) {
        res.send(job)
    } else {
        res.status(400).send({ 'Error': 'Job not found'})
    }
})

// update -- (Admin)
router.put('/:id', async (req, res) => {
    const job = await JobModel.findById(req.params.id)
    const users = await UserModel.find()
    // need to make handler for if user id added isnt a user id
    if (job) {
        const updatedJob = await JobModel.findByIdAndUpdate(req.params.id, req.body, {new:true}).populate('users')
        res.send(updatedJob)
    } else {
        res.status(400).send({ 'Error': 'Job not found'})
    }
})

//delete ( Admin Only)
router.delete('/:id', async (req, res) => {
    const job = await JobModel.findById(req.params.id)
    if (job) {
        await JobModel.findByIdAndDelete(req.params.id)
        res.send(job) // Should we make it send back a message??
    } else {
        res.status(400).send({ 'Error': 'Job not found'})
    }
})

export default router