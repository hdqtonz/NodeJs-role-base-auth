const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const userRoute = require("./routes/user.route");
const registerRoute = require("./routes/auth.route");

const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(registerRoute);
app.use(userRoute);

app.listen(port, () => {
  console.log(`server is runing on port : ${port}`);
});
