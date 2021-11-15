import { FunctionComponent, ReactNode } from "react";
import TextBlock from "./ui/TextBlock";

type Props = {
  className?: string;
};

const LatestProjects: FunctionComponent<Props> = ({ className }: Props) => {
  return (
    <TextBlock className={className}>
      <h1>Latest projects</h1>
      <p>
        GitHub API Integration Coming Soon&trade;. In the meantime you can...
      </p>
      <div className="mt-8 flex">
        <a
          href="https://github.com/Myddna"
          className="btn btn-primary"
          target="_blank"
          rel="noreferrer"
        >
          Check my GitHub
        </a>
      </div>
    </TextBlock>
  );
};

export default LatestProjects;
