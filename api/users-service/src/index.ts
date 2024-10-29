require("dotenv").config();
import express from "express";
import connectDB from "./database/database";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Connect to the database
connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log("Hello from users-service");
