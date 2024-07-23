import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ReactAndC#Project');
        console.log('MongoDB connected...');
        
    } catch(err) {
        console.error((err as Error).message);
        // process.exit(1);
    }
}

export default connectDB;