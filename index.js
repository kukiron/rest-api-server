// Imports
const express = require("express"),
  http = require("http"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  router = require("./router")

const app = express()

// DB setup
mongoose.connect(process.env.MONGODB_URI)

// App setup with express middlewares
app.use(morgan("combined"))
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json({ type: "*/*" }))
app.use(cors())
app.options("*", cors())

router(app)

// Server setup
const port = process.env.PORT || 3090,
  server = http.createServer(app)

// Listening to the port
server.listen(
  port,
  console.log(`🌍 Express server is up and running on port: ${port} 🐎`)
)
