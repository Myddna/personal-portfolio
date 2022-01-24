import type { NextApiRequest, NextApiResponse } from "next";
import { mailer } from "../../components/Emails";

type Data = {
  message: string;
};

function validEmailformat(email: string) {
    return /\S+@\S+\.\S+/.test(email);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {
    // Making it a little bit more difficult to spammers to use my form
    const { name, email, message, voightkampff } = req.body;
    if(name == undefined || email == undefined || message == undefined ||
      name == "" || email == "" || message == "" || !validEmailformat(email)){
      throw new Error('Invalid message');
    }

    if(voightkampff == undefined || voightkampff != ""){
      throw new Error('You are not a HU-MAN!');
    }

    // Send myself the message. Only send the person contacting another message if
    // the message was sent.
    const mailerResponse = await mailer.send(
      "ContactEmail",
      {
        name: name,
        email: email,
        message: message
      },
      { to: `Marta Moros <${process.env.MAIL_NOTIFICATION_ADDRESS}>` }
    );

    if (mailerResponse.accepted.length) {
      // Notification email
      try {
        await mailer.send(
          "ThankYouEmail",
          { 
            name: name, 
            email: email,
            message: message
          },
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
