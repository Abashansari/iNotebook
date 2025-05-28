import mongoose from 'mongoose'
import express from 'express'

const mongoURL = "mongodb://localhost:27017/"

mongoose.connect('mongodb://localhost:27017')
.then(()=>{
    console.log("mongodb is conected")
})
.catch((error =>{
    console.log("not conected :"+ error)
}))

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
