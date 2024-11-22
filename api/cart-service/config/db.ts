import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.URL}`)
        console.log('Connecting to DB');
    } catch (err) {
        console.log(err);
    }
}

export default connectDB