import React from "react";
import Card from "./Card";
import { Box, Flex, Text } from "@radix-ui/themes";
import PieChartPreview from "./PieChartPreview";
import { Province } from "@/app/page";
import classnames from "classnames";

const PieTile = ({ province }: { province: Province }) => {
  return (
    <Card>
      <Box className="px-[19] py-[15px] text-white">
        <PieChartPreview province={province} />
        <Flex justify="between">
          <Flex align="center" gap="1">
            <Box className="w-[8px] h-[8px] bg-[#02B377] rounded-[4.42px]"></Box>
            <Text weight="medium" className="text-[0.5141rem] !text-white">
              Production
            </Text>
            <Text weight="medium" className="text-[0.5141rem] ">
              {province?.totalProduction}
            </Text>
          </Flex>
          <Flex align="center" gap="1">
            <Box className="w-[8px] h-[8px] bg-[#3BA2F1] rounded-[4.42px]"></Box>
            <Text weight="medium" className="text-[0.5141rem] !text-white">
              Consumption
            </Text>
            <Text weight="medium" className="text-[0.5141rem] ">
              {province.totalConsumption}
            </Text>
          </Flex>
          <Flex align="center" gap="1">
            <Box
              className={classnames({
                "bg-[#3D6730]": province.balance > 0,
                "bg-[#FEB019]": province.balance < 0,
                "w-[8px] h-[8px]  rounded-[4.42px]": true,
              })}
            ></Box>
            <Text weight="medium" className="text-[0.5141rem] !text-white">
              Deficit
            </Text>
            <Text weight="medium" className="text-[0.5141rem] ">
              {province.balance}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Card>
  );
};

export default PieTile;
