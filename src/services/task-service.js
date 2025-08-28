import TaskModel from "../models/task-model.js"
import ProjectModel from "../models/project-model.js"
import UserModel from "../models/user-model.js" // Assuming User model exists as referenced in schemas

class TaskService {
  async createTask(taskData) {
    try {
      const task = new TaskModel(taskData)
      return await task.save()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getAllTasks() {
    try {
      return await TaskModel.find()
        .populate("project", "name")
        .populate("createdBy", "name email")
        .populate("assignTo", "name email")
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getTaskById(taskId) {
    try {
      return await TaskModel.findById(taskId)
        .populate("project", "name")
        .populate("createdBy", "name email")
        .populate("assignTo", "name email")
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getTasksByProject(projectId) {
    try {
      const projectExists = await ProjectModel.exists({ _id: projectId })
      if (!projectExists) {
        throw new Error("Project not found")
      }
      return await TaskModel.find({ project: projectId })
        .sort({ orderNo: 1 })
        .populate("project", "name")
        .populate("createdBy", "name email")
        .populate("assignTo", "name email")
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getTasksByUser(userId) {
    try {
      const userExists = await UserModel.exists({ _id: userId })
      if (!userExists) {
        throw new Error("User not found")
      }
      return await TaskModel.find({
        $or: [{ createdBy: userId }, { assignTo: userId }],
      })
        .populate("project", "name")
        .populate("createdBy", "name email")
        .populate("assignTo", "name email")
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateTaskById(taskId, data) {
    try {
      return await TaskModel.findByIdAndUpdate(taskId, data, {
        new: true,
      })
        .populate("project", "name")
        .populate("createdBy", "name email")
        .populate("assignTo", "name email")
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteTaskById(taskId) {
    try {
      return await TaskModel.findByIdAndDelete(taskId)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new TaskService()
