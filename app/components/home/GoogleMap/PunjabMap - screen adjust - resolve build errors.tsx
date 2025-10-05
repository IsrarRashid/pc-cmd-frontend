"use client";

import provinces from "@/public/data/gadm41_PAK/gadm41_PAK_1.json";
import divisions from "@/public/data/gadm41_PAK/gadm41_PAK_2.json";
import districts from "@/public/data/gadm41_PAK/gadm41_PAK_3.json";
import * as Accordion from "@radix-ui/react-accordion";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Polygon } from "./polygon";
import { Flex, Box, Progress, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { Division } from "@/app/page";
import { devmap } from "@/app/utils/utils";

// Shared base for geometry
interface PolygonGeometry {
  coords: google.maps.LatLngLiteral[][];
}

// Province
// interface ProvinceProperties {
//   GID_1: string;
//   GID_0: string;
//   COUNTRY: string;
//   NAME_1: string;
//   NL_NAME_1: string;
//   VARNAME_1?: string;
//   TYPE_1?: string;
//   ENGTYPE_1?: string;
//   CC_1?: string;
//   HASC_1?: string;
// }
// interface ProvinceFeature extends PolygonGeometry {
//   props: ProvinceProperties;
// }

// Division
interface DivisionProperties {
  GID_2: string;
  GID_0: string;
  COUNTRY: string;
  GID_1: string;
  NAME_1: string;
  NL_NAME_1: string;
  NAME_2: string;
  VARNAME_2: string;
  NL_NAME_2: string;
  TYPE_2: string;
  ENGTYPE_2: string;
  CC_2: string;
  HASC_2: string;
}
interface DivisionFeature extends PolygonGeometry {
  props: DivisionProperties;
}

// District
interface DistrictProperties {
  GID_3: string;
  GID_0: string;
  COUNTRY: string;
  GID_1: string;
  NAME_1: string;
  NAME_2: string;
  NAME_3: string;
  TYPE_3: string;
  ENGTYPE_3: string;
  CC_3: string;
  HASC_3: string;
}
interface DistrictFeature extends PolygonGeometry {
  props: DistrictProperties;
}

// dummy data
const divisionData: Record<
  string,
  { total: number; districts: Record<string, number> }
> = {
  Lahore: {
    total: 20,
    districts: {
      Lahore: 10,
      Kasur: 5,
      Sheikhupura: 3,
      NankanaSahib: 2,
    },
  },
  Faisalabad: {
    total: 10,
    districts: {
      Faisalabad: 5,
      Jhang: 2,
      TobaTekSingh: 2,
      Chiniot: 1,
    },
  },
  Multan: {
    total: 4,
    districts: {
      Multan: 2,
      Khanewal: 1,
      Lodhran: 1,
    },
  },
  Gujranwala: {
    total: 15,
    districts: {
      Gujranwala: 4,
      Sialkot: 4,
      Narowal: 2,
      Hafizabad: 2,
      MandiBahauddin: 3,
    },
  },
  Sargodha: {
    total: 6,
    districts: {
      Sargodha: 2,
      Khushab: 1,
      Mianwali: 2,
      Bhakkar: 1,
    },
  },
  Rawalpindi: {
    total: 3,
    districts: {
      Rawalpindi: 1,
      Attock: 1,
      Chakwal: 1,
    },
  },
  Bahawalpur: {
    total: 40,
    districts: {
      Bahawalpur: 25,
      Bahawalnagar: 11,
      RahimYarKhan: 4,
    },
  },
  DeraGhaziKhan: {
    total: 7,
    districts: {
      DeraGhaziKhan: 2,
      Rajanpur: 2,
      Muzaffargarh: 2,
      Layyah: 1,
    },
  },
  Sahiwal: {
    total: 9,
    districts: {
      Sahiwal: 3,
      Okara: 3,
      Pakpattan: 3,
    },
  },
  Gujrat: {
    total: 13,
    districts: {
      Gujrat: 5,
      MandiBahauddin: 3,
      Hafizabad: 2,
      Narowal: 3,
    },
  },
};

// --- Helper for colors ---
const getColor = (price: number) => {
  if (price < 5) return "red";
  if (price <= 10) return "yellow";
  return "green";
};

const punjab = provinces.features.find((f) => f.properties.NAME_1 === "Punjab");

const punjabDivisions = divisions.features.filter(
  (f) => f.properties.NAME_1 === "Punjab"
);

const punjabDistricts = districts.features.filter(
  (f) => f.properties.NAME_1 === "Punjab"
);

const extraDivisions = punjabDistricts
  .filter(
    (d) => d.properties.NAME_3 === "Gujrat" || d.properties.NAME_3 === "Sahiwal"
  )
  .map((d) => ({
    ...d,
    properties: {
      ...d.properties,
      NAME_2: d.properties.NAME_3,
      TYPE_2: "Division",
    },
  }));

const punjabDivisionsFixed = [...punjabDivisions, ...extraDivisions];

const PunjabMap = ({ divisions }: { divisions: Division[] }) => {
  const [punjabCoords, setPunjabCoords] =
    useState<google.maps.LatLngLiteral[][]>();

  const [divisionPolys, setDivisionPolys] = useState<DivisionFeature[]>([]);
  const [districtPolys, setDistrictPolys] = useState<DistrictFeature[]>([]);

  const [activeDivision, setActiveDivision] = useState<DivisionFeature | null>(
    null
  );

  useEffect(() => {
    if (punjab) {
      const punjabCoords: google.maps.LatLngLiteral[][] =
        punjab.geometry.coordinates.map((polygon: number[][][]) =>
          polygon[0].map(([lng, lat]) => ({ lat, lng }))
        );
      setPunjabCoords(punjabCoords);
    }

    // division polygons with props
    const divisionFeatures: DivisionFeature[] = punjabDivisionsFixed.map(
      (division) => ({
        coords: division.geometry.coordinates.map((polygon: number[][][]) =>
          polygon[0].map(([lng, lat]) => ({ lat, lng }))
        ),
        props: division.properties as DivisionProperties, // <-- cast if needed
      })
    );
    setDivisionPolys(divisionFeatures);

    // district polygons with props
    const districtFeatures: DistrictFeature[] = punjabDistricts.map(
      (district) => ({
        coords: district.geometry.coordinates.map((polygon: number[][][]) =>
          polygon[0].map(([lng, lat]) => ({ lat, lng }))
        ),
        props: district.properties as DistrictProperties,
      })
    );
    setDistrictPolys(districtFeatures);
  }, []);

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
              {divisions.map((division, i) => (
                <Accordion.Item
                  value={division.division + i}
                  key={i}
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
                          <Text
                            weight="medium"
                            className="mb-[5px] text-[13px]"
                          >
                            {division.division}
                          </Text>
                          <Text as="p" className="text-primary text-[10px]">
                            Capacity :
                            <Text className="text-black">
                              {division.capacity} MT
                            </Text>
                          </Text>
                          <Text as="p" className="text-primary text-[10px]">
                            Stock :
                            <Text className="text-black">
                              {division.stock} MT
                            </Text>
                          </Text>
                        </Box>
                      </Flex>
                      {/* <Text className="text-primary text-[10px]">43</Text> */}
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
                        {division.stockPercent}%
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
                    {division.districts.map((district, i) => (
                      <Box key={i}>
                        <Flex justify="between">
                          <Heading
                            as="h6"
                            weight="medium"
                            className="!text-[0.813rem]"
                          >
                            {district.name}
                          </Heading>
                          <Text
                            weight="medium"
                            className="text-primary text-[0.625rem]"
                          >
                            {district.stockPercent}%
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
                              {district.capacity} MT
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
                              {district.stock} MT
                            </Text>
                          </Box>
                        </Flex>
                        <hr className="border-[#E3E3E3] text-[#E3E3E3] border-[1px] my-1" />
                      </Box>
                    ))}
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </div>
          </Accordion.Root>
        </div>
      </div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}>
        {devmap && (
          <Map
            defaultZoom={6.4}
            defaultCenter={{ lat: 31.17, lng: 72.7097 }}
            gestureHandling="greedy"
            style={{ width: "100%", height: `calc(100vh - 200px)` }}
          >
            {/* Province outline */}
            {punjabCoords && (
              <Polygon
                paths={punjabCoords}
                strokeColor="#0c4cb3"
                strokeOpacity={1}
                strokeWeight={2}
                fillColor="#3b82f6"
                fillOpacity={0}
              />
            )}

            {/* Divisions */}
            {divisionPolys.map((d, i) => {
              const divisionName = d.props.NAME_2;
              const price = divisionData[divisionName!]?.total ?? 0;
              return (
                <Polygon
                  key={i}
                  paths={d.coords}
                  strokeColor="#16a34a"
                  strokeOpacity={0.9}
                  strokeWeight={1}
                  fillColor={getColor(price)}
                  fillOpacity={0.4}
                  onClick={() => setActiveDivision(d)}
                />
              );
            })}

            {/* Districts (only inside active division) */}
            {activeDivision &&
              districtPolys
                .filter(
                  (dist) => dist.props.NAME_2 === activeDivision.props.NAME_2
                )
                .map((d, i) => {
                  const districtName = d.props.NAME_3;
                  const price =
                    divisionData[activeDivision.props.NAME_2!]?.districts[
                      districtName!
                    ] ?? 0;
                  return (
                    <Polygon
                      key={i}
                      paths={d.coords}
                      strokeColor="#cfa015"
                      strokeOpacity={0.9}
                      strokeWeight={1}
                      fillColor={getColor(price)}
                      fillOpacity={0.4}
                    />
                  );
                })}

            <MapUpdater activeDivision={activeDivision} />
          </Map>
        )}
      </APIProvider>
    </div>
  );
};

export default PunjabMap;

const MapUpdater = ({
  activeDivision,
}: {
  activeDivision: DivisionFeature | null;
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (activeDivision) {
      const bounds = new google.maps.LatLngBounds();
      activeDivision.coords.forEach((polygon) =>
        polygon.forEach((point) => bounds.extend(point))
      );
      map.fitBounds(bounds);
    } else {
      map.panTo({ lat: 31.1704, lng: 72.7097 });
      map.setZoom(6.4);
    }
  }, [map, activeDivision]);

  return null;
};
