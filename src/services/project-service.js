import ProjectModel from "../models/project-model.js"

class ProjectService {
  async createProject(projectData) {
    try {
      const project = new ProjectModel(projectData)
      return await project.save()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getAllProjects() {
    try {
      return await ProjectModel.find()
        .populate("createdBy", "name email")
        .populate("members", "name email")
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getProjectById(projectId) {
    try {
      return await ProjectModel.findById(projectId)
        .populate("createdBy", "name email")
        .populate("members", "name email")
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getProjectsByUser(userId) {
    try {
      return await ProjectModel.find({
        $or: [{ createdBy: userId }, { members: userId }],
      })
        .populate("createdBy", "name email")
        .populate("members", "name email")
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateProjectById(projectId, data) {
    try {
      return await ProjectModel.findByIdAndUpdate(projectId, data, {
        new: true,
      })
        .populate("createdBy", "name email")
        .populate("members", "name email")
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteProjectById(projectId) {
    try {
      return await ProjectModel.findByIdAndDelete(projectId)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addMemberToProject(projectId, userId) {
    try {
      return await ProjectModel.findByIdAndUpdate(
        projectId,
        { $addToSet: { members: userId } },
        { new: true }
      )
        .populate("createdBy", "name email")
        .populate("members", "name email")
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async removeMemberFromProject(projectId, userId) {
    try {
      return await ProjectModel.findByIdAndUpdate(
        projectId,
        { $pull: { members: userId } },
        { new: true }
      )
        .populate("createdBy", "name email")
        .populate("members", "name email")
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new ProjectService()
