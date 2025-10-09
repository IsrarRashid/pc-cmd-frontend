import { Badge, Box, Button, Flex, Text } from "@radix-ui/themes";
import { ReactNode } from "react";

interface Props {
  // method?: "POST" | "PUT";
  onClick?: () => void;
  name: string;
  icon: ReactNode | string;
  isBadge?: boolean;
  description: string;
}

const ActionButton = ({
  // method = "POST",
  onClick,
  name,
  icon,
  isBadge = false,
  description,
}: Props) => {
  return (
    <Button
      type="button"
      className={`!bg-transparent !w-full !h-fit !inline-block !p-0`}
      onClick={onClick}
    >
      <Flex
        gap="4"
        p="3"
        className="!rounded-md hover:!bg-gray-200 !transition-colors !duration-150"
      >
        {icon}
        <Box>
          <Flex gap="2" align="center" mb="2">
            <Text as="p" size="4" weight="medium" className="text-black">
              {/* {method === "POST" ? "Add" : "Update"}  */}
              {name}
            </Text>
            {isBadge && (
              <Badge
                className="!text-[#1F6142] !bg-[#E8FDF1] !font-normal !py-[.25em] !px-[.5em]"
                radius="full"
              >
                NEW
              </Badge>
            )}
          </Flex>
          <Text as="p" size="2" className="!text-[#686868]">
            {description}
          </Text>
        </Box>
      </Flex>
    </Button>
  );
};

export default ActionButton;
