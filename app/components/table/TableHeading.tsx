import { Checkbox, Flex, Table } from "@radix-ui/themes";
import { CSSProperties } from "react";
import { PiCaretUpDownFill } from "react-icons/pi";

interface Props {
  name: string;
  handleSort?: () => void;
  className?: string;
  style?: CSSProperties;
  textClassName?: string;
  isFirst?: boolean;
  colSpan?: number;
}

const TableHeading = ({
  name,
  handleSort,
  className,
  style,
  textClassName,
  isFirst = false,
  colSpan,
}: Props) => {
  const defaultStyle: CSSProperties = {
    backgroundColor: "#F8FAFC",
    borderBottom: "1.08px solid #CBD5E1",
    padding: "15.17px 26px",
    zIndex: "2",
  };
  return (
    <Table.ColumnHeaderCell
      colSpan={colSpan}
      scope="col"
      className={`${
        handleSort ? "cursor-pointer" : ""
      } fs15px position-sticky top-0 ${className || ""}`}
      style={{ ...defaultStyle, ...style }}
      onClick={handleSort}
    >
      <Flex align="center" gap="2">
        {isFirst && <Checkbox />}
        {handleSort ? (
          <Flex align="center" wrap="nowrap" gap="2">
            <div
              className="w-auto fs15px"
              style={{ paddingRight: "13px", color: "#1E293B" }}
            >
              {name.toUpperCase()}
            </div>
            <div className="w-auto ps-0">
              <PiCaretUpDownFill size={21} />
            </div>
          </Flex>
        ) : (
          <p className={`m-0 ${textClassName}`} style={{ color: "#1E293B" }}>
            {name.toUpperCase()}
          </p>
        )}
      </Flex>
    </Table.ColumnHeaderCell>
  );
};

export default TableHeading;
