const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./src/config/dbConfig");
app.use(express.json());
const userRoute = require("./src/routes/userRoute");
const adminRoute = require("./src/routes/adminRoute");
const doctorRoute = require("./src/routes/doctorsRoute");
const path = require("path");
// const cors = require('cors');
// const corsOptions = {
//   origin: 'http://localhost:3000', // Replace with your allowed origin(s)
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow the Authorization header
// };

// app.use(cors(corsOptions));

// // If you need to catch preflight OPTIONS requests explicitly:
// app.options('*', cors(corsOptions));

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);

// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client/build/index.html"));
//   });
// }

const port = process.env.PORT || 2000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));
