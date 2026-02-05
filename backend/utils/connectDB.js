import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Connected : ${conn.connection.host}`);
    } catch (error) {
        console.log("Error in connecting to MongoDB");
        process.exit(1);
    }
}

export default connectDB;