const nodemailer = require("nodemailer");
const { auth } = require("../config/emailAuth");

// async..await is not allowed in global scope, must use a wrapper
async function mailAPI(email, username) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.naver.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: auth.ID, // generated ethereal user
      pass: auth.PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Moviestagram" <skdisk7368@naver.com>', // sender address
    to: email, // list of receivers
    subject: "해당 이메일로 등록된 아이디입니다.", // Subject line
    text: `해당 이메일로 등록된 아이디는 ${username} 입니다.`, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports.mailAPI = mailAPI;
