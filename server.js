const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

//env configuration
dotenv.config();

//DB connection
connectDB();

// rest object
const app = express();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  return res
    .status(200)
    .send("<h1>Welcome to Book Management System Server</h1>");
});
// authentication routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
// user routes
app.use("/api/v1/user", require("./routes/userRoutes"));
// book routes
app.use("/api/v1/books", require("./routes/bookRoutes"));

//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.white.bgMagenta);
});
