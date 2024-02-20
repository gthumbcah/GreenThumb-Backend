import { Router } from "express"
import { UserModel } from "../db.js"


const router = Router()

// View all users
router.get('/', async (req, res) => {
    res.send(await UserModel.find())
})

// create user
router.post('/', async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body)
        res.send(newUser)
    }
    catch (err) {
        res.status(400).send({ err: err.message })
    }
})

// read 1 user
router.get('/:id', async (req, res) => {
    const user = await UserModel.findById(req.params.id)
    if (user) {
        res.send(user)
    } else{
        res.status(400).send({ 'Error': 'User not found'})
    }
})

// update
router.put('/:id', async (req, res) => {
    const user = await UserModel.findById(req.params.id)
    if (user) {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.send(updatedUser)
    } else{
        res.status(400).send({ 'Error': 'User not found'})
    }
})

//delete
router.delete('/:id', async (req, res) => {
    const user = await UserModel.findById(req.params.id)
    if (user) {
        await UserModel.findByIdAndDelete(req.params.id)
        res.send(user) // Should we make it send back a message??
    } else{
        res.status(400).send({ 'Error': 'User not found'})
    }
})

export default router