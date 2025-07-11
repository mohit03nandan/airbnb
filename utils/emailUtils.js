const { compareSync } = require("bcryptjs");
const nodemailer = require("nodemailer");

require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});


const sendEmail = async ({to,subject,text}) =>{
    console.log("hello from email")
      try {
          const mailOption = {
              from: process.env.EMAIL_USER,
              to,
              subject,
              text
          }
          const info = await transporter.sendMail(mailOption);
          return info
      } catch (error) {
         throw error;
      }
}

module.exports = {sendEmail};