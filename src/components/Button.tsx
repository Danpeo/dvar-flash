import { MouseEventHandler } from "react";

type ButtonSubmitProps = {
  type: "submit" | "reset" | "button" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  buttonText: string;
};

export const Button = ({ type, onClick, buttonText }: ButtonSubmitProps) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className="w-full mb-2 mt-2 bg-gray-900 border border-red-500 px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-red-500 hover:text-white text-xl cursor-pointer"
      >
        {buttonText}
      </button>
    </>
  );
};
