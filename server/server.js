import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js';
import adminRouter from './routes/adminRouter.js';
import visitorRouter from './routes/visitorRouter.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 5000;
connectDB();

const allowedOrigins = ['http://https://portfolio-tau-neon-24.vercel.app/']

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


app.get('/', (req, res)=> res.send("API working"));
app.use('/api/admin', adminRouter);
app.use('/api/visitor', visitorRouter);
app.listen(port, '0.0.0.0', () => console.log(`Server started at ${port}`));
