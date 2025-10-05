"use client";

import { devmap } from "@/app/utils/utils";
import pakistanGeo from "@/public/data/gadm41_PAK/gadm41_PAK_0.json";
import provinces from "@/public/data/gadm41_PAK/gadm41_PAK_1.json";
import divisions from "@/public/data/gadm41_PAK/gadm41_PAK_2.json";
import districts from "@/public/data/gadm41_PAK/gadm41_PAK_3.json";
import * as Accordion from "@radix-ui/react-accordion";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Image from "next/image";
import DistrictsArea, { GeoJSONDistricts } from "./DistrictsArea";
import PakistanArea, { GeoJSONPakistan } from "./PakistanArea";
import ProvincesArea, { GeoJSONProvinces } from "./ProvincesArea";
import DivisionsArea, { GeoJSONDivisions } from "./DivisionsArea";

const PakistanMap = () => {
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
          >
            <PakistanArea geoData={pakistanGeo as GeoJSONPakistan} />
            <ProvincesArea geoData={provinces as GeoJSONProvinces} />
            <DivisionsArea geoData={divisions as GeoJSONDivisions} />
            <DistrictsArea geoData={districts as GeoJSONDistricts} />

            {/* Pakistan outline */}
            {/* {punjabCoords && (
              <Polygon
                paths={punjabCoords}
                strokeColor="#0c4cb3"
                strokeOpacity={1}
                strokeWeight={2}
                fillColor="#3b82f6"
                fillOpacity={0}
              />
            )} */}

            {/* Divisions */}
            {/* {divisionPolys.map((d, i) => {
              const divisionName = d.props.NAME_2;
              const price = divisionData[divisionName!]?.total ?? 0;
              // Compute a center for the polygon to position the InfoWindow
              const center: google.maps.LatLngLiteral = {
                lat: d.coords[0][0].lat,
                lng: d.coords[0][0].lng,
              };
              return (
                <Polygon
                  key={i}
                  paths={d.coords}
                  strokeColor="#16a34a"
                  strokeOpacity={0.9}
                  strokeWeight={d === activeDivision ? 10 : 1}
                  fillColor={d === activeDivision ? "" : getColor(price)} // <-- hide fill if active
                  fillOpacity={d === activeDivision ? 0 : 1}
                  onClick={() => setActiveDivision(d)}
                  onMouseOver={() => {
                    setHoveredDivision(d);
                    setHoveredPosition(center);
                  }}
                  onMouseOut={() => {
                    setHoveredDivision(null);
                    setHoveredPosition(null);
                  }}
                />
              );
            })} */}

            {/* Card for hovered division */}
            {/* {hoveredDivision && hoveredPosition && !activeDivision && (
              <InfoWindow
                position={hoveredPosition}
                onCloseClick={() => setHoveredDivision(null)}
              >
                <DivisionCard
                  division={hoveredDivision}
                  divisionData={divisionData[hoveredDivision.props.NAME_2!]}
                />
              </InfoWindow>
            )} */}

            {/* Districts (only inside active division) */}
            {/* {activeDivision &&
              districtPolys
                .filter(
                  (dist) => dist.props.NAME_2 === activeDivision.props.NAME_2
                )
                .map((d, i) => {
                  const districtName = d.props.NAME_3;

                  // Compute center for InfoWindow
                  const center: google.maps.LatLngLiteral = {
                    lat: d.coords[0][0].lat,
                    lng: d.coords[0][0].lng,
                  };

                  const districtValue =
                    divisionData[activeDivision.props.NAME_2!]?.districts[
                      districtName!
                    ];

                  const price = districtValue ? districtValue.total : 0;

                  return (
                    <Polygon
                      key={i}
                      paths={d.coords}
                      strokeColor="#cfa015"
                      strokeOpacity={0.9}
                      strokeWeight={d === activeDistrict ? 10 : 1}
                      fillColor={getColor(price)}
                      fillOpacity={0.4}
                      onClick={() => setActiveDistrict(d)}
                      onMouseOver={() => {
                        setHoveredDistrict(d);
                        setHoveredDistrictPosition(center);
                      }}
                      onMouseOut={() => {
                        setHoveredDistrict(null);
                        setHoveredDistrictPosition(null);
                      }}
                    />
                  );
                })} */}

            {/* {hoveredDistrict && hoveredDistrictPosition && !activeDistrict && (
              <InfoWindow
                position={hoveredDistrictPosition}
                onCloseClick={() => setHoveredDistrict(null)}
              >
                <DistrictCard
                  district={hoveredDistrict}
                  districtData={
                    divisionData[activeDivision!.props.NAME_2!]?.districts[
                      hoveredDistrict.props.NAME_3!
                    ] ?? { total: 0, godowns: [] } // fallback DistrictData
                  }
                />
              </InfoWindow>
            )} */}

            {/* Divisions & District Polygons */}
            {/* {activeDivision &&
              activeDistrict &&
              (() => {
                const districtName = activeDistrict.props.NAME_3;
                const godowns =
                  divisionData[activeDivision.props.NAME_2!]?.districts[
                    districtName!
                  ]?.godowns ?? [];

                return godowns.map((godown, i) => (
                  <AdvancedMarker
                    key={i}
                    position={godown.position}
                    title={`Stock: ${godown.availableStock} / Capacity: ${godown.capacity}`}
                    onMouseEnter={() => setHoveredGodown(godown)}
                    onMouseLeave={() => setHoveredGodown(null)}
                  >
                  </AdvancedMarker>
                ));
              })()} */}

            {/* Godown InfoWindow */}
            {/* {hoveredGodown && (
              <InfoWindow
                position={hoveredGodown.position}
                onCloseClick={() => setHoveredGodown(null)}
                pixelOffset={[0, -60]}
              >
                <div
                  className="border-0 bg-white p-2 rounded"
                  style={{ minWidth: "150px" }}
                >
                  <p className="m-0 font-medium">
                    Stock: {hoveredGodown.availableStock}
                  </p>
                  <p className="m-0 font-medium">
                    Capacity: {hoveredGodown.capacity}
                  </p>
                </div>
              </InfoWindow>
            )} */}

            {/* {punjabFeature && (
              <MapUpdater
                activeDivision={activeDivision}
                activeDistrict={activeDistrict}
                punjabFeature={punjabFeature}
              />
            )} */}
          </Map>
        )}
      </APIProvider>
    </div>
  );
};

export default PakistanMap;
