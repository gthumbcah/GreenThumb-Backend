import { Router } from "express"
import { UserModel } from "../db.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const router = Router()

router.post('/', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false })
        }

        const matchPassword = await bcrypt.compare(req.body.password, user.password)
        if (!matchPassword) {
            return res.status(403).json({ message: 'Invalid password', success: false })
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.admin }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })

        return res.json({
            userId: user._id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            token: token,
            message: "Login successful"
        })

    } 
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
})

export default router