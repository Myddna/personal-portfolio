import { FunctionComponent } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

type Params = {
  href: string;
  text: string;
};

const NavItem: FunctionComponent<Params> = ({ href, text }) => {
  const router = useRouter();
  const active = href == router.asPath ? "border-white" : "border-transparent";
  return (
    <Link href={href}>
      <a
        className={`border-b-2 py-2 hover:border-white transition-colors ${active}`}
      >
        {text}
      </a>
    </Link>
  );
};

export default NavItem;
