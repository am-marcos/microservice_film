import mongoose, { Schema } from 'mongoose';

export const movieSchema = new Schema({
    user_id: {type: String, required: true, unique : true},
    movies: {type : Array<object>}
});

export const Movie = mongoose.model('Movie', movieSchema);