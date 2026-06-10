import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js';
import adminRouter from './routes/adminRouter.js';
import visitorRouter from './routes/visitorRouter.js';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import winston from 'winston';

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

const app = express();
const port = process.env.PORT || 5000;
connectDB();

const allowedOrigins = ['https://sandeshnepal.vercel.app', 'http://localhost:3000']

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use((req, res, next) => {
  logger.info(`Incoming ${req.method} request to ${req.url}`);
  next();
});


app.get('/', (req, res) => res.send("API working"));
app.use('/api/admin', adminRouter);
app.use('/api/visitor', visitorRouter);

app.use((err, req, res, next) => {
  logger.error(`Error processing ${req.method} ${req.url}: ${err.message}\n${err.stack}`);
  res.status(500).send("Something went wrong");
});

app.listen(port, '0.0.0.0', () => logger.info(`Server started at ${port}`));
