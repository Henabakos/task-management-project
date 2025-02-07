const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./routes/index");
dotenv.config();
const server = express();
const port = process.env.PORT || 8000;

server.use(cors());
server.use(bodyParser.json());
server.use("/api", routes);

connectDB();

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
