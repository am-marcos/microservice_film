import express from 'express';
import connectDB from './config/db'
export const app = express();

const cart = require('./controller/cart')

app.use(express.urlencoded({ extended: true }));

app.use('/cart', cart)

connectDB()

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Server started on localhost:${process.env.PORT}`);
});

