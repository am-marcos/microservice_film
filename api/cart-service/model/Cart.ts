import mongoose, { Schema } from 'mongoose';

export const cartSchema = new Schema({
    user_id: {type: String, required: true, unique : true},
    movies: { type : Array<object>}
});

export const Cart = mongoose.model('Cart', cartSchema);