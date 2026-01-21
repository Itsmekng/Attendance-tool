import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(cors({
    origin : process.env.EXCESSLIST,
    credentials: true
}))

import userRoute from "../router/User.router.js"

app.use("/api/user",userRoute);

export default app

