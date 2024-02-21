import { Router } from "express"
import { UserModel } from "../db.js"
import bcrypt from 'bcrypt'
import e_auth from "../middleware/e_auth.js";
import m_auth from "../middleware/m_auth.js";


const router = Router()

// View all users (Admin only ( For Admin to select user to delete from list) +  Read Employee timesheet info)
router.get('/', async (req, res) => {
    res.send(await UserModel.find())
})

// create user (Admin only)
router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10)

        const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            admin: req.body.admin,
          });

        const savedUser = await newUser.save();

        res.status(201).send({
            id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            password: savedUser.password
        })
    }
    catch (err) {
        res.status(400).send({ err: err.message })
    }
})

// read 1 user  (Admin and Employee) - (Admin to read employee info / CICO from Jobs DB) 
//                                   - (Employee to read there own info)

router.get('/:id', async (req, res) => {
    const user = await UserModel.findById(req.params.id)
    if (user) {
        res.send(user)
    } else{
        res.status(400).send({ 'Error': 'User not found'})
    }
})

// update (Employee) - (Update pword when created or other details - cant change admin status)

router.put('/:id', async (req, res) => {
    
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    const user = await UserModel.findById(req.params.id)


    if (user) {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                admin: req.body.admin
            },
            {new:true}
            )
        res.send(updatedUser)
    } else{
        res.status(400).send({ 'Error': 'User not found'})
    }
})

//delete  (Admin) - (delete user chosen from list )

router.delete('/:id', async (req, res) => {
    const user = await UserModel.findById(req.params.id)
    if(user && user.admin === true){
        res.status(403).send({message: 'Unable to delete admin'})}
    
    else if (user) {
        await UserModel.findByIdAndDelete(req.params.id)
        res.send(user) // Should we make it send back a message??
    } else{
        res.status(400).send({ 'Error': 'User not found'})
    }
})


export default router