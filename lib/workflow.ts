import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import nodemailer from "nodemailer";

import config from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Hoặc dịch vụ khác bạn sử dụng
    auth: {
      user: config.env.nodeMailer.userEmail, // Địa chỉ email người gửi
      pass: config.env.nodeMailer.userPassword, // App password (nếu dùng Gmail)
    },
  });

  const mailOptions = {
    from: config.env.nodeMailer.userEmail, // Người gửi
    to: email, // Người nhận
    subject, // Tiêu đề email
    html: message, // Nội dung HTML
  };

  return transporter.sendMail(mailOptions); // Gửi email
};
