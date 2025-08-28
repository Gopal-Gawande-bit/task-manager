import express from "express"
import userController from "../controllers/user-controller.js"
import projectController from "../controllers/project-controller.js"

const router = express.Router()

// User Routes- /api/v1/users
router.post("/users", userController.createUser)
router.get("/users", userController.getAllUsers)
router.get("/users/:userId", userController.getUserById)
router.patch("/users/:userId", userController.updateUser)
router.delete("/users/:userId", userController.deleteUser)

// Project Routes - /api/v1/projects
router.post("/projects", projectController.createProject)
router.get("/projects", projectController.getAllProjects)
router.get("/projects/:projectId", projectController.getProjectById)
router.get("/projects/user/:userId", projectController.getProjectsByUser)
router.patch("/projects/:projectId", projectController.updateProject)
router.delete("/projects/:projectId", projectController.deleteProject)
router.post("/projects/:projectId/members", projectController.addMember)
router.delete("/projects/:projectId/members", projectController.removeMember)

export default router
