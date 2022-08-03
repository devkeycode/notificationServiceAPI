//the logic to scehdule the email sending event

const cron = require("node-cron");
const Notification = require("../models/notificationModel");
const { statuses } = require("../utils/constants");
const emailTransporter = require("../notifiers/emailService");

const cronExpression = "*/10 * * * * *";
//cron.schedule() takes a callback that returns a promise(futurisitic event,so using async await-for ease)

cron.schedule(cronExpression, async () => {
  //fetch all the notfication requests having UN_SENT status over the db
  const notificationsList = await Notification.find({
    status: statuses.unsent,
  });

  console.log(
    "Total unsent Notification request are: ",
    notificationsList.length
  );
  //iterate over the notificationsList and for each notification,send the mail to the concerned persons mentioned in  recipientEmails in that particualr notification.
  notificationsList.forEach((notification) => {
    console.log(
      "Total unsent email(totalRecipientsEmail) in this notification request is: ",
      notification.recipientEmails.length
    );
    //prepare mailObject
    const mailObject = {
      from: "notification-no-reply@email.com",
      to: notification.recipientEmails,
      subject: notification.subject,
      text: notification.content,
    };
    // console.log("mail object", mailObject);

    //use emailTransporter to send the messages
    emailTransporter.sendMail(mailObject, async (error, info) => {
      if (error) {
        console.error("Error while sending email", error.message);
      } else {
        console.log("Sucessfully sent the mails");
        // console.log("Sucessfully sent the mails", info);

        //NOTE:here notification object is a transient object(an object which still attach to the db(since got an notifcationsList and notification is a part of that list, (content of that array,if attached means transient,else not transient.The purpose of this is to update the property directly and execute save method over individual notification object directly,instead of requerying the individual notification over the db again)))

        //since mails successfully sent,so need to update the status of notification over the db
        notification.status = statuses.sent; //change the status to sent
        await notification.save(); //save over the db
      }
    });
  });
});
