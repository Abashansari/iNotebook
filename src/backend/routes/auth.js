import express from "express"
import User from "../modules/User.js"
import { body, validationResult } from "express-validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const router = express.Router()

//--------------------------------------------Register Validaton--------------------------------------------------------------------------------->
const registerValidation = [
    body('userName').notEmpty().withMessage('Username is required'),

    body('email').isEmail().withMessage('Invalid email')

        .custom(async (value) => {                                               // checking if user is already exist ??
            const userExist = await User.findOne({ email: value })
            if (userExist) {
                throw new Error("Email is in use")         // Throw error instead of res.send()
            }
        }),
    body('password').isStrongPassword().withMessage('Weak password')
]

//-----------------------------------------------Creating a User------------------------------------------------------------------------------------>

router.post('/', registerValidation, async (req, res) => {
    const error = validationResult(req)

    if (!error.isEmpty()) {
        res.status(422).json({ errors: error.array() })
    }
    // res.send("user created")




    try {
        const { userName, email, password } = req.body

        const saltRounds = 10                                    // Salt rounds tell bcrypt how many times to run the hashing algorithm internally
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        console.log("Hashed password:", hashedPassword)

        const user = new User({
            userName,
            email,
            password: hashedPassword                  // Store hashed password
        })
        await user.save()                                    // store data in mongodb
        // res.send(req.body)                             //for debugging (to see what server has recived)
        res.status(201).send({ userName, email })          //returning a newly created resource.

    } catch (error) {
        res.status(400).send({ error: error.message })

    }
})
export default router
