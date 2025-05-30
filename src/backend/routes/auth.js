import express from "express"
import User from "../modules/User.js"
import { body, validationResult } from "express-validator"


const router = express.Router()

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


router.post('/', registerValidation, async (req, res) => {
    const error = validationResult(req)

    if (!error.isEmpty()) {
        res.status(422).json({ errors: error.array() })
    }
    // res.send("user created")

    try {
        const { userName, email, password } = req.body

        const user = new User({
            userName,
            email,
            password
        })
        await user.save()   // store data in mongodb

        res.send(req.body)                //for debugging (to see what server has recived)
        res.status(201).send(user)        //returning a newly created resource.

    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})
export default router
