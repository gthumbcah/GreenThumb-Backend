import { Router } from "express"
import { UserModel } from "../db.js"


const router = Router()

router.get('/', async (req, res) => {
    res.send(await UserModel.find())
})

export default router