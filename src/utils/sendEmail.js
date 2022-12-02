"use strict";
import { createTransport } from "nodemailer";
import { google } from "googleapis";
import "dotenv/config";

const CLIENT_ID = process.env.CLIENT_ID_GOOGLE;
const CLIENT_SECRET = process.env.CLIENT_SECRET_GOOGLE;
const REDIRECT_URI = process.env.REDIRECT_URI_GOOGLE;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_GOOGLE;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendEmail(to, subject, html) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "codeisscience@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "Code Is Science <codeisscience@gmail.com>",
      to,
      subject,
      html,
    };

    const emailInfo = await transport.sendMail(mailOptions);

    // console.log("Message sent: %s", emailInfo.messageId);
    // console.log("Preview URL: %s", getTestMessageUrl(emailInfo));

    return emailInfo;
  } catch (error) {
    return error;
  }
}
