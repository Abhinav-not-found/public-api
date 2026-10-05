import type mongoose from 'mongoose';
import User, { type IUser } from './user.model.js';

class UserDao {
  createNewUser = async (data: IUser) => {
    return User.create(data);
  };

  fetchAllUsers = async (
    filter: Record<string, unknown> = {},
    sort: Record<string, 1 | -1> = {},
  ) => {
    return User.find({ ...filter, isDeleted: false }).sort(sort);
  };

  fetchOneUser = async (id: mongoose.Types.ObjectId | string) => {
    return User.findById(id);
  };

  updateUser = async (id: mongoose.Types.ObjectId | string, data: IUser) => {
    return User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  };

  deleteUser = async (id: mongoose.Types.ObjectId | string) => {
    return User.findByIdAndDelete(id);
  };

  softDeleteUser = async (id: string) => {
    return User.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      {
        $set: {
          isDeleted: true,
        },
      },
      {
        new: true,
      },
    );
  };
}
export default UserDao;
