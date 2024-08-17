import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://sharanambati26:sharan123@cluster0.9bsy8.mongodb.net/dashboard');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
}

export default connectMongoDB;
