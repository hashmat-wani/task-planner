import nodemailer from "nodemailer";
import { NODEMAILER_EMAIL, NODEMAILER_PASS } from "../utils/env.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  // port: 587,
  port: 465,
  requireTLS: true,
  // secure: 465, // true for 465, false for other ports
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASS,
  },
});
