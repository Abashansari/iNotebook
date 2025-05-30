import mongoose from "mongoose";

const mongoURL = "mongodb://localhost:27017/iNotebook"

const connectToMongo = async () => {
    
    try {
        await mongoose.connect(mongoURL)
        console.log("mongodb is sucessfully connected !")
    } catch (error) {
        console.log("mongodb not connected", error.message)
    }
}
export default connectToMongo
