import express from "express"
import User from "../modules/User.js"
import { body, validationResult } from "express-validator"


const router = express.Router()

const registerValidation = [
    body('userName').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isStrongPassword().withMessage('Weak password')
]


router.post('/',registerValidation, async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        res.send(422).json({errors:error.array})
    }
    res.send("user created")





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
