//validate notification request body

const { isValidObjectId } = require("mongoose");
const Notification = require("../models/notificationModel");
const trimValuesInRequestBody = require("../utils/trimRequestBody");
exports.valdiateNotificationRequestBody = async (req, res, next) => {
  trimValuesInRequestBody(req); //remove unwanted spaces from request body
  const { recipientEmails, subject, content } = req.body;
  if (!recipientEmails) {
    return res.status(400).json({
      success: false,
      message: "RecipientsEmails is required field and not provided",
    });
  }
  if (!Array.isArray(recipientEmails)) {
    return res.status(400).json({
      success: false,
      message:
        "RecipientsEmails must be an array type and must contain all the recipients mailIds",
    });
  }
  if (!isRecipientsEmailsValid(recipientEmails)) {
    return res.status(400).json({
      success: false,
      message:
        "One or more than one of the email, is not valid email.Ensure to provide all valid emails in recipients.",
    });
  }
  if (!content) {
    return res.status(400).json({
      success: false,
      message: "Content is required field and not provided",
    });
  }
  if (!subject) {
    return res.status(400).json({
      success: false,
      message: "Subject is required field and not provided",
    });
  }

  //all validation passed,pass the control to next
  next();
};

exports.isValidIdPassedInReqParam = async (req, res, next) => {
  //check whether notificationId is of valid ObjectId type or not
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Not a valid notificationId.",
    });
  }
  try {
    const notification = await Notification.findById(req.params.id);
    if (notification == null) {
      return res.status(400).json({
        success: false,
        message: "Not a valid notificationTrackingId.",
      });
    }
    //valid notificationId,pass the control to next
    next();
  } catch (error) {
    console.log("Error while accessing the  info", error.message);
    return res.status(500).send({
      message: "Internal server error while accessing the  data.",
    });
  }
};

/**
 *
 * @param {Array} emailList
 * @returns {Boolean} true or false
 * @Description To check all emails in emailList is in valid email format or not
 */
function isRecipientsEmailsValid(emailList) {
  for (let email of emailList) {
    if (!isValidEmail(email)) return false;
  }
  //all emails are in valid format
  return true;
}

/**
 *
 * @param {String} email
 * @returns {Boolean} true or false
 * @Description To check email is in valid email format or not
 */

function isValidEmail(email) {
  const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regExp.test(email);
}
