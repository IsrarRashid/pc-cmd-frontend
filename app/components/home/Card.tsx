import { PropsWithChildren } from "react";

const Card = ({ children }: PropsWithChildren) => {
  return (
    // <div className="w-full bg-[#063A6A] shadow-[0_0_0_1px_#1BCEF5]">
    <div className="w-full bg-[#063A6A] border-[0.063rem] border-[#1BCEF5]">
      {children}
    </div>
  );
};

export default Card;
