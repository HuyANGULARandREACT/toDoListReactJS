import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import todoRoutes from "./modules/todoList/routes/to.route";
const app = express();
const apiRouter = express.Router();

//middleware
app.use(cors());
app.use(express.json());
//routes
app.use("/api/todos", todoRoutes);
//coonectDB
connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
