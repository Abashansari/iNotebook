import express from "express"
import router from "express"
import User from "../modules/User"
import { Schema } from "mongoose"


router.get('/', (req,res)=>{
    console.log(req.body)
    const user = User(req.body)
    user.save()
    res.send(req.body)


  

})
export default router