import { ReactNode } from "react";

type FormSectionProps = {
  sectionName: string;
  children: ReactNode;
};

export const FormSection = ({ sectionName, children }: FormSectionProps) => {
  return (
    <div className="mt-4 mb-4 flex border border-red-500 p-6 bg-gray-800">
      <div className="w-1/5">
        <p className="text-xl mb-3">{sectionName}</p>
      </div>
      <div className="w-4/5">{children}</div>
    </div>
  );
};
