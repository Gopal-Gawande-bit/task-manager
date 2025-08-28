import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import userController from "../controllers/user-controller.js"

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

const db = {}

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET)
    return { accessToken }
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET)
  }

  authenticateToken(req, res, next) {
    // console.log(req.headers['authorization'])
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    // Extract the token from header
    if (!db["2"]) {
      db["2"] = mongoose.createConnection(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    }
    req.db = db["2"]

    if (!token) {
      return res.sendStatus(401) // Unauthorized
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403) // Forbidden if token is invalid
      }
      req.user = user
      next()
    })
  }

  verifyIfAdminCredentials(req, res, next) {
    const isAdminLogin = userController.isAdminUser(req.user)

    if (isAdminLogin) {
      next()
    } else {
      res.sendStatus(403)
    }
  }
}

export default new TokenService()
