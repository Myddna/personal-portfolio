import { FunctionComponent } from "react";
import TextBlock from "./ui/TextBlock";

type Props = {
  className?: string;
};

const TechStack: FunctionComponent<Props> = ({ className }: Props) => {
  return (
    <TextBlock className={className}>
      <h1>Stack</h1>
      <p>ASDFG</p>
    </TextBlock>
  );
};

export default TechStack;
