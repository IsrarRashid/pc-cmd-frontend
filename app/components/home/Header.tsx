import { Box, Button, Flex, Select, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ show, setShow }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-3 items-center">
        <Box>
          <Text weight="bold" size="5" className="text-primary">
            Dashboard
          </Text>
        </Box>
        <Box>
          <Flex align="center" className="gap-[10px]" justify="end">
            <Button
              onClick={() => setShow((prev) => !prev)}
              className="!bg-white !text-[#3A3A3A] !h-[50px] !rounded-[11px] !text-xl !shadow-[0px_0px_0px_1.5px_rgba(58,58,58,0.1)] [&_input::placeholder]:!text-[#3A3A3A] [&_input]:!font-medium"
            >
              <GiHamburgerMenu size={24} />

              {show ? "Hide Tiles" : "Show Tiles"}
            </Button>
            <TextField.Root
              placeholder="Search..."
              size="3"
              className="!bg-white !h-[50px] !rounded-[11px] !text-xl !shadow-[0px_0px_0px_1.5px_rgba(58,58,58,0.1)] [&_input::placeholder]:!text-[#3A3A3A] [&_input]:!font-medium"
            >
              <TextField.Slot className="!font-medium">
                <Image
                  src="/icons/search-02.svg"
                  alt="email"
                  height={24}
                  width={24}
                  style={{ width: "24px", height: "24px" }}
                />
              </TextField.Slot>
            </TextField.Root>
            <Select.Root size="3" defaultValue="2025-26">
              <Select.Trigger className="!bg-white !h-[50px] !rounded-[11px] !text-xl !shadow-[0px_0px_0px_1.5px_rgba(58,58,58,0.1)] [&_input::placeholder]:!text-[#3A3A3A] [&_input]:!font-medium" />
              <Select.Content>
                <Select.Group>
                  <Select.Item value="Select">Select</Select.Item>
                  <Select.Item value="2025-26">2025-26</Select.Item>
                  <Select.Item value="2026-27">2026-27</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <Button className="!bg-white !text-[#3A3A3A] !h-[50px] !rounded-[11px] !text-xl !shadow-[0px_0px_0px_1.5px_rgba(58,58,58,0.1)] font-medium !py-[.5em] !px-[0.813em]">
              <Image
                src="/icons/filter.svg"
                alt="filter"
                width={24}
                height={24}
                style={{ width: "24px", height: "24px" }}
              />
              Filter
            </Button>
          </Flex>
        </Box>
      </div>
    </div>
  );
};

export default Header;
