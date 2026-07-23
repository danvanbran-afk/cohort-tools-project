const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5005;

// INITIALIZE EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// MONGOOSE CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// =========================================================
// ROUTES
// =========================================================

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// --- MOUNT ROUTERS ---
const cohortRouter = require('./routes/cohort.routes');
app.use('/api/cohorts', cohortRouter);

const studentRouter = require('./routes/student.routes');
app.use('/api/students', studentRouter);

// =========================================================
// ERROR HANDLING (Must be after routes)
// =========================================================
const errorHandler = require('./error-handling');
errorHandler(app);

// =========================================================
// START SERVER
// =========================================================
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;