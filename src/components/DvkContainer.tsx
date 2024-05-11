import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export const DvkContainer = ({ children }: ContainerProps) => {
  return (
    <>
      <div className="container mx-auto mt-10 mb-10">{children}</div>
    </>
  );
};
