require("dotenv").config();
import express from "express";
import catalogRoutes from './routes/catalogRoute';
import { connectDB } from "./configDB/configDB";

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use('/api', catalogRoutes);

// Connect to the database
connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log("Hello from catalog service");