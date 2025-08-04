require('dotenv').config(); 
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./interfaces/routes");
const authMiddleware = require("./infraestructure/auth/AuthMiddleware");
const swaggerConfig = require('./infrastructure/swagger');


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);
swaggerConfig(app);

mongoose.connect(process.env.MONGODB_URI);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});