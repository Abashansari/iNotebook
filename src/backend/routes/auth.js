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
                throw new Error("Sorry a user with this Email is already exist")         // Throw error instead of res.send()
            }
        }),
    body('password').isStrongPassword().withMessage('Weak password')
]

//-----------------------------------------------Creating a User------------------------------------------------------------------------------------>

router.post('/createUser', registerValidation, async (req, res) => {
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

        //--------------------------------------Creating a Token------------------------------------------------------------------------>

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, 'shhhhh')      // Ideally, use process.env.JWT_SECRET
        res.json({ authtoken })

        //-------------------------------------Storing data in mongodb-------------------------------------------------------------------->

        await user.save()
        // res.json(req.body)                             //for debugging (to see what server has recived)
        res.status(201).json({ userName, email })          //returning a newly created resource.

    } catch (error) {
        res.status(400).json({ error: error.message })

    }
})

//----------------------------Authenticating a User------------------------------------------------------------------------------------->

const loginValidation = [
    body('email').isEmail().withMessage("Invalid email"),
    body('password').notEmpty().withMessage("password is required")
]

router.post('/login', loginValidation, async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() }); // Add return to prevent further code execution
    }

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid credentials: email not found" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Invalid credentials: wrong password" });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        const authtoken = jwt.sign(payload, 'shhhhh'); // Ideally, use process.env.JWT_SECRET
        res.json({ authtoken });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router
