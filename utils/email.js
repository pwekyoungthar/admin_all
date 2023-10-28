const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  // 1. Transporter တစ်ခုကို ဖန်တီးခြင်း
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  console.log(process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD);

  // 2. email options ကို define လုပ်ခြင်း
  const mailOptions = {
    from: "Arr Yu Maung <contact.ar7myanmar@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. Email ပို့ခြင်း
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
