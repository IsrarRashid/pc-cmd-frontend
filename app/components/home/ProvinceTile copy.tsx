import { Button, Flex, DataList, Progress, Text } from "@radix-ui/themes";
import Card from "./Card";
import { Province } from "@/app/page";

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
        {province.divisions.map((division) => (
          <DataList.Item
            key={division.divisionId}
            className="!flex !justify-between !items-center !py-[5px] !px-2.5"
          >
            <DataList.Label minWidth="88px">
              <Text className="!text-base !text-white" wrap="nowrap">
                {division.divisionName}
              </Text>
            </DataList.Label>
            <DataList.Value className="!w-full !min-w-[200px]">
              <Flex
                align="center"
                gap="2"
                className="!justify-between !flex-row-reverse w-full"
              >
                {division.totalProduction && (
                  <Progress
                    max={province.totalProduction}
                    value={division.totalProduction || 0}
                    color="green"
                    className="w-full h-2 bg-transparent"
                    style={{
                      // Transparent background
                      backgroundColor: "transparent",

                      // Radix Themes uses CSS var for progress fill color
                      // so we override it directly
                      // ["--progress-color" as any]: "#038907", // Tailwind's green-500 (success)
                      // ["--progress-track-color" as any]: "transparent", // hide track
                      transform: "scaleX(-1)", // visually reverses the direction
                    }}
                  />
                )}
                <Text wrap="nowrap" className="!text-white !text-[0.625rem]">
                  {division.totalProduction}
                </Text>
              </Flex>
            </DataList.Value>
          </DataList.Item>
        ))}
        {/* <DataList.Item className="!flex !justify-between !items-center ">
                            <Separator
                              size="4"
                              className="rounded-full !bg-white !px-0 custom-separator"
                            />
                          </DataList.Item> */}
      </DataList.Root>
    </Card>
  );
};

export default ProvinceTile;
