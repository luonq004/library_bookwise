import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import emailjs from "@emailjs/browser";
import config from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async (message: string) => {
  const templateParams = {
    user_name: "Nguyễn Văn A",
    user_email: "thuytinh112244@gmail.com",
    message,
    html: `<p>Xin chào <strong style="color: red; font-weight: bold;">Nguyễn Văn A</strong>,</p><p>Đơn hàng <strong>#123456</strong> của bạn đã được xác nhận!</p>`,
  };

  emailjs
    .send(
      "service_u1jmqgo",
      "template_2g2jdfs",
      templateParams,
      "DYMGoNNClbnbJ6UXp"
    )
    .then((response) => {
      console.log("Email sent!", response.status, response.text);
    })
    .catch((error) => {
      console.error("Failed to send email.", error);
    });

  // qstashClient.publishJSON({
  //   // api:
  // });
};
