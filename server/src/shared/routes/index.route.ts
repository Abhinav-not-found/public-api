import { Router } from 'express';
// import docsRouter from './docs.route.js';
import healthRoute from './health.route.js';
import authRouter from '@/module/auth/auth.route.js';
import userRouter from '@/module/user/user.route.js';

const indexRouter = Router();

// indexRouter.use('/docs', docsRouter);
indexRouter.use('/health', healthRoute);
indexRouter.use('/auth', authRouter);
indexRouter.use('/user', userRouter);

export default indexRouter;
