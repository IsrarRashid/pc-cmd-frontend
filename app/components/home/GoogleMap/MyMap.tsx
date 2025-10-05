"use client";
import { devmap } from "@/app/utils/utils";
import * as Accordion from "@radix-ui/react-accordion";
import { Box, Flex, Heading, Progress, Text } from "@radix-ui/themes";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

export interface DistrictProjects {
  id: number;
  superGroupID: number;
  smdpProjectID: number;
  name: string;
  sectorId: number;
  address: string;
  city: string;
  division: string;
  districtId: number;
  latitude: string;
  longitude: string;
  locationCoordinates: string;
  status: string;
  approvalDate: string;
}
// Use the GeoJSON polygon coordinates (array of arrays of lat/lng)
// const punjabPolygonCoords: { lat: number; lng: number }[][] = [
//   [
//     { lat: 32.332426605000094, lng: 75.29840293600006 },
//     { lat: 32.28438710600007, lng: 75.35295048000006 },
//     { lat: 32.2616753140001, lng: 75.35904829900011 },
//     { lat: 32.21074818900006, lng: 75.31657027200009 },
//     { lat: 32.14889150000006, lng: 75.29465946500005 },
//     { lat: 32.128634339000044, lng: 75.19575077300004 },
//     { lat: 32.10972076500009, lng: 75.17311649600009 },
//     { lat: 32.086828105000095, lng: 75.17415002500007 },
//     { lat: 32.093494364, lng: 75.13838993300004 },
//     { lat: 32.07809478800003, lng: 75.10211307800012 },
//     { lat: 32.097990215000024, lng: 75.04082482900009 },
//     // ... continue all points ...
//     { lat: 32.332426605000094, lng: 75.29840293600006 }, // same as first to close the loop
//   ],
// ];

const punjabBounds = {
  north: 34.0,
  south: 27.5,
  west: 69.0,
  east: 75.5,
};

