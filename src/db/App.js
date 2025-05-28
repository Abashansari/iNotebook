import mongoose from 'mongoose'
import express from 'express'

mongoose.connect('mongodb://localhost:27017')
.then(()=>{
    console.log("mongodb in conected")
})
.catch((error =>{
    console.log("not conected :"+ error)
}))

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
