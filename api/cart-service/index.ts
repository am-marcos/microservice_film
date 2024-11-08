import express from 'express';
import connectDB from './config/db'
export const app = express();
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import cart from './controller/cart';

const options = {
    definition : {
        openapi : "3.0.0",
        info: {
            title : "Documentation API",
            version : "1.0.0",
            description : "A simple doc API"
        },
        servers: [
            {
                url : 'http://localhost:12345'
            }
        ], 
    },
    apis: ["./controller/*.ts"]
}

connectDB()

const specs = swaggerJsdoc(options)
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
app.use(express.urlencoded({ extended: true }));

app.use('/cart', cart)

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Server started on localhost:${process.env.PORT}`);
});

