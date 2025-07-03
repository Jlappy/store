import express from 'express';
import { UserController } from './userController';

const router = express.Router();

router.post('/admin', UserController.adminLogin);

export const UserRoutes = router;
