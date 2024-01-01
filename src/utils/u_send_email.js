import aws from '@aws-sdk/client-ses';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import nodemailer from 'nodemailer';
import enviroments from '../enviroments.js';
import { insertEmail } from '../repositories/db_log_email.js';

const ses = new aws.SES({
  region: enviroments.AWS_REGION,
  defaultProvider
});

const transporter = nodemailer.createTransport({
  SES: { ses, aws }
});

export const sendEmail = async (html, emailTo, subject, attachments = []) => {
  try {
    const mailOptions = {
      from: enviroments.EMAIL_FROM,
      to: emailTo,
      subject,
      html,
      attachments
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    await logEmailError(emailTo, subject, attachments, err);
    return false;
  }
};

const logEmailError = async (emailTo, subject, attachments, err) => {
  const errorLog = {
    emailTo,
    subject,
    countAttachments: attachments.length,
    errCode: err.Code,
    errMessage: err.name,
    type: err.Type,
    date: new Date(),
    consulted: false
  };

  await insertEmail(errorLog);
};
