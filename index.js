const express = require("express");
const connect = require("./src/connect");
const cookieParser = require("cookie-parser");
const router = require("./src/route");
const cors = require("cors");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

//meddel
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(router);
connect();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is live on ${PORT} `);
});
