import { Router } from "express"
import { TimeSheetModel } from "../db.js"
import { ObjectId } from "bson"

const router = Router()

router.get('/', async (req, res) => {
    res.send(await TimeSheetModel.find())
})

router.get('/:id', async (req, res) => {
    const objectId = new ObjectId(req.params.id)
    const tSheet = await TimeSheetModel.find({ users : objectId })
    res.send(tSheet)
})


export default router