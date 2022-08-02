//This file contains the code for testing purpose to check  message sending through email using smtp server
//not related to notificationService,only for quick testing purpose

const { host, port, user, pass } = require("./configs/mail.config");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: port,
  host: host,
  // service: "gmail",//in case of using gmail smtp server,can use this also,instead of host,it will be auto configured
  auth: {
    user: user,
    pass: pass,
  },
  // secure: true, //secure – if true the connection will use TLS when connecting to server. If false (the default) then TLS is used if server supports the STARTTLS extension. In most cases set this value to true if you are connecting to port 465.false for other port
});

// console.log(typeof transporter);

/**
 * Sending mail
 * create mailDataObject
 */

const mailDataObject = {
  from: "notificationService-no-reply@email.com",
  to: "sample@email.com",
  subject: "Testing the code 2 for sending the mail",
  text: "Demo sample text 2",
  html: "<b>Hello From nodemailer 2</b>",
};

//send mail with the help of created transporter object method sendMail

transporter.sendMail(mailDataObject, (error, data) => {
  if (error) {
    console.error("Some error occured", error.message);
  } else {
    console.log("Successfully send the mail.", data);
  }
});
