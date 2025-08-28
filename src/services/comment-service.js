import CommentModel from "../models/comment-model.js"
import TaskModel from "../models/task-model.js"
import UserModel from "../models/user-model.js"

class CommentService {
  async createComment(commentData) {
    try {
      const comment = new CommentModel(commentData)
      return await comment.save()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getAllComments() {
    try {
      return await CommentModel.find()
        .populate("taskId", "title")
        .populate("userId", "name email")
        .sort({ createdAt: -1 })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getCommentById(commentId) {
    try {
      return await CommentModel.findById(commentId)
        .populate("taskId", "title")
        .populate("userId", "name email")
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getCommentsByTask(taskId) {
    try {
      const taskExists = await TaskModel.exists({ _id: taskId })
      if (!taskExists) {
        throw new Error("Task not found")
      }
      return await CommentModel.find({ taskId })
        .populate("taskId", "title")
        .populate("userId", "name email")
        .sort({ createdAt: -1 })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getCommentsByUser(userId) {
    try {
      const userExists = await UserModel.exists({ _id: userId })
      if (!userExists) {
        throw new Error("User not found")
      }
      return await CommentModel.find({ userId })
        .populate("taskId", "title")
        .populate("userId", "name email")
        .sort({ createdAt: -1 })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateCommentById(commentId, data) {
    try {
      return await CommentModel.findByIdAndUpdate(commentId, data, {
        new: true,
      })
        .populate("taskId", "title")
        .populate("userId", "name email")
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteCommentById(commentId) {
    try {
      return await CommentModel.findByIdAndDelete(commentId)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new CommentService()
