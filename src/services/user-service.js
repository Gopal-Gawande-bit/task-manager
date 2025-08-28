import UserModel from "../models/user-model.js"

class UserService {
  async findUser(filter) {
    const user = await UserModel.findOne(filter)
    return user
  }

  async createUser(userData) {
    try {
      const user = new UserModel(userData)
      return await user.save()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getAllUsers() {
    try {
      return await UserModel.find()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getUserById(userId) {
    try {
      return await UserModel.findById(userId)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateUserById(userId, data) {
    try {
      return await UserModel.findByIdAndUpdate(userId, data, { new: true })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteUserById(userId) {
    try {
      return await UserModel.findByIdAndDelete(userId)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new UserService()
