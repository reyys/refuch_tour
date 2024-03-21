import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { Helper } from './helpers/Helper';
import router from './routes';

dotenv.config();
Helper.validateEnvVars();

mongoose.connect(process.env.MONGODB_URI!);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/', router);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
