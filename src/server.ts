import express, { Request, Response } from 'express';
import allRoutes from "./routes/allRoutes"
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMONGO } from './database/config/database';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api", allRoutes);


const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectMONGO();
    app.listen(PORT, () => {
      console.log(`Server is running on Port:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();

export default app;
