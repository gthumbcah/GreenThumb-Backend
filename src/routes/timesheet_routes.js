import { Router } from "express"
import { TimeSheetModel } from "../db.js"

const router = Router()

router.get('/', async (req, res) => {
    res.send(await TimeSheetModel.find())
})

export default router