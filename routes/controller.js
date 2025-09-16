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

  await sendEmail(output, "New Contact Request");
  res.status(200).json({ message: "Contact request sent successfully!" });
};

const createQuote = async (req, res) => {
  const { fullName, email, phone, vin, registration, vehicle, partNumbers, partDetails, additionalInfo, qrn } = req.body;
  
  // Validate required fields
  if (!fullName || !email || !phone || !vehicle || !partDetails || !vin || !registration) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }

  console.log("Quote Request Data", req.body);

  // Format part numbers for display
  const formattedPartNumbers = partNumbers
    ? partNumbers.split('\n').filter(part => part.trim()).map(part => part.trim()).join(', ')
    : 'Not provided';

  const output = `
        <p>You have a new quote request</p>
        <h3>Customer Details</h3>
        <ul>
            <li>Name: ${fullName}</li>
            <li>Email: ${email}</li>
            <li>Phone: ${phone}</li>
        </ul>
        <h3>Vehicle Information</h3>
        <ul>
            <li>VIN: ${vin}</li>
            <li>Registration Number: ${registration}</li>
            <li>Vehicle Details: ${vehicle}</li>
        </ul>
        <h3>Part Information</h3>
        <ul>
            <li>Part Number(s): ${formattedPartNumbers}</li>
            <li>Part Details: ${partDetails}</li>
            ${additionalInfo ? `<li>Additional Information: ${additionalInfo}</li>` : ''}
        </ul>
    `;
  // send email logic here

  await sendEmail(output, `New Quote Request (${qrn})`);
  res.status(200).json({ message: "Quote request sent successfully!" });
};

const sendEmail = async (htmlContent, subject) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Zytech Auto Parts" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECIEVER,
    subject: subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = {
  createContact,
  createQuote,
};
