import mongoose, { Schema } from 'mongoose';

export const userSchema = new Schema({
    user_id: {type: String, required: true, unique : true},
    movies: { type : Array<object>}
});

export const User = mongoose.model('User', userSchema);