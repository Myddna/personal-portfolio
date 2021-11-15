import { FunctionComponent, ReactNode } from "react";
import { RoughNotation } from "react-rough-notation";

type Props = {
  children?: ReactNode;
};

const SimpleHighlight: FunctionComponent = ({ children }: Props) => {
  return (
    <RoughNotation
      type="highlight"
      show={true}
      animate={false}
      multiline={true}
      color="#e8ff65a7"
    >
      {children}
    </RoughNotation>
  );
};

export default SimpleHighlight;
