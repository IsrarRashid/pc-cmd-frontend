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
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        <Box>
          <Text weight="bold" size="4" className="text-primary">
            Dashboard
          </Text>
        </Box>
        <Box>
          <Flex align="center" className="gap-[10px]" justify="end">
            <Button
              size="1"
              onClick={() => setShow((prev) => !prev)}
              className="!bg-white !text-[#3A3A3A] !rounded-[11px] !shadow-[0px_0px_0px_1.5px_rgba(58,58,58,0.1)] [&_input::placeholder]:!text-[#3A3A3A] [&_input]:!font-medium"
            >
              <GiHamburgerMenu />

              {show ? "Hide Tiles" : "Show Tiles"}
            </Button>
            <TextField.Root
              placeholder="Search..."
              size="1"
              className="!bg-white !rounded-[11px] !shadow-[0px_0px_0px_1.5px_rgba(58,58,58,0.1)] [&_input::placeholder]:!text-[#3A3A3A] [&_input]:!font-medium"
            >
              <TextField.Slot className="!font-medium">
                <Image
                  src="/icons/search-02.svg"
                  alt="email"
                  height={15}
                  width={15}
                />
              </TextField.Slot>
            </TextField.Root>
            <Select.Root size="1" disabled={true} defaultValue="2025-26">
              <Select.Trigger className="!bg-white !rounded-[11px] !shadow-[0px_0px_0px_1.5px_rgba(58,58,58,0.1)] [&_input::placeholder]:!text-[#3A3A3A] [&_input]:!font-medium" />
              <Select.Content>
                <Select.Group>
                  <Select.Item value="Select">Select</Select.Item>
                  <Select.Item value="2025-26">2025-26</Select.Item>
                  <Select.Item value="2026-27">2026-27</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <Button
              size="1"
              className="!bg-white !text-[#3A3A3A]  !rounded-[11px] !shadow-[0px_0px_0px_1.5px_rgba(58,58,58,0.1)] font-medium"
            >
              <Image
                src="/icons/filter.svg"
                alt="filter"
                width={15}
                height={15}
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
