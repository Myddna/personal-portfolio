import type { NextPage } from "next";
import ContactForm from "../components/ContactForm";
import PageContainer from "../components/structure/PageContainer";
import TextBlock from "../components/ui/TextBlock";

const Contact: NextPage = () => {
  return (
    <PageContainer title="Contact">
      <TextBlock>
        <h1>Contact</h1>
        <p>
          You can get in touch with me through the form on this page,{" "}
          <a href="https://www.linkedin.com/in/marta-moros-batlle/">LinkedIn</a>
          , or send me an email to{" "}
          <a href="mailto:marta.m.batlle@gmail.com">marta.m.batlle@gmail.com</a>
          .
        </p>
        <ContactForm />
      </TextBlock>
    </PageContainer>
  );
};

export default Contact;
