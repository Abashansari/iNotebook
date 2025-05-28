import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017')

const User = new mongoose.Schema({
    userName :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
})
export default User