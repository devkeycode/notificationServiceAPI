//This is emailService Notifier ,purpose to create a notifier(transporter) is to send the mail through its method.

const { host, port, user, pass } = require("../configs/mail.config");

const nodemailer = require("nodemailer");

//createTransporter
module.exports = nodemailer.createTransport({
  host: host,
  port: port,
  auth: {
    user: user,
    pass: pass,
  },
  // secure: true,
});
