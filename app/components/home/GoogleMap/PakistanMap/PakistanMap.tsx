"use client";

import { devmap } from "@/app/utils/utils";
import pakistanGeo from "@/public/data/gadm41_PAK/gadm41_PAK_0.json";
import provinces from "@/public/data/gadm41_PAK/gadm41_PAK_1.json";
import divisions from "@/public/data/gadm41_PAK/gadm41_PAK_2.json";
import districts from "@/public/data/gadm41_PAK/gadm41_PAK_3.json";
import * as Accordion from "@radix-ui/react-accordion";
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Image from "next/image";
import DistrictsArea, { GeoJSONDistricts } from "./DistrictsArea";
import PakistanArea, { GeoJSONPakistan } from "./PakistanArea";
import ProvincesArea, {
  ProvinceFeature,
  GeoJSONProvinces,
} from "./ProvincesArea";
import DivisionsArea, {
  DivisionFeature,
  GeoJSONDivisions,
} from "./DivisionsArea";
import { useState } from "react";

const PakistanMap = () => {
  const [selectedProvince, setSelectedProvince] =
    useState<ProvinceFeature | null>(null);

  const [selectedDivision, setSelectedDivision] =
    useState<DivisionFeature | null>(null);

  return (
    <div className="h-full">
      <div className="relative">
        <div className="absolute mb-3 left-2.5 top-14 z-10">
          <Accordion.Root
            type="single"
            collapsible
            className="w-[276px] px-2.5 py-[7px] rounded-[7.87px] bg-white border-[rgba(148,148,148,0.05)] border-[0.79px] shadow-[0_0_1.57px_0_rgba(0,0,0,0.15)]  transition-all duration-300"
            // defaultValue="item-1"
          >
            <div
              style={{ maxHeight: `calc(100vh - 280px)` }}
              className="overflow-y-auto"
            >
              <Accordion.Item
                value="asd"
                className="border-b hover:bg-gray-50 transition-colors duration-300 rounded-tr-[8.66px] rounded-tl-[8.66px] "
              >
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
                          division.division
                        </Text>
                        <Text as="p" className="text-primary text-[10px]">
                          Capacity :
                          <Text className="text-black">division.capacity</Text>
                        </Text>
                        <Text as="p" className="text-primary text-[10px]">
                          Stock :
                          <Text className="text-black">division.stock MT</Text>
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
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
                        district.name
                      </Heading>
                      <Text
                        weight="medium"
                        className="text-primary text-[0.625rem]"
                      >
                        district.stockPercent%
                      </Text>
                    </Flex>
                  </Box>
                </Accordion.Content>
              </Accordion.Item>
            </div>
          </Accordion.Root>
        </div>
        <div className="absolute mb-3 left-2.5 top-14 z-10">
          {selectedProvince && !selectedDivision && (
            <Button onClick={() => setSelectedProvince(null)}>
              Back to Pakistan
            </Button>
          )}
          {selectedProvince && selectedDivision && (
            <Button onClick={() => setSelectedDivision(null)}>
              Back to Division
            </Button>
          )}
        </div>
      </div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}>
        {devmap && (
          <Map
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
            defaultZoom={10}
            defaultCenter={{ lat: 31.17, lng: 72.7097 }}
            gestureHandling="greedy"
            style={{ width: "100%", height: `calc(100vh - 200px)` }}
            mapTypeId="satellite"
            zoomControl={true}
          >
            <PakistanArea
              geoData={pakistanGeo as GeoJSONPakistan}
              selectedProvince={selectedProvince}
            />
            <ProvincesArea
              geoData={provinces as GeoJSONProvinces}
              selectedProvince={selectedProvince}
              onProvinceClick={(province) => setSelectedProvince(province)}
            />
            <DivisionsArea
              geoData={divisions as GeoJSONDivisions}
              selectedProvince={selectedProvince}
              selectedDivision={selectedDivision}
              onDivisionClick={(division) => setSelectedDivision(division)}
            />
            <DistrictsArea
              geoData={districts as GeoJSONDistricts}
              selectedDivision={selectedDivision}
            />
          </Map>
        )}
      </APIProvider>
    </div>
  );
};

export default PakistanMap;
