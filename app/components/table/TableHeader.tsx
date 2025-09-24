"use client";
import { Table, useThemeContext } from "@radix-ui/themes";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}
const TableHeader = ({ children, className }: Props) => {
  const theme = useThemeContext();
  return (
    <Table.Header
      className={`${
        theme.appearance === "light" ? "bg-white" : "bg-[#141518]"
      } ${className}`}
    >
      {children}
    </Table.Header>
  );
};

export default TableHeader;
