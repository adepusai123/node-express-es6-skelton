import express from 'express';
import {home} from '../services/';
const router = express.Router();

router.route('/').get(home);

export default router;