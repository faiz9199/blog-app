const express = require("express");
const cors = require("cors");
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello");
});

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
