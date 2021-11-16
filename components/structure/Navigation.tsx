import { FunctionComponent } from "react";
import Link from "next/link";
import NavItem from "./NavItem";
import logo from "../../assets/logo.svg";
import Image from "next/image";

const Navigation: FunctionComponent = () => {
  const myName = "Marta Moros Batlle";

  return (
    <header className="bg-purple-900 mx-auto px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-900">
      <div className="flex justify-between items-center flex-col sm:flex-row">
        <div className="flex flex-col">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <a title="Go to homepage">
                <Image
                  alt="Logo"
                  src={logo}
                  layout="fixed"
                  width={46}
                  height={46}
                />
              </a>
            </Link>
            <div className="flex flex-col">
              <div className="my-0 leading-none text-2xl text-white font-medium font-title">
                {myName}
              </div>
              <div className="text-purple-200 text-sm">
                Software Engineer and Web Developer
              </div>
            </div>
          </div>
        </div>
        <nav className="flex space-x-4 text-white">
          <NavItem href="/about" text="About me" />
          <NavItem href="/contact" text="Contact" />
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
