import type { NextPage } from "next";
import Link from "next/link";
import PageContainer from "../components/structure/PageContainer";
import Hero from "../components/Hero";
import TextBlock from "../components/ui/TextBlock";
import SimpleHighlight from "../components/ui/SimpleHighlight";
import { yearsPassed } from "../utils/utils";
import LatestProjects from "../components/LatestProjects";
import TechStack from "../components/TechStack";

const Home: NextPage = () => {
  const yearsExperience = yearsPassed(
    new Date("2012-09-01 00:00:00"),
    new Date()
  );

  return (
    <PageContainer>
      <Hero />
      <TextBlock className="shadow-sm bg-gray-50">
        <h1 className="section-title">Hi! I’m Marta :)</h1>
        <p>
          I’m a{" "}
          <SimpleHighlight>
            Software Engineer/Web Developer with {yearsExperience} years of
            experience
          </SimpleHighlight>{" "}
          working as a Full Stack Developer.{" "}
        </p>
        <p>
          So far, I’ve worked with technologies such as Drupal, Symfony (PHP
          Based), SCSS, Javascript, and relational databases. I’m currently
          interested in{" "}
          <SimpleHighlight>
            shifting my focus towards current Frontend Development technologies
          </SimpleHighlight>{" "}
          (React, Nextjs, Gatsby, …).{" "}
        </p>
        <p>
          I’ve worked on several projects, including: custom CRM and ERP systems
          for small and medium sized companies, e-commerce implementations,
          online education platforms, marketing websites, and shopping mall
          websites.
        </p>
        <h2>Aptitudes</h2>
        <p>
          My roles usually include{" "}
          <SimpleHighlight>
            requisite analysis, solution design, implementation and maintenance
          </SimpleHighlight>
          , always with users in mind.{" "}
        </p>
        <p>
          I’m not an expert in <SimpleHighlight>UX</SimpleHighlight> but I’m
          interested in learning more about it.
        </p>
        <p>
          I like to learn about new technologies and apply them in real life
          projects. Although I’m not a professional designer, I enjoy doing it
          on my personal projects.{" "}
        </p>
        <div className="flex space-x-4 justify-center mt-10">
          <Link href="/about">
            <a className="btn btn-primary">Read more about me</a>
          </Link>
          <Link href="/contact">
            <a className="btn btn-secondary">Contact</a>
          </Link>
        </div>
      </TextBlock>
      <LatestProjects className="shadow-sm" />
      <TechStack className="shadow-sm bg-gray-50" />
    </PageContainer>
  );
};

export default Home;
