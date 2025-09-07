const router = require("express").Router();
const mongoose = require("mongoose");
// const contactModel = require("../models/contact.model");
require("dotenv").config();
const nodemailer = require("nodemailer");

const createContact = async (req, res) => {
  const { fullName, email, phone, message, subject } = req.body;
  // Validate input
  if (!fullName || !email || !phone) {
    return res.status(400).json({ error: "All fields are required." });
  }
  console.log("Contact Data", req.body);
  // populating the model
  // const contact = new contactModel(req.body);
  // contact
  //     .save()
  //     .then((docs) => {
  //         // sending response with auth token
  //         res.json(docs);
  //     })
  //     .catch(({ errors }) => {
  //         let errKey = Object.keys(errors)[0];
  //         if (errKey) {
  //             return res.status(409).json({
  //                 error: errors[errKey].properties.message,
  //                 errorField: errors[errKey].properties.path,
  //             });
  //         } else {
  //             return res.sendStatus(400);
  //         }
  //     });

  const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.fullName}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
            <li>Message: ${req.body?.message}</li>
        </ul>
        <h3>Subject</h3>
        <p>${req.body.subject}</p>
    `;
  // send email logic here

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // your email address
      pass: process.env.EMAIL_PASS, // your email password
    },
  });

  const mailOptions = {
    from: `"Cosurger Contact" <${process.env.EMAIL_USER}>`, // sender address
    to: process.env.EMAIL_RECIEVER, // list of receivers
    subject: "New Contact Request", // Subject line
    text: "You have a new contact request", // plain text body
    html: output, // html body
  };

  const sendEmail = async () => {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      res.status(200).json({ message: "Contact request sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send contact request." });
    }
  };

  sendEmail();
};

module.exports = {
  createContact,
};
