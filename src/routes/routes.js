import express from "express"
import userController from "../controllers/user-controller.js"

const router = express.Router()

//user-routes
// User Routes- /api/v1/users
router.post("/users", userController.createUser)
router.get("/users", userController.getAllUsers)
router.get("/users/:userId", userController.getUserById)
router.patch("/users/:userId", userController.updateUser)
router.delete("/users/:userId", userController.deleteUser)

export default router
