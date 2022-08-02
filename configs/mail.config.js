if (process.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASSWORD,
};
