import express from 'express';
import { config } from 'dotenv';

config();
const app = express();

// NOTE: middleware
app.use(express.json());

export default app;
