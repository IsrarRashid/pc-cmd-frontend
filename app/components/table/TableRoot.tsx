"use client";
import { Table, useThemeContext } from "@radix-ui/themes";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const TableRoot = ({ children, className }: Props) => {
  const theme = useThemeContext();
  return (
    <Table.Root
      size="3"
      className={`border-[1px] ${
        theme.appearance === "light" ? "border-[#E9EAEB]" : "border-[#1D1F25]"
      } rounded-lg ${className}`}
    >
      {children}
    </Table.Root>
  );
};

export default TableRoot;
