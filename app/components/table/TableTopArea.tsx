"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { PiCircleFill } from "react-icons/pi";
import CustomInput from "../Form/CustomInput";
import { Badge, Flex } from "@radix-ui/themes";

interface Props<T> {
  heading: string;
  searchTerm: string;
  filteredData: T[];
  data: T[];
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form?: ReactNode;
  status?: string;
  searchClassName?: string;
}

const TableTopArea = <T,>({
  heading,
  searchTerm,
  filteredData,
  data,
  handleChange,
  form,
  status,
  searchClassName,
}: Props<T>) => {
  const [isInputFocused, setIsInputFocused] = useState(false); // Detect input focus
  console.log("isInputFocused", isInputFocused);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle clicks outside the input field
  useEffect(() => {
    if (typeof window === "undefined") return; // Prevents SSR crash
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Flex align="center" style={{ padding: "17.33px 26px" }}>
      <div className="col p-0">
        <Flex align="center" gap="2">
          <div className="col-auto mb-1 mb-lg-0">
            <h4 className="m-0" style={{ fontWeight: 800 }}>
              {heading}
            </h4>
          </div>
          <div className="col-auto mb-2 mb-lg-0">
            <Badge
              radius="full"
              className="!text-[0.813rem] !font-semibold"
              style={{ color: "#1C6BA6", border: "1.08px solid #1C6BA6" }}
            >
              <Flex align="center" gap="2">
                <div className="col-auto pe-0">
                  <PiCircleFill size={8} style={{ color: "#1C6BA6" }} />
                </div>
                <div className="col ps-1">
                  {searchTerm || status ? filteredData.length : data?.length}/
                  {searchTerm || status ? filteredData.length : data?.length}{" "}
                  {status} {heading}
                </div>
              </Flex>
            </Badge>
          </div>
        </Flex>
      </div>

      {handleChange && (
        <div
          className={
            searchClassName
              ? searchClassName
              : "col-12 col-sm-12 col-md-5 col-lg-4 col-xl-3"
          }
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <button
                className="btn rounded-end rounded-pill text-white shadow-none border-end-0 pe-0"
                type="submit"
                style={{
                  border: "1.08px solid #CBD5E1",
                }}
              >
                <IoSearchOutline size={21.6} style={{ color: "#475569" }} />
              </button>
              <CustomInput
                type="text"
                className="form-control fw-bold border-start-0 rounded-pill rounded-start shadow-none fs15px bg-transparent py-2 placeholder-bold"
                style={{
                  border: "1px solid #CBD5E1",
                }}
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
                id="search"
              />
            </div>
          </form>
        </div>
      )}
      {form}
    </Flex>
  );
};

export default TableTopArea;
