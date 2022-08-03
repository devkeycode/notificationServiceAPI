const express = require("express");
const mongoose = require("mongoose");
const { DB_URI } = require("./configs/db.config");
const { PORT } = require("./configs/server.config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initializing the DB connection
mongoose.connect(
  DB_URI,
  () => {
    console.log("Successfully connected to mongo db");
  },
  (error) => {
    console.log("Some error occurred ", error.message);
  }
);

//attach the router middleware
//attach rotuer to server by passing app object
require("./routes/notificationRoute")(app);
//attach the scheduler
require("./schedulers/emailSchedulerService");
app.listen(PORT, () => {
  console.log("App started listening at port ", PORT);
});
