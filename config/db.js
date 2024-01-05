import mongoose from "mongoose";
import 'dotenv/config'

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI , {
          
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Mongo connected: ${db.connection.host}`);
    } catch (error) {
        console.log(error)
        
    }
}
export default connectDB