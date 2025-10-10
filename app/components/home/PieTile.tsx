import React from "react";
import Card from "./Card";
import { Box, Flex, Text } from "@radix-ui/themes";
import PieChartPreview from "./PieChartPreview";
import { Province } from "@/app/page";

const PieTile = ({ province }: { province: Province }) => {
  return (
    <Card>
      <Box className="px-[19] py-[15px] text-white">
        <PieChartPreview province={province} />
        <Flex justify="between">
          <Flex align="center" gap="1">
            <Box className="w-[8px] h-[8px] bg-[#038907] rounded-[4.42px]"></Box>
            <Text weight="medium" className="text-[0.5141rem] text-[#667085]">
              Production
            </Text>
            <Text weight="medium" className="text-[0.5141rem] ">
              {province?.totalProduction}
            </Text>
          </Flex>
          <Flex align="center" gap="1">
            <Box className="w-[8px] h-[8px] bg-[#FEB019] rounded-[4.42px]"></Box>
            <Text weight="medium" className="text-[0.5141rem] text-[#667085]">
              Consumption
            </Text>
            <Text weight="medium" className="text-[0.5141rem] ">
              {province.totalConsumption}
            </Text>
          </Flex>
          <Flex align="center" gap="1">
            <Box className="w-[8px] h-[8px] bg-[#E61313] rounded-[4.42px]"></Box>
            <Text weight="medium" className="text-[0.5141rem] text-[#667085]">
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
