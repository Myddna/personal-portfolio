import { FunctionComponent, useState, SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ContactForm: FunctionComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isABot, setIsABot] = useState("");

  const sendMail = (e: SyntheticEvent) => {
    e.preventDefault();

    const messageStyles = {
      style: {
        minWidth: "250px",
      },
      success: {
        duration: 5000,
        icon: "💚",
      },
      error: {
        duration: 9000,
        icon: "😱",
      },
    };

    let mailData = {
      name,
      email,
      message,
    };

    if(isABot !== ""){
      toast.error('Cannot send your message', messageStyles);
      return;
    }

    // Disabling the button
    setSubmitting(true);

    // Configure the toaster with a promise
    const sendMessagePromise = fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailData),
    });

    toast.promise(
      sendMessagePromise,
      {
        loading: "Sending",
        success: (data) => {
          setSubmitting(false);
          if (data.status === 200) {
            setSubmitting(false);
            setName("");
            setEmail("");
            setMessage("");
            return `Mail sent. Thank you!`;
          } else {
            return (
              <span>
                Unable to connect to the mailing API.{" "}
                <strong>Please use an alternative way of contact.</strong>
              </span>
            );
          }
        },
        error: (err) => {
          setSubmitting(false);
          return (
            <span>
              Your message could not be sent.{" "}
              <strong>
                Please use an alternative way of contact ({err.toString()})
              </strong>
            </span>
          );
        },
      },
      messageStyles
    );
  };

  return (
    <form
      onSubmit={sendMail}
      className="px-8 pb-4 pt-8 rounded shadow mx-auto mt-10 md:w-3/4"
    >
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="input-field"
          placeholder="🙋 Your name here"
          required={true}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          className="input-field"
          placeholder="📧 your@email.com"
          required={true}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          rows={5}
          className="input-field"
          placeholder="✏️ Your message here"
          required={true}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </div>
      <div className="text-center mt-10 mb-4 d-none">
        <input 
          type="text" 
          name="voightkampff" 
          value={isABot}
          style={{display: 'none'}} 
          tabIndex={-1} 
          autoComplete="off" 
          onChange={(e) => {
            setIsABot(e.target.value);
          }} />
      </div>
      <div className="text-center mt-10 mb-4">
        <button
          type="submit"
          className="btn btn-secondary"
          disabled={submitting}
        >
          <FontAwesomeIcon icon={faPaperPlane} /> Send it!
        </button>
      </div>
      
    </form>
  );
};

export default ContactForm;
