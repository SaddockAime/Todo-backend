import express, { Request, Response } from 'express';
import allRoutes from "./routes/allRoutes"
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerSetup from '../swaggerConfig';
import './database/config/database'

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api", allRoutes);

swaggerSetup(app);

app.get('/test', (req: Request, res: Response) => {
    res.send('Hello');
});

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome To TODO BackEnd" });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
