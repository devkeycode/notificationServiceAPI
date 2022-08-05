const express = require("express");
const mongoose = require("mongoose");
const { DB_URI } = require("./configs/db.config");
const { PORT } = require("./configs/server.config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//attach the router middleware
//attach rotuer to server by passing app object
require("./routes/notificationRoute")(app);
//attach the scheduler
require("./schedulers/emailSchedulerService");

//in case of endpoint ,not exists, send the 404 response
app.use((req, res) => {
  res.status(404).json({
    success: "false",
    message: "The requested endpoint doesn't exists.",
  });
});

// initializing the DB connection
const connectDB = async () => {
  mongoose.connect(DB_URI);
  const db = mongoose.connection;
  db.on("error", () => {
    console.error("Error while connecting to DB-> ", DB_URI);
  });
  db.once("open", () => {
    console.log("Successfull connection to DB estabished.");
  });
};

//initialising the DB connection and starting the server
const startApp = async () => {
  app.listen(PORT, () => {
    console.log("App listening at port", PORT);
  });
  //establish db connection
  connectDB();
};

startApp();
