import { Router } from "express"
import { JobModel, UserModel } from "../db.js"
import j_auth from '../middleware/j_auth.js'
import { check, validationResult } from 'express-validator';




const router = Router()

// View all Jobs -- Admin Only (onwers)
router.get('/', async (req, res) => {
    res.send(await JobModel.find().populate('users'))
})

const newJobValidate = [
    check("customerDetails", "Please fill out details correctly")
        .isArray(),
    check("customerDetails.0")
        .notEmpty()
    //  .custom(async (value) => {                        // ensures first and last name (at least two words)
    //      const wordInName = value.trim().split(/\s+/)
    //      return wordInName.length >= 2
    // }),
        .trim()




]













// create job  --- Admin Only
router.post('/', async (req, res) => {
    try {
        const newJob = await (await JobModel.create(req.body)).populate('users')
        res.send(newJob)
    }
    catch (err) {
        res.status(400).send({ err: err.message })
    }
})

// read 1 job  -- ((Admin and owner))
router.get('/:id', async (req, res) => {
    const job = await JobModel.findById(req.params.id).populate('users')
    if (job) {
        res.send(job)
    } else{
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
    } else{
        res.status(400).send({ 'Error': 'Job not found'})
    }
})

//delete ( Admin Only)
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