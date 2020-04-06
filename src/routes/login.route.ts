import {Router} from 'express';
import { loginUser, salirLogin } from '../controllers/login.controller';

const app = Router();

app.post('/', loginUser)
app.get('/:id',salirLogin)


export default app;