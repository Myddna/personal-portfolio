import { FunctionComponent, ReactNode } from "react";
import TextBlock from "./ui/TextBlock";

type Props = {
  className?: string;
};

const LatestProjects: FunctionComponent<Props> = ({ className }: Props) => {
  return (
    <TextBlock className={className}>
      <h1>Latest projects</h1>
      <p>ASDF</p>
    </TextBlock>
  );
};

export default LatestProjects;
