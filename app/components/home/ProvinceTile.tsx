import {
  Button,
  Flex,
  DataList,
  Progress,
  Text,
  Separator,
} from "@radix-ui/themes";
import Card from "./Card";
import { Province } from "@/app/page";
import { Fragment } from "react";

const ProvinceTile = ({ province }: { province: Province }) => {
  return (
    <Card key={province.provinceId}>
      <Button className="!bg-transparent !w-full !h-full !p-0">
        <Flex
          justify="between"
          className="!py-[5px] !px-[10px] !bg-[#002344]  !w-full !h-full"
        >
          <Text
            as="p"
            align="center"
            weight="medium"
            className="!text-xs !text-warning !leading-[1.108em]"
          >
            {province.provinceName} Production
          </Text>
          <Text
            as="p"
            align="center"
            weight="medium"
            className="!text-xs !text-warning !leading-[1.108em]"
          >
            {province.totalProduction} Tons
          </Text>
        </Flex>
      </Button>

      <DataList.Root className="!gap-0">
        {/* {province.divisions.map((division) => (
          <>
            {division.districts.map((district) => (
              <DataList.Item
                key={district.districtId}
                className="!flex !justify-between !items-center !py-[5px] !px-2.5"
              >
                <DataList.Label minWidth="88px">
                  <Text className="!text-base !text-white" wrap="nowrap">
                    {district.districtName}
                  </Text>
                </DataList.Label>
                <DataList.Value className="!w-full !min-w-[200px]">
                  <Flex
                    align="center"
                    gap="2"
                    className="!justify-between !flex-row-reverse w-full"
                  >
                    {district.totalProduction && (
                      <Progress
                        max={division.totalProduction}
                        value={district.totalProduction || 0}
                        color="green"
                        className="w-full h-2 bg-transparent"
                        style={{
                          // Transparent background
                          backgroundColor: "transparent",
                          transform: "scaleX(-1)", // visually reverses the direction
                        }}
                      />
                    )}
                    <Text
                      wrap="nowrap"
                      className="!text-white !text-[0.625rem]"
                    >
                      {district.totalProduction}
                    </Text>
                  </Flex>
                </DataList.Value>
              </DataList.Item>
            ))}
          </>
        ))} */}
        {province.divisions.map((division) => {
          // ✅ Sort districts in descending order based on totalProduction
          const sortedDistricts = division.districts
            .slice() // make a shallow copy
            .sort(
              (a, b) => (b.totalProduction || 0) - (a.totalProduction || 0)
            );

          // ✅ Helper to get color based on totalProduction
          const getProgressColor = (value: number) => {
            if (value < 35000) return "red"; // red-500
            if (value <= 70000) return "yellow"; // yellow-500
            return "green"; // green-500
          };

          return (
            <Fragment key={division.divisionId}>
              {sortedDistricts.map((district) => (
                <DataList.Item
                  key={district.districtId}
                  className="!flex !justify-between !items-center !py-[5px] !px-2.5"
                >
                  <DataList.Label minWidth="88px">
                    <Text className="!text-base !text-white" wrap="nowrap">
                      {district.districtName}
                    </Text>
                  </DataList.Label>
                  <DataList.Value className="!w-full !min-w-[50px]">
                    <Flex
                      align="center"
                      gap="2"
                      className="!justify-between !flex-row-reverse w-full"
                    >
                      {district.totalProduction && (
                        <Progress
                          max={division.totalProduction}
                          value={district.totalProduction || 0}
                          color={getProgressColor(district.totalProduction)}
                          className="!w-1/3 !h-2 !bg-transparent"
                          style={{
                            backgroundColor: "transparent",
                            transform: "scaleX(-1)",
                          }}
                        />
                      )}
                      <Text
                        wrap="nowrap"
                        className="!text-white !text-[0.625rem]"
                      >
                        {district.totalProduction}
                      </Text>
                    </Flex>
                  </DataList.Value>
                </DataList.Item>
              ))}
              <DataList.Item className="!flex !justify-between !items-center ">
                <Separator
                  size="4"
                  className="rounded-full !bg-white !px-0 custom-separator"
                />
              </DataList.Item>
            </Fragment>
          );
        })}
      </DataList.Root>
    </Card>
  );
};

export default ProvinceTile;
