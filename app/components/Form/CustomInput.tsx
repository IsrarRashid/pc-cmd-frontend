"use client";
import { forwardRef, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const CustomInput = forwardRef<HTMLInputElement, Props>(
  ({ className, style, ...rest }, ref) => {
    return (
      <input
        {...rest}
        ref={ref}
        className={`${
          className
            ? className
            : "bg-white/80 rounded-[0.438rem] py-[10px] px-[12px] h-[41px] text-[#545861] font-medium text-[0.875rem] shadow-[0px_0px_0px_1.5px_#EFF0F2] focus:shadow-[0px_0px_0px_1.5px_#0C8CE9] transition-shadow duration-300 outline-none border-0 [&_input::placeholder]:text-[#80889E] [&_input::placeholder]:font-medium [&_input::placeholder]:text-sm [&_input::placeholder]:opacity-100"
        }`}
        style={{
          ...style,
        }}
      />
    );
  }
);

// 💡 Add this line to resolve the lint error
CustomInput.displayName = "CustomInput";

export default CustomInput;
