import { FunctionComponent } from "react";
import Link from "next/link";
import SocialLink from "./SocialLink";

const Footer: FunctionComponent = () => {
  return (
    <footer className="bg-purple-50 py-3 pl-3 text-center">
      <ul className="flex justify-center items-center space-x-4">
        <li>
          <Link href="/about">
            <a className="hover:underline text-purple-800">About</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a className="hover:underline text-purple-800">Contact</a>
          </Link>
        </li>
        <li className="leading-none flex space-x-1">
          <SocialLink url="https://github.com/Myddna" />
          <SocialLink url="https://www.linkedin.com/in/marta-moros-batlle/" />
          <SocialLink url="https://twitter.com/myddna" />
          <SocialLink url="https://www.instagram.com/myddna" />
          <SocialLink url="https://dispersion.es" />
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
