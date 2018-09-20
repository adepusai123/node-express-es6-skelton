import express from 'express';
import {login} from '../services/login';
const router = express.Router();

router.route('/').post(login);

export default router;