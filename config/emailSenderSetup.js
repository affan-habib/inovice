const nodemailer = require("nodemailer");
const EmailSendToUser = (email, name, token, res, subject, template) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: "webdeveloperbashar@gmail.com",
      pass: "developer@bashar@1234",
    },
  });
  // email template design
  const mailOptions = {
    from: "webdeveloperbashar@gmail.com",
    to: email,
    subject: subject,
    html: template(name, token),
  };
  // send email to user email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.json({
        error: err.message,
      });
    }
    if (info) {
      return res.json({
        success: `Activation link has been sent your email, and activate your account`,
        verifyEmail: email,
      });
    }
  });
};
module.exports = EmailSendToUser;
