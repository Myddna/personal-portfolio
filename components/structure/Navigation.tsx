import { FunctionComponent } from "react";
import Link from "next/link";
import NavItem from "./NavItem";
import { useRouter } from "next/dist/client/router";
import logo from "../../assets/logo.svg";
import Image from "next/image";

const Navigation: FunctionComponent = () => {
  const router = useRouter();

  const myName = "Marta Moros Batlle";
  console.log("Current route", router.asPath);

  return (
    <header className="bg-purple-900 mx-auto px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-900">
      <div className="flex justify-between items-center flex-col sm:flex-row">
        <div className="flex flex-col">
          <Link href="/">
            <a className="flex items-center space-x-4">
              <Image
                alt="Logo"
                src={logo}
                layout="fixed"
                width={46}
                height={46}
              />
              <div className="flex flex-col">
                {router.asPath === "/" ? (
                  <h1 className="text-white font-medium font-title text-2xl my-0 leading-none">
                    {myName} titulo home
                  </h1>
                ) : (
                  <div className="text-white font-medium font-title text-2xl my-0 leading-none">
                    {myName} titulo no home
                  </div>
                )}
                {/**
                <div className="text-white font-medium font-title text-2xl my-0 leading-none">
                  {myName}
                </div>
                 */}
                <div className="text-purple-200 text-sm">
                  Software Engineer and Web Developer
                </div>
              </div>
            </a>
          </Link>
        </div>
        <nav className="flex space-x-4 text-white">
          <NavItem href="/about" text="About me" />
          {/*<NavItem href="/experience" text="Experience" />*/}
          {/*<NavItem href="/projects" text="Projects" />*/}
          <NavItem href="/contact" text="Contact" />
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
