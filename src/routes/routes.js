import express from "express"
import userController from "../controllers/user-controller.js"
import projectController from "../controllers/project-controller.js"
import taskController from "../controllers/task-controller.js"
import commentController from "../controllers/comment-controller.js"

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

// Task Routes - /api/v1/tasks
router.post("/tasks", taskController.createTask)
router.get("/tasks", taskController.getAllTasks)
router.get("/tasks/:taskId", taskController.getTaskById)
router.get("/tasks/project/:projectId", taskController.getTasksByProject)
router.get("/tasks/user/:userId", taskController.getTasksByUser)
router.patch("/tasks/:taskId", taskController.updateTask)
router.delete("/tasks/:taskId", taskController.deleteTask)

// Comment Routes - /api/v1/comments
router.post("/comments", commentController.createComment)
router.get("/comments", commentController.getAllComments)
router.get("/comments/:commentId", commentController.getCommentById)
router.get("/comments/task/:taskId", commentController.getCommentsByTask)
router.get("/comments/user/:userId", commentController.getCommentsByUser)
router.patch("/comments/:commentId", commentController.updateComment)
router.delete("/comments/:commentId", commentController.deleteComment)

export default router
