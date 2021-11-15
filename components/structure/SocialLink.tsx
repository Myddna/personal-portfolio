import { FunctionComponent } from "react";
import { SocialIcon } from "react-social-icons";

type Params = {
  url: string;
};

const SocialLink: FunctionComponent<Params> = ({ url }) => {
  return (
    <SocialIcon
      className="filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
      url={url}
      style={{
        width: 28,
        height: 28,
      }}
    />
  );
};

export default SocialLink;
