import { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode
};

const SimpleHighlight: FunctionComponent<Props> = ({ children }) => {
  return (
    <mark
      style={{ "background": "linear-gradient(\n  -100deg,\n  hsla(48,92%,75%,.3),\n  hsla(48,92%,75%,.7) 95%,\n  hsla(48,92%,75%,.1)\n  )", "borderRadius": "1em 0", "padding": ".3em" }}
    >
      {children}
    </mark >
  );
};

export default SimpleHighlight;
