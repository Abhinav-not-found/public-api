import type mongoose from 'mongoose';
import User, { type IUser } from './user.model.js';

class UserDao {
  createNewUser = async (data: IUser) => {
    return User.create(data);
  };

  fetchAllUsers = async () => {
    return User.find().sort({ createdAt: -1 });
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
}
export default UserDao;
