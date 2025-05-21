import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  // true for port 465, false for other ports
  auth: {
    user: "srzonea@gmail.com",
    pass: "ohrp mxjg iltm idnq",
  },
});

const SendEmail = async (receiver_email, otp_message) => {
  try {
    await transporter.sendMail({
      to: receiver_email,
      subject: "Verification Email",
      text: otp_message,
    });
    console.log("Email sent successfully !! ");
  } catch (e) {
    console.log("The main error is = ", e);
  }
};

export default SendEmail;
