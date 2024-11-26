import mongoose, { Schema } from 'mongoose';

export const userSchema = new Schema({
    firstName : String,
    lastName: String,
    mail: String,
    status: String,
    password : String,
});

export const User = mongoose.model('User', userSchema);