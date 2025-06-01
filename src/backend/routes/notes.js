import express from 'express'
import fetchUser from '../middleware/fetchuser.js'
import { body, validationResult } from 'express-validator'
import Notes from '../modules/Notes.js'

const notesRoutes = express.Router()

//-------------------------------NotesValidations----------------------------------------------------------------------->
const notesValidations = [
    body('title').isLength({ min: 3 }).withMessage("Enter a valid title"),
    body('description').isLength({ min: 5 }).withMessage("Description must be atleast 5 characters")
]

//-------------------------------Get All the Notes---------------------------------------------------------------------->

notesRoutes.get('/getNotes', fetchUser, async (req, res) => {
    const note = await Notes.find({ user: req.user.id })
    res.json(note)
})

//-------------------------------Add the Notes---------------------------------------------------------------------->

notesRoutes.post('/addNotes', fetchUser, notesValidations, async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array })
    }

    try {

        const { title, description, tag } = req.body

        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        })
        await note.save()
        res.status(201).json(note)
        console.log("addNotes route hit");

    } catch (error) {

        res.status(400).json({ error: error.message })
        res.status(500).send("Internal Server Error");

    }
})

export default notesRoutes