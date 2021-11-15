import { ReactElement } from "react";
import { Mailer } from "nodemailer-react";

type Email = (props: object) => {
  subject: string;
  body: ReactElement;
};

// Setting up nodemailer-react
const transport = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: { user: process.env.MAIL_USERNAME, pass: process.env.MAIL_PASSWORD },
};

const defaults = {
  from: `Marta Moros Batlle <${process.env.MAIL_USERNAME}>`,
};

type MailParams = {
  name?: string;
  email?: string;
  message?: string;
};

export const ContactEmail = ({ name, email, message }: MailParams) => {
  return {
    subject: `📧 New message from ${name}`,
    body: (
      <div>
        <p>
          <strong>From:</strong> {name} &lt;{email}&gt;
        </p>
        <p>
          <strong>Message:</strong>
        </p>
        {message}
      </div>
    ),
  };
};

export const ThankYouEmail = ({ name, message }: MailParams) => ({
  subject: `🎉 Thank you for your message, ${name}`,
  body: (
    <div>
      <p>Hello {name}!</p>
      <p>
        Thank you for your message. I’ll get back to you as soon as possible.
      </p>
      <p>This was the message you sent:</p>
      <code>{message}</code>
      <br />
      <p>
        See you,
        <br />
        Marta.
      </p>
    </div>
  ),
});

export const mailer = Mailer(
  { transport, defaults },
  { ContactEmail, ThankYouEmail }
);
