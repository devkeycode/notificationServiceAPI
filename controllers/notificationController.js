//This handles the logic related to notification

const Notification = require("../models/notificationModel");
//to create the notification
exports.acceptNotificationRequest = async (req, res) => {
  //create notificationObject based on req.body
  const notificationObject = {
    subject: req.body.subject,
    recipientEmails: req.body.recipientEmails,
    content: req.body.content,
    requester: req.body.requester,
    status: req.body.status,
  };

  try {
    //create a notification (save it to db)
    const notification = await Notification.create(notificationObject);

    //send the notification id back to the caller (will be later used as tracking id, to know the status of notification)
    return res.status(201).json({
      success: true,
      message: "Request has been accepted.",
      trackingId: notification._id,
    });
  } catch (error) {
    console.error(
      "Some internal error while creating notification",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//to fetch the notification detail based on notification id
exports.getNotificationDetails = async (req, res) => {
  try {
    const trackingId = req.params.id;
    const notificaton = await Notification.findById(trackingId);

    return res.status(200).json({
      success: true,
      data: notificaton,
    });
  } catch (error) {
    console.error(
      "Some internal error while fetching notification",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
