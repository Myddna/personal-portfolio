import type { NextPage } from "next";
import PageContainer from "../components/structure/PageContainer";
import SimpleHighlight from "../components/ui/SimpleHighlight";
import TextBlock from "../components/ui/TextBlock";

const About: NextPage = () => {
  return (
    <PageContainer title="Who am I?">
      <TextBlock>
        <h1>Who am I?</h1>
        <p>
          Im Marta, a Software Engineer / Web Developer who, after many years
          working with the LAMP stack, decided to{" "}
          <SimpleHighlight>change course </SimpleHighlight> and become a
          modern-day <SimpleHighlight>Frontend Developer.</SimpleHighlight>
        </p>
        <p>
          You can <a href="/MartaMorosBatlle_ENG_CV.pdf">download here my CV</a>
          , and{" "}
          <a href="https://www.linkedin.com/in/marta-moros-batlle/">
            check my LinkedIn profile
          </a>
          .
        </p>
      </TextBlock>
    </PageContainer>
  );
};

export default About;
