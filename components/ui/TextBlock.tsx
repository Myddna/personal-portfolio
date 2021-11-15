import { FunctionComponent, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

const TextBlock: FunctionComponent<Props> = ({
  children,
  className,
}: Props) => {
  return (
    <section className={className}>
      <div className="max-w-screen-lg px-4 pt-10 pb-16 mx-auto text-gray-500 text-lg">
        {children}
      </div>
    </section>
  );
};

export default TextBlock;
