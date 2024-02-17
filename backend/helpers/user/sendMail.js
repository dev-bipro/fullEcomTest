const nodemailer = require("nodemailer");
module.exports = async (email, otp, template) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.BASE_EMAIL,
      pass: "iehg ujwq ewyv hthb",
    },
  });
  const info = await transporter.sendMail({
    from: process.env.BASE_EMAIL, // sender address
    to: email, // list of receivers
    subject: "Please Verify", // Subject line
    html: template(otp), // html body
  });
};
