import connectToMongo from "./db.js";
import express from "express";
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
import cors from 'cors'


connectToMongo()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);


app.listen(port, () => {
  console.log(`iNotebook backend listening on port: ${port}`)
})


