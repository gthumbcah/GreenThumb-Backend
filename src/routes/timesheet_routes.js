import { Router } from "express"
import { TimeSheetModel } from "../db.js"
import { ObjectId } from "bson"

const router = Router()

// All time sheets
router.get('/', async (req, res) => {
    res.send(await TimeSheetModel.find())
})

// Single Users time sheets
router.get('/:id', async (req, res) => {
    const objectId = new ObjectId(req.params.id)
    const tSheet = await TimeSheetModel.find({ user : objectId })
    res.send(tSheet)
})

export default router