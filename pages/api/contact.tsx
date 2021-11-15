import type { NextApiRequest, NextApiResponse } from "next";
import { mailer } from "../../components/Emails";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Send myself the message. Only send the person contacting another message if
  // the message was sent.
  const { name, email, message } = req.body;

  try {
    const mailerResponse = await mailer.send(
      "ContactEmail",
      {
        name: name,
        email: email,
        message: message,
      },
      { to: `Marta Moros <${process.env.MAIL_NOTIFICATION_ADDRESS}>` }
    );

    if (mailerResponse.accepted.length) {
      // Notification email
      try {
        await mailer.send(
          "ThankYouEmail",
          { name: name, message: message },
          { to: `${name} <${email}>` }
        );
      } catch (err) {
        // We don't care much if the ThankYouEmail does not arrive
      }

      // Message related to ContactEmail
      res.status(200).json({ message: "Notification mail sent" });
    } else {
      res.status(500).json({ message: "Mail recipient not accepted" });
    }
  } catch (err: any) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
}
