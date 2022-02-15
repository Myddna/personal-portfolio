import type { NextPage } from "next";
import Link from "next/link";
import PageContainer from "../components/structure/PageContainer";
import SimpleHighlight from "../components/ui/SimpleHighlight";
import TextBlock from "../components/ui/TextBlock";
import { yearsPassed } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import resumePDF from "../assets/MartaMorosBatlle_ENG_CV_NPD.pdf";

const About: NextPage = () => {
  const yearsExperience = yearsPassed(
    new Date("2012-09-01 00:00:00"),
    new Date()
  );
  return (
    <PageContainer
      title="Who am I?"
      description="Im Marta, a Software Engineer / Web Developer who, after many years working with the LAMP stack, decided to change course and become a modern-day Frontend Developer, learning React, Nextjs, Gatsby..."
    >
      <TextBlock>
        <h1>Who am I?</h1>
        <p>
          I&apos;m a{" "}
          <SimpleHighlight>
            Software Engineer/Web Developer with {yearsExperience} years of
            experience
          </SimpleHighlight>{" "}
          working as a Full Stack Developer.{" "}
        </p>
        <p>
          So far, I&apos;ve worked with technologies such as Drupal, Symfony (PHP
          Based), SCSS, LESS, Javascript, and relational databases. I&apos;m currently
          interested in{" "}
          <SimpleHighlight>
            shifting my focus towards current Frontend Development technologies
          </SimpleHighlight>{" "}
          (React, Nextjs, Gatsby, …).{" "}
        </p>
        <p>
          I&apos;ve worked on several projects, including: custom CRM and ERP systems
          for small and medium sized companies, e-commerce implementations,
          online education platforms, marketing websites, and shopping mall
          websites.
        </p>
        <h2>Aptitudes</h2>
        <ul>
          <li>
            My roles usually include{" "}
            <SimpleHighlight>
              requisite analysis, solution design, implementation and
              maintenance
            </SimpleHighlight>
            , always with users in mind.{" "}
          </li>
          <li>
            I&apos;m not an expert in <SimpleHighlight>UX</SimpleHighlight> but I&apos;m
            interested in learning more about it.
          </li>
          <li>
            Although I&apos;m not a professional designer, I enjoy doing it on my
            personal projects.{" "}
          </li>
        </ul>
        <div className="flex space-x-6 my-10 pl-4">
          <a className="btn btn-primary" href={resumePDF}>
            <FontAwesomeIcon icon={faFileDownload} /> Download my resume
          </a>
          <Link href="/contact">
            <a className="btn btn-secondary">
              <FontAwesomeIcon icon={faEnvelope} /> Get in touch
            </a>
          </Link>
        </div>
        <h2>There is more...</h2>
        <p>
          I consider myself quite a{" "}
          <SimpleHighlight>creative person</SimpleHighlight>. I&apos;ve had{" "}
          a <em>crafty</em> personal blog
          {" "}
          for many years, before even starting to study computer science (and
          that was some time ago). I also maintain a{" "}
          <a href="https://desvania.es" target="_blank" rel="noreferrer">
            collaborative recipe blog
          </a>{" "}
          with some friends.
        </p>
        <p>
          I&apos;ve been interested on Calligraphy since 2015, and that&apos;s
          the reason behind two of my first React-based projects:
        </p>
        <ul>
          <li>
            🪶{" "}
            <a
              href="https://calilineas.quedemoniosescribo.art"
              target="_blank"
              rel="noreferrer"
            >
              CaliLíneas
            </a>
            : A Calligraphy guidelines generator (React, Bootstrap)
          </li>
          <li>
            ✍️{" "}
            <a
              href="https://quedemoniosescribo.art"
              target="_blank"
              rel="noreferrer"
            >
              Qué demonios escribo
            </a>
            : Random quotes selector made with Gatsby v4, some days before the
            v4&apos;s release, to test Contentful integration. (Gatsby, custom styles)
          </li>
        </ul>
        <p>After that:</p>
        <ul>
          <li><SimpleHighlight>This portfolio website</SimpleHighlight> (NextJS, Tailwinds CSS)</li>
          <li>Front end implementation for a <SimpleHighlight>podcast management 
            tool, codename Jarvis</SimpleHighlight>, not yet released (React, custom styles).</li>
        </ul>
        <p>I&apos;m also interested in painting (gouache, watercolor, acrylic),
          tropical plants, photography, reading, my <em>doge</em>, videogames...
        </p>
      </TextBlock>
    </PageContainer >
  );
};

export default About;
