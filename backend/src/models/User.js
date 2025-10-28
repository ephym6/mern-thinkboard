import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true, // Firebase UID is unique
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    displayName: {
        type: String,
    },
    photoURL: {
        type: String,
    },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
