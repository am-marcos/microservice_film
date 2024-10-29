require("dotenv").config();
import express from "express";
import { connectDB } from "./configDB/configDB";
import catalogRoute from "./routes/catalogRoute";

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use('/api', catalogRoute);

// Connect to the database
connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log("Hello from catalog service");