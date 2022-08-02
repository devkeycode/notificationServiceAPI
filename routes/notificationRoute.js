//This route will be addressing the requests related to  notifcation resource
const notificationController = require("../controllers/notificationController");
const {
  valdiateNotificationRequestBody,
  isValidIdPassedInReqParam,
} = require("../middlewares");
module.exports = (app) => {
  //POST Request create a new notification
  app.post(
    "/notificationService/api/v1/notifications",
    [valdiateNotificationRequestBody],
    notificationController.acceptNotificationRequest
  );

  //GET Request fetch a specific notification detail based on notification id
  app.get(
    "/notificationService/api/v1/notifications/:id",
    [isValidIdPassedInReqParam],
    notificationController.getNotificationDetails
  );
};