const MyMap = () => {
  const InitialCenterPosition = { lat: 31.1471, lng: 75.3412 };

  // const [isInRange, setIsInRange] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     const width = window.innerWidth;
  //     setIsInRange(width <= 768);
  //   };

  //   handleResize(); // Check on initial render
  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <>
      <div className="relative">
        <div className="absolute mb-3 left-14 top-2.5 z-10">
          <div className="w-[276px] bg-[#F8FAFB] h-full border-[#E5E7EB] border-[1.15px] rounded-[13.76px] p-[7px]">
            <Flex justify="between" className="mb-[7px]">
              <Text className="text-[#0A0E15] font-medium text-xs">
                Division Record
              </Text>

              <Flex className="gap-[5px]">
                <Image
                  src="/icons/square-arrow-shrink-01.svg"
                  alt="square-arrow-shrink-01"
                  width={20}
                  height={20}
                  style={{ width: "20px", height: "20px" }}
                />
                <RxCross2 size={20} />
              </Flex>
            </Flex>
            {/* accordion head */}
            <div className="px-2.5 py-[7px] rounded-[7.87px] bg-white border-[rgba(148,148,148,0.05)] border-[0.79px] shadow-[0_0_1.57px_0_rgba(0,0,0,0.15)]">
              <Flex justify="between">
                <Flex gap="2">
                  <Box className="w-[37.8px] h-[37.8px] rounded-[8.66px] p-[9.45px] bg-[rgba(138,32,20,0.1)] flex justify-center items-center">
                    <Image
                      src="/icons/warehouse.svg"
                      alt="warehouse"
                      width={21}
                      height={21}
                      style={{ width: "21px", height: "21px" }}
                    />
                  </Box>
                  <Box>
                    <Text weight="medium" className="mb-[5px] text-[13px]">
                      Sargodha
                    </Text>
                    <Text as="p" className="text-primary text-[10px]">
                      Capacity :<Text className="text-black">267,460 MT</Text>
                    </Text>
                    <Text as="p" className="text-primary text-[10px]">
                      Stock :<Text className="text-black">210,098 MT</Text>
                    </Text>
                  </Box>
                </Flex>
                <Text className="text-primary text-[10px]">43</Text>
              </Flex>
              <hr className="border-[#E3E3E3] text-[#E3E3E3] border-[1px] my-1" />
              <Flex justify="between" className="mb-[3px]">
                <Text weight="medium" className="text-[0.625rem]">
                  Enough stock available
                </Text>
                <Text
                  weight="medium"
                  className="text-[#6F6F6F] text-[0.625rem]"
                >
                  97%
                </Text>
              </Flex>
              <Box maxWidth="w-full">
                <Progress
                  size="3"
                  radius="full"
                  className="!bg-[#E0E0E0]  [&_.rt-ProgressIndicator]:!bg-[#198038]"
                  value={60}
                />
              </Box>
              {/* dropdown data */}
              <Text
                as="p"
                weight="medium"
                className="text-[0.625rem] py-1.5"
                mb="1"
              >
                District Record
              </Text>
              <Box>
                <Flex justify="between">
                  <Heading as="h6" weight="medium" className="!text-[0.813rem]">
                    Sargodha
                  </Heading>
                  <Text
                    weight="medium"
                    className="text-primary text-[0.625rem]"
                  >
                    43
                  </Text>
                </Flex>
                <Flex justify="between">
                  <Box>
                    <Text
                      weight="medium"
                      className="text-primary text-[0.625rem]"
                    >
                      Capacity:{" "}
                    </Text>
                    <Text weight="medium" className="text-[0.625rem]">
                      267,460 MT
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      weight="medium"
                      className="text-primary text-[0.625rem]"
                    >
                      Stock:{" "}
                    </Text>
                    <Text weight="medium" className="text-[0.625rem]">
                      210,098 MT
                    </Text>
                  </Box>
                </Flex>
                <hr className="border-[#E3E3E3] text-[#E3E3E3] border-[1px] my-1" />
              </Box>
            </div>
          </div>
          {/* <AccordionDemo /> */}
          <Accordion.Root
            type="single"
            collapsible
            className="w-[276px] px-2.5 py-[7px] rounded-[7.87px] bg-white border-[rgba(148,148,148,0.05)] border-[0.79px] shadow-[0_0_1.57px_0_rgba(0,0,0,0.15)]  transition-all duration-300"
            defaultValue="item-1"
          >
            <Accordion.Item value="item-1" className="border-b">
              <Accordion.Trigger className="w-full">
                <Flex justify="between">
                  <Flex gap="2">
                    <Box className="w-[37.8px] h-[37.8px] rounded-[8.66px] p-[9.45px] bg-[rgba(138,32,20,0.1)] flex justify-center items-center">
                      <Image
                        src="/icons/warehouse.svg"
                        alt="warehouse"
                        width={21}
                        height={21}
                        style={{ width: "21px", height: "21px" }}
                      />
                    </Box>
                    <Box>
                      <Text weight="medium" className="mb-[5px] text-[13px]">
                        Sargodha
                      </Text>
                      <Text as="p" className="text-primary text-[10px]">
                        Capacity :<Text className="text-black">267,460 MT</Text>
                      </Text>
                      <Text as="p" className="text-primary text-[10px]">
                        Stock :<Text className="text-black">210,098 MT</Text>
                      </Text>
                    </Box>
                  </Flex>
                  <Text className="text-primary text-[10px]">43</Text>
                </Flex>
                <hr className="border-[#E3E3E3] text-[#E3E3E3] border-[1px] my-1" />
                <Flex justify="between" className="mb-[3px]">
                  <Text weight="medium" className="text-[0.625rem]">
                    Enough stock available
                  </Text>
                  <Text
                    weight="medium"
                    className="text-[#6F6F6F] text-[0.625rem]"
                  >
                    97%
                  </Text>
                </Flex>
                <Box maxWidth="w-full">
                  <Progress
                    size="3"
                    radius="full"
                    className="!bg-[#E0E0E0]  [&_.rt-ProgressIndicator]:!bg-[#198038]"
                    value={60}
                  />
                </Box>
              </Accordion.Trigger>
              <Accordion.Content className="AccordionContent">
                <Text
                  as="p"
                  weight="medium"
                  className="text-[0.625rem] py-1.5"
                  mb="1"
                >
                  District Record
                </Text>
                <Box>
                  <Flex justify="between">
                    <Heading
                      as="h6"
                      weight="medium"
                      className="!text-[0.813rem]"
                    >
                      Sargodha
                    </Heading>
                    <Text
                      weight="medium"
                      className="text-primary text-[0.625rem]"
                    >
                      43
                    </Text>
                  </Flex>
                  <Flex justify="between">
                    <Box>
                      <Text
                        weight="medium"
                        className="text-primary text-[0.625rem]"
                      >
                        Capacity:{" "}
                      </Text>
                      <Text weight="medium" className="text-[0.625rem]">
                        267,460 MT
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        weight="medium"
                        className="text-primary text-[0.625rem]"
                      >
                        Stock:{" "}
                      </Text>
                      <Text weight="medium" className="text-[0.625rem]">
                        210,098 MT
                      </Text>
                    </Box>
                  </Flex>
                  <hr className="border-[#E3E3E3] text-[#E3E3E3] border-[1px] my-1" />
                </Box>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item value="item-2" className="border-b">
              <Accordion.Trigger className="w-full text-left px-4 py-2 font-medium hover:bg-gray-100">
                Item 2
              </Accordion.Trigger>
              <Accordion.Content className="px-4 py-2 text-sm text-gray-600">
                Content for Item 2
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item value="item-3">
              <Accordion.Trigger className="w-full text-left px-4 py-2 font-medium hover:bg-gray-100">
                Item 3
              </Accordion.Trigger>
              <Accordion.Content className="px-4 py-2 text-sm text-gray-600">
                Content for Item 3
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </div>
      </div>

      <APIProvider apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`}>
        <div
          className="shadow-sm"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {devmap && (
            <Map
              mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
              defaultZoom={7}
              defaultCenter={InitialCenterPosition}
              gestureHandling={"greedy"}
              style={{ borderRadius: "10px" }}
              restriction={{
                latLngBounds: punjabBounds,
                strictBounds: true,
              }}
            ></Map>
          )}
        </div>
      </APIProvider>
    </>
  );
};

export default MyMap;
