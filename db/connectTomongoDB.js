import mongoose from "mongoose";
const connectTomongoDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connected to mongo db');

        
    } catch (error) {
        console.log("Error connecting to mongo db",error.message);
    }
}

export default connectTomongoDb;