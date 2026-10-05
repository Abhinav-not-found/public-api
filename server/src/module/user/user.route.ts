import { Router } from 'express';
import UserController from './user.controller.js';
import { requireAuth } from '@/shared/middlewares/auth.middleware.js';
import validate from '@/shared/middlewares/validate.middleware.js';
import UserValidator from './user.validator.js';

const userRouter = Router();
const userController = new UserController();
const userValidator = new UserValidator();

userRouter.post(
  '/',
  validate({
    body: userValidator.createUserSchema,
  }),
  userController.createUser,
);

userRouter.get('/', userController.getAllUsers);

userRouter.get(
  '/:id',
  validate({ params: userValidator.userIdParamsSchema }),
  userController.getOneUsers,
);

userRouter.patch(
  '/:id',
  validate({ body: userValidator.updateUserSchema, params: userValidator.userIdParamsSchema }),
  userController.updateUser,
);

userRouter.delete(
  '/:id',
  validate({ params: userValidator.userIdParamsSchema }),
  userController.updateUser,
);

export default userRouter;
