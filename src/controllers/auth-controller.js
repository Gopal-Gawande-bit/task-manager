import tokenService from "../services/token-service.js"
import User from "../models/user-model.js"
import bcrypt from "bcryptjs"

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body

      console.log("Registration attempt:", email)

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        })
      }

      // Check if user already exists
      let user = await User.findOne({ email })
      if (user) {
        return res.status(409).json({
          success: false,
          message: "User already exists with this email",
        })
      }

      // Hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      // Create new user
      user = new User({
        name: name || "",
        email,
        password: hashedPassword,
      })

      await user.save()

      // Generate token
      const { accessToken } = tokenService.generateTokens({
        userId: user._id,
        email: user.email,
      })

      res.status(201).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
        accessToken,
        message: "User registered successfully",
      })
    } catch (error) {
      console.error("Registration Error:", error)

      // Handle duplicate email error
      if (error.code === 11000) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        })
      }

      res.status(500).json({
        success: false,
        message: "Server error during registration",
      })
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body

      console.log("Login attempt:", email)

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        })
      }

      // Find user by email
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        })
      }

      // Check if user has a password (for users who might have registered via Google)
      if (!user.password) {
        return res.status(401).json({
          success: false,
          message: "Please use Google login or reset your password",
        })
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        })
      }

      // Generate token
      const { accessToken } = tokenService.generateTokens({
        userId: user._id,
        email: user.email,
      })

      res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        accessToken,
        message: "Login successful",
      })
    } catch (error) {
      console.error("Login Error:", error)
      res.status(500).json({
        success: false,
        message: "Server error during login",
      })
    }
  }
}

export default new AuthController()
