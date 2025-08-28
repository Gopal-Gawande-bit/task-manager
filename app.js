import express from "express"
import cors from "cors"
import connectDB from "./src/config/database.js"
import morgan from "morgan"

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export default app
