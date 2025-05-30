
import express from "express";
import router from "./routes/auth.js"
import connectToMongo from "./db.js";

connectToMongo()

const app = express()
const port = 3000

app.use(express.json())

app.use("/api/auth", router)


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})


