import commentService from "../services/comment-service.js"
import TaskModel from "../models/task-model.js"
import UserModel from "../models/user-model.js"

class CommentController {
  async createComment(req, res) {
    const { content, taskId, userId } = req.body

    if (!content || !taskId || !userId) {
      return res.status(400).json({
        message: "Content, taskId, and userId are required fields",
      })
    }

    try {
      const taskExists = await TaskModel.exists({ _id: taskId })
      if (!taskExists) {
        return res.status(404).json({ message: "Task not found" })
      }

      const userExists = await UserModel.exists({ _id: userId })
      if (!userExists) {
        return res.status(404).json({ message: "User not found" })
      }

      const newComment = await commentService.createComment({
        content,
        taskId,
        userId,
      })
      res.status(201).json(newComment)
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      })
    }
  }

  async getAllComments(req, res) {
    try {
      const comments = await commentService.getAllComments()
      res.status(200).json(comments)
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      })
    }
  }

  async getCommentById(req, res) {
    const { commentId } = req.params

    try {
      const comment = await commentService.getCommentById(commentId)
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" })
      }
      res.status(200).json(comment)
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      })
    }
  }

  async getCommentsByTask(req, res) {
    const { taskId } = req.params

    try {
      const comments = await commentService.getCommentsByTask(taskId)
      res.status(200).json(comments)
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      })
    }
  }

  async getCommentsByUser(req, res) {
    const { userId } = req.params

    try {
      const comments = await commentService.getCommentsByUser(userId)
      res.status(200).json(comments)
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      })
    }
  }

  async updateComment(req, res) {
    const { commentId } = req.params
    const updateData = req.body

    try {
      if (updateData.taskId) {
        const taskExists = await TaskModel.exists({ _id: updateData.taskId })
        if (!taskExists) {
          return res.status(404).json({ message: "Task not found" })
        }
      }

      if (updateData.userId) {
        const userExists = await UserModel.exists({ _id: updateData.userId })
        if (!userExists) {
          return res.status(404).json({ message: "User not found" })
        }
      }

      const updatedComment = await commentService.updateCommentById(
        commentId,
        updateData
      )
      if (!updatedComment) {
        return res.status(404).json({ message: "Comment not found" })
      }
      res.status(200).json(updatedComment)
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      })
    }
  }

  async deleteComment(req, res) {
    const { commentId } = req.params

    try {
      const deletedComment = await commentService.deleteCommentById(commentId)
      if (!deletedComment) {
        return res.status(404).json({ message: "Comment not found" })
      }
      res.status(200).json({ message: "Comment deleted successfully" })
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      })
    }
  }
}

export default new CommentController()
