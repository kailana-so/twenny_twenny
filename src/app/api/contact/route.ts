import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
  const { contact, name, message } = await request.json();
  const transport = nodemailer.createTransport({
    service: 'gmail',
    /* 
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: process.env.CONTACT_USER,
      pass: process.env.CONTACT_KEY,
    },
  });

  const mailOptions: Mail.Options = {
    from: contact,
    to: process.env.CONTACT_USER,
    subject: `Message from ${name} (${contact})`,
    text: message,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve(`Email from ${contact} sent with message ${message}`);
        } else {
          reject(err.message);
        }
      });
    });

  try {
    const response = await sendMailPromise();
    return NextResponse.json({ message: response });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}