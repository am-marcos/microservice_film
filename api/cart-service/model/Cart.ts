import mongoose, { Schema } from 'mongoose';

export const cartSchema = new Schema({
    user_id: {
                type: Schema.ObjectId, 
                required: true, 
                unique : true
            },
    movies: {type : Array<typeof Schema.ObjectId>}
});

export const Cart = mongoose.model('Cart', cartSchema);