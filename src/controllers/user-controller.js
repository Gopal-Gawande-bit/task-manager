import userService from "../services/user-service.js"

class UserController {
  async getUser(req, res) {
    const userId = req.params.userId
    try {
      const user = await userService.findUser({ _id: userId })
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      res.json(user)
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers()
      res.status(200).json(users)
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message })
    }
  }

  async createUser(req, res) {
    const { name, password, email } = req.body
    if (!name || !password || !email) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" })
    }
    try {
      const newUser = await userService.createUser({
        name,
        password,
        email,
      })
      res.status(201).json(newUser)
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message })
    }
  }

  async getUserById(req, res) {
    const { userId } = req.params
    try {
      const user = await userService.getUserById(userId)
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      res.status(200).json(user)
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message })
    }
  }

  async updateUser(req, res) {
    const { userId } = req.params
    const updateData = req.body

    try {
      const updatedUser = await userService.updateUserById(userId, updateData)
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" })
      }
      res.status(200).json(updatedUser)
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message })
    }
  }

  async deleteUser(req, res) {
    const { userId } = req.params

    try {
      const deletedUser = await userService.deleteUserById(userId)
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" })
      }
      res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message })
    }
  }
}

export default new UserController()
