import express from 'express';
import connectDB from './src/config/db'
export const app = express();
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import cart from './src/controller/cart';

// const options = {
//     definition : {
//         openapi : "3.0.0",
//         info: {
//             title : "Documentation API",
//             version : "1.0.0",
//             description : "A simple doc API"
//         },
//         servers: [
//             {
//                 url : 'http://localhost:1234'
//             }
//         ], 
//     },
//     apis: ["./controller/*.ts"]
// }

connectDB()

// const specs = swaggerJsdoc(options)
// app.use(
//     "/api-docs",
//     swaggerUi.serve,
//     swaggerUi.setup(specs)
// );

app.use('/cart', cart)

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Server started on localhost:${process.env.PORT}`);
});

exports.default = app
