//Defining the Schema for notification model

const mongoose = require("mongoose");
const { statuses } = require("../utils/constants");
const notificationSchema = new mongoose.Schema(
  {
    recipientEmails: {
      type: [String],
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    requester: {
      type: String,
    },
    status: {
      type: String,
      enum: [statuses.sent, statuses.unsent],
      default: statuses.unsent,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Notification", notificationSchema);
