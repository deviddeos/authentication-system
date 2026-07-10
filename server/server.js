import express from 'express'
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

const allowedOrigins = ['http://localhost:5173', 'https://authentication-system-henna.vercel.app']

// Handle CORS headers manually for all requests including preflight
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// API Endpoints
app.get('/', (req, res) => {
    res.send("API Working");
})
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT} `)
})