import projectService from "../services/project-service.js"

class ProjectController {
  async createProject(req, res) {
    const { name, description, createdBy, members } = req.body

    if (!name || !description || !createdBy) {
      return res.status(400).json({
        message: "Name, description, and createdBy are required fields",
      })
    }

    try {
      const newProject = await projectService.createProject({
        name,
        description,
        createdBy,
        members: members || [],
      })
      res.status(201).json(newProject)
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      })
    }
  }

  async getAllProjects(req, res) {
    try {
      const projects = await projectService.getAllProjects()
      res.status(200).json(projects)
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      })
    }
  }

  async getProjectById(req, res) {
    const { projectId } = req.params

    try {
      const project = await projectService.getProjectById(projectId)
      if (!project) {
        return res.status(404).json({ message: "Project not found" })
      }
      res.status(200).json(project)
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      })
    }
  }

  async getProjectsByUser(req, res) {
    const { userId } = req.params

    try {
      const projects = await projectService.getProjectsByUser(userId)
      res.status(200).json(projects)
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      })
    }
  }

  async updateProject(req, res) {
    const { projectId } = req.params
    const updateData = req.body

    try {
      const updatedProject = await projectService.updateProjectById(
        projectId,
        updateData
      )
      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" })
      }
      res.status(200).json(updatedProject)
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      })
    }
  }

  async deleteProject(req, res) {
    const { projectId } = req.params

    try {
      const deletedProject = await projectService.deleteProjectById(projectId)
      if (!deletedProject) {
        return res.status(404).json({ message: "Project not found" })
      }
      res.status(200).json({ message: "Project deleted successfully" })
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      })
    }
  }

  async addMember(req, res) {
    const { projectId } = req.params
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" })
    }

    try {
      const updatedProject = await projectService.addMemberToProject(
        projectId,
        userId
      )
      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" })
      }
      res.status(200).json(updatedProject)
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      })
    }
  }

  async removeMember(req, res) {
    const { projectId } = req.params
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" })
    }

    try {
      const updatedProject = await projectService.removeMemberFromProject(
        projectId,
        userId
      )
      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" })
      }
      res.status(200).json(updatedProject)
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      })
    }
  }
}

export default new ProjectController()
