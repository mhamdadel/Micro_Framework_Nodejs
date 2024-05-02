import nodemailer, { Transporter } from 'nodemailer';
import { htmlToText } from 'html-to-text';

interface EmailOptions {
  from?: string;
  subject: string;
  html: string;
  text?: string;
}

export default class Email {
  to: string;
  firstName: string;
  url: string;
  from: string;

  constructor(email: string, url: string, from?: string) {
    this.to = email;
    this.firstName = "user"; // You might want to make this dynamic based on user data
    this.url = url;
    this.from = from || `<${process.env.EMAIL_FROM}>`;
  }

  newTransport(): Transporter {
    return nodemailer.createTransport({
      // Use your email provider configuration here
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME!,
        pass: process.env.EMAIL_PASSWORD!
      }
    });
  }

  async send(options: EmailOptions): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: options.from || this.from,
      to: this.to,
      subject: options.subject,
      html: options.html,
      text: options.text || htmlToText(options.html)
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome(): Promise<void> {
    const html = `<h1>Welcome to the IoT Platform Family!</h1>`;
    await this.send({ subject: 'Welcome Email', html });
  }

  async sendPasswordReset(token: string): Promise<void> {
    const html = `<p>Your password reset token is: <strong>${token}</strong></p>`;
    await this.send({ subject: 'Password Reset Token', html });
  }
}