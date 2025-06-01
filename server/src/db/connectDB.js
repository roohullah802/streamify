import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


const connectDB = () => {
    try {
        const mongo = mongoose.connect(process.env.MONGODB_URL)
        if (mongo) {
            console.log(`mongoDB connected successfully`);
        }

    } catch (error) {
        console.log(`Error ${error.message}`);
        process.exit(1)

    }
}

export { connectDB }