const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerDocs = require("./swagger");

const port = process.env.PORT || 5000;
const connectDB = require("./database/db");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.get("/", (req, res) => {
  res.send("<h1>Hello from blog api!</h1> <br> <a href='/api-docs'>Click me for Documentation</a>");
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

app.listen(port, () => {
  console.log(`server is running on at: localhost:${port}`);
});
