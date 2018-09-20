import express from 'express';
import home from './handlers/';
import login from './handlers/login';
const router = express.Router();

router.use('/',home);
router.use('/login',login);

export default router;