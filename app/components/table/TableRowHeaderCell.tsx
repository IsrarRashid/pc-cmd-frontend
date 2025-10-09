"use client";
import { Checkbox, Flex, Table, Text, useThemeContext } from "@radix-ui/themes";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const TableRowHeaderCell = ({ children, className }: Props) => {
  const theme = useThemeContext();
  return (
    <Table.RowHeaderCell
      className={` font-semibold ${
        theme.appearance === "light" ? "bg-[#fff]" : "bg-[#191B20]"
      } ${className}`}
    >
      <Text as="label" size="2">
        <Flex gap="2">
          <Checkbox />
          {children}
        </Flex>
      </Text>
    </Table.RowHeaderCell>
  );
};

export default TableRowHeaderCell;
