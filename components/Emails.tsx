import { ReactElement } from "react";
import { Mailer } from "nodemailer-react";
import type { EmailConfig } from "nodemailer-react";

type Email = (props: object) => {
  subject: string;
  body: ReactElement;
};

// Setting up nodemailer-react
const mailerConfig: EmailConfig = {
  transport: {
    host: process.env.MAIL_HOST || '',
    port: Number(process.env.MAIL_PORT),
    secure: Boolean(process.env.MAIL_SECURE),
    auth: { 
      user: process.env.MAIL_USERNAME || '', 
      pass: process.env.MAIL_PASSWORD || ''
    },
  },
  defaults: {
    from: { 
      name: 'Marta Moros Batlle', 
      address: process.env.MAIL_USERNAME  || ''
    },
  },
}

type MailParams = {
  name: string;
  email: string;
  message: string;
};

export const ContactEmail = ({ name, email, message }: MailParams) => {
  let splitMessage = message.split("\n").map(function(item, idx) {
    return (
        <span key={idx}>
            {item}
            <br/>
        </span>
    )
  });

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
        {splitMessage}
      </div>
    ),
  };
};

export const ThankYouEmail = ({ name, message }: MailParams) => {
  let splitMessage = message.split("\n").map(function(item, idx) {
    return (
        <span key={idx}>
            {item}
            <br/>
        </span>
    )
  });
  return {
    subject: `🎉 Thank you for your message, ${name}`,
    body: (
      <div>
        <p>Hello {name}!</p>
        <p>
          Thank you for your message. I’ll get back to you as soon as possible.
        </p>
        <p>This is the message you sent:</p>
        <hr style={{margin: "20px 0"}} />
        <div style={{paddingLeft: "30px"}}>
          {splitMessage}
        </div>
        <hr style={{margin: "20px 0"}} />
        <br />
        <p>
          See you,
          <br />
          Marta.
        </p>
      </div>
    ),
  }
};

export const mailer = Mailer(
  mailerConfig,
  { ContactEmail, ThankYouEmail }
);
