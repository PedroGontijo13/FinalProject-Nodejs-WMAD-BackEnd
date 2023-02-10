import { Router } from "express";

const router = Router()

router.get('/',  (req, res) => {
    res.send('Hello')
})

router.post('/', (req, res) => {
    const name = req.body.name
    res.json(req.body.name)
})

export default router