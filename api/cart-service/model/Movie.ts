import mongoose, { Schema } from 'mongoose';

export const movieSchema = new Schema({
    picture: String,
    title: String,
    summary: String,
    release_date: Date,
    author: Array<String>,
    duration: Number,
    genre: Array<String>
});

export const Movie = mongoose.model('Movie', movieSchema);