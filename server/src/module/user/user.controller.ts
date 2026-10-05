import AsyncHandler from '@/shared/utils/async-handler.util.js';
import UserDao from './user.dao.js';
import ApiResponse from '@/shared/utils/apiResponse.util.js';
import { sanitizeUser } from '../auth/auth.util.js';
import ApiError from '@/shared/utils/apiError.util.js';
import buildQuery from '@/shared/utils/query.utils.js';

const userDao = new UserDao();

class UserController {
  createUser = AsyncHandler(async (req, res) => {
    const data = req.body;

    const newUser = await userDao.createNewUser(data);

    return ApiResponse.created('New user created', sanitizeUser(newUser)).send(res);
  });

  getAllUsers = AsyncHandler(async (req, res) => {
    const { filter, sort } = buildQuery(req.query, {
      searchable: ['name', 'email'],
      sortable: ['createdAt'],
    });
    const allUsers = await userDao.fetchAllUsers(filter, sort);

    return ApiResponse.ok('Fetched all users', allUsers.map(sanitizeUser)).send(res);
  });

  getOneUsers = AsyncHandler(async (req, res) => {
    const { id } = req.params as { id: string };

    const user = await userDao.fetchOneUser(id);
    if (!user) throw ApiError.notFound('User not found');

    return ApiResponse.ok('Fetched one user', sanitizeUser(user)).send(res);
  });

  updateUser = AsyncHandler(async (req, res) => {
    const data = req.body;
    const { id } = req.params as { id: string };

    const updatedUser = await userDao.updateUser(id, data);
    if (!updatedUser) throw ApiError.notFound('User not found');

    return ApiResponse.ok('Updated user', sanitizeUser(updatedUser)).send(res);
  });

  deleteUser = AsyncHandler(async (req, res) => {
    const { id } = req.params as { id: string };

    const deletedUser = await userDao.softDeleteUser(id);
    if (!deletedUser) throw ApiError.notFound('User not found');

    return ApiResponse.ok('Deleted user', sanitizeUser(deletedUser)).send(res);
  });
}
export default UserController;
