import express from "express"
import User from "../modules/User.js"

const router = express.Router()

router.post('/', async (req,res)=>{
    try {
        const {userName,email,password} = req.body

        const user = new User({
            userName,
            email,
            password
          })
          await user.save() 
          // store data in mongodb
          res.send(req.body)
          res.status(201).send(user)

    } catch (error) {
        res.status(400).send({error:error.message})
    }
})
export default router
