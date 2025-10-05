"use client";

import "@/app/_css/InfoWindow.css";
import { Division } from "@/app/page";
import provinces from "@/public/data/gadm41_PAK/gadm41_PAK_1.json";
import divisions from "@/public/data/gadm41_PAK/gadm41_PAK_2.json";
import districts from "@/public/data/gadm41_PAK/gadm41_PAK_3.json";
import * as Accordion from "@radix-ui/react-accordion";
import { Box, Flex, Heading, Progress, Text } from "@radix-ui/themes";
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  useMap,
} from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useEffect, useState } from "react";
import DistrictCard from "./Cards/DistrictCard";
import DivisionCard from "./Cards/DivisionCard";
import { Polygon } from "./polygon";
import { devmap } from "@/app/utils/utils";

// Shared base for geometry
interface PolygonGeometry {
  coords: google.maps.LatLngLiteral[][];
}

// Province

interface ProvinceProperties {
  GID_1: string;
  GID_0: string;
  COUNTRY: string;
  NAME_1: string;
  NL_NAME_1: string;
  VARNAME_1?: string;
  TYPE_1?: string;
  ENGTYPE_1?: string;
  CC_1?: string;
  HASC_1?: string;
}
interface ProvinceFeature extends PolygonGeometry {
  props: ProvinceProperties;
}

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
export interface DivisionFeature extends PolygonGeometry {
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

export interface DistrictFeature extends PolygonGeometry {
  props: DistrictProperties;
}

// ============ DUMMY JSON DATA
// Each godown has position, capacity, and available stock
interface Godown {
  position: {
    lat: number;
    lng: number;
  };
  capacity: number;
  availableStock: number;
}

export interface DistrictData {
  total: number;
  godowns: Godown[];
}

export interface DivisionData {
  total: number;
  districts: Record<string, DistrictData>;
}

// dummy data
const divisionData: Record<string, DivisionData> = {
  Rawalpindi: {
    total: 16,
    districts: {
      Rawalpindi: {
        total: 3,
        godowns: [
          {
            position: { lat: 33.5651, lng: 73.0169 },
            capacity: 100,
            availableStock: 1,
          },
          {
            position: { lat: 33.6007, lng: 73.0679 },
            capacity: 120,
            availableStock: 1,
          },
          {
            position: { lat: 33.6293, lng: 72.9863 },
            capacity: 80,
            availableStock: 1,
          },
        ],
      },
      Attock: {
        total: 5,
        godowns: [
          {
            position: { lat: 33.7664, lng: 72.3609 },
            capacity: 110,
            availableStock: 2,
          },
          {
            position: { lat: 33.7422, lng: 72.3987 },
            capacity: 95,
            availableStock: 1,
          },
          {
            position: { lat: 33.7756, lng: 72.3289 },
            capacity: 130,
            availableStock: 1,
          },
          {
            position: { lat: 33.7201, lng: 72.355 },
            capacity: 85,
            availableStock: 0,
          },
          {
            position: { lat: 33.7895, lng: 72.3821 },
            capacity: 140,
            availableStock: 1,
          },
        ],
      },
      Chakwal: {
        total: 8,
        godowns: [
          // Chakwal Tehsil
          {
            position: { lat: 32.9331, lng: 72.8539 },
            capacity: 100,
            availableStock: 2,
          },
          // Talagang Tehsil
          {
            position: { lat: 32.93, lng: 72.6 },
            capacity: 120,
            availableStock: 2,
          },
          // Choa Saidan Shah Tehsil
          {
            position: { lat: 32.95, lng: 72.95 },
            capacity: 80,
            availableStock: 2,
          },
          // Kallar Kahar Tehsil
          {
            position: { lat: 32.8, lng: 72.85 },
            capacity: 110,
            availableStock: 2,
          },
        ],
      },
    },
  },

  Lahore: {
    total: 20,
    districts: {
      Lahore: {
        total: 10,
        godowns: Array.from({ length: 10 }, (_, i) => ({
          position: { lat: 31.52 + i * 0.001, lng: 74.35 + i * 0.001 },
          capacity: 100,
          availableStock: 1,
        })),
      },
      Kasur: {
        total: 5,
        godowns: Array.from({ length: 5 }, (_, i) => ({
          position: { lat: 31.11 + i * 0.001, lng: 74.44 + i * 0.001 },
          capacity: 80,
          availableStock: 1,
        })),
      },
      Sheikhupura: {
        total: 3,
        godowns: Array.from({ length: 3 }, (_, i) => ({
          position: { lat: 31.71 + i * 0.001, lng: 73.97 + i * 0.001 },
          capacity: 90,
          availableStock: 1,
        })),
      },
      NankanaSahib: {
        total: 2,
        godowns: Array.from({ length: 2 }, (_, i) => ({
          position: { lat: 31.45 + i * 0.001, lng: 73.69 + i * 0.001 },
          capacity: 85,
          availableStock: 1,
        })),
      },
    },
  },

  Multan: {
    total: 12,
    districts: {
      Multan: {
        total: 5,
        godowns: [
          {
            position: { lat: 30.1575, lng: 71.5249 },
            capacity: 90,
            availableStock: 2,
          },
          {
            position: { lat: 30.19, lng: 71.47 },
            capacity: 100,
            availableStock: 1,
          },
          {
            position: { lat: 30.21, lng: 71.55 },
            capacity: 110,
            availableStock: 1,
          },
          {
            position: { lat: 30.16, lng: 71.5 },
            capacity: 80,
            availableStock: 1,
          },
          {
            position: { lat: 30.18, lng: 71.48 },
            capacity: 95,
            availableStock: 0,
          },
        ],
      },
      Khanewal: {
        total: 3,
        godowns: [
          {
            position: { lat: 30.3, lng: 71.93 },
            capacity: 100,
            availableStock: 1,
          },
          {
            position: { lat: 30.31, lng: 71.94 },
            capacity: 90,
            availableStock: 1,
          },
          {
            position: { lat: 30.32, lng: 71.95 },
            capacity: 80,
            availableStock: 1,
          },
        ],
      },
      Vehari: {
        total: 2,
        godowns: [
          {
            position: { lat: 30.05, lng: 72.35 },
            capacity: 110,
            availableStock: 1,
          },
          {
            position: { lat: 30.06, lng: 72.36 },
            capacity: 90,
            availableStock: 1,
          },
        ],
      },
      Lodhran: {
        total: 2,
        godowns: [
          {
            position: { lat: 29.53, lng: 71.63 },
            capacity: 100,
            availableStock: 1,
          },
          {
            position: { lat: 29.54, lng: 71.64 },
            capacity: 85,
            availableStock: 1,
          },
        ],
      },
    },
  },

  Gujranwala: {
    total: 15,
    districts: {
      Gujranwala: {
        total: 6,
        godowns: Array.from({ length: 6 }, (_, i) => ({
          position: { lat: 32.15 + i * 0.001, lng: 74.18 + i * 0.001 },
          capacity: 100,
          availableStock: 1,
        })),
      },
      Sialkot: {
        total: 5,
        godowns: Array.from({ length: 5 }, (_, i) => ({
          position: { lat: 32.5 + i * 0.001, lng: 74.55 + i * 0.001 },
          capacity: 90,
          availableStock: 1,
        })),
      },
      Narowal: {
        total: 2,
        godowns: Array.from({ length: 2 }, (_, i) => ({
          position: { lat: 32.1 + i * 0.001, lng: 74.87 + i * 0.001 },
          capacity: 85,
          availableStock: 1,
        })),
      },
      Hafizabad: {
        total: 2,
        godowns: Array.from({ length: 2 }, (_, i) => ({
          position: { lat: 32.07 + i * 0.001, lng: 73.68 + i * 0.001 },
          capacity: 95,
          availableStock: 1,
        })),
      },
    },
  },

  Sargodha: {
    total: 10,
    districts: {
      Sargodha: {
        total: 4,
        godowns: Array.from({ length: 4 }, (_, i) => ({
          position: { lat: 32.08 + i * 0.001, lng: 72.67 + i * 0.001 },
          capacity: 90,
          availableStock: 1,
        })),
      },
      Khushab: {
        total: 2,
        godowns: Array.from({ length: 2 }, (_, i) => ({
          position: { lat: 32.3 + i * 0.001, lng: 72.3 + i * 0.001 },
          capacity: 80,
          availableStock: 1,
        })),
      },
      Mianwali: {
        total: 2,
        godowns: Array.from({ length: 2 }, (_, i) => ({
          position: { lat: 32.58 + i * 0.001, lng: 71.53 + i * 0.001 },
          capacity: 85,
          availableStock: 1,
        })),
      },
      Bhakkar: {
        total: 2,
        godowns: Array.from({ length: 2 }, (_, i) => ({
          position: { lat: 31.62 + i * 0.001, lng: 71.07 + i * 0.001 },
          capacity: 100,
          availableStock: 1,
        })),
      },
    },
  },

  Bahawalpur: {
    total: 8,
    districts: {
      Bahawalpur: {
        total: 3,
        godowns: Array.from({ length: 3 }, (_, i) => ({
          position: { lat: 29.39 + i * 0.001, lng: 71.68 + i * 0.001 },
          capacity: 100,
          availableStock: 1,
        })),
      },
      Bahawalnagar: {
        total: 3,
        godowns: Array.from({ length: 3 }, (_, i) => ({
          position: { lat: 29.99 + i * 0.001, lng: 73.25 + i * 0.001 },
          capacity: 95,
          availableStock: 1,
        })),
      },
      RahimYarKhan: {
        total: 2,
        godowns: Array.from({ length: 2 }, (_, i) => ({
          position: { lat: 28.42 + i * 0.001, lng: 70.3 + i * 0.001 },
          capacity: 110,
          availableStock: 1,
        })),
      },
    },
  },

  DGKhan: {
    total: 7,
    districts: {
      DGKhan: {
        total: 3,
        godowns: Array.from({ length: 3 }, (_, i) => ({
          position: { lat: 30.05 + i * 0.001, lng: 70.64 + i * 0.001 },
          capacity: 95,
          availableStock: 1,
        })),
      },
      Layyah: {
        total: 2,
        godowns: Array.from({ length: 2 }, (_, i) => ({
          position: { lat: 30.96 + i * 0.001, lng: 70.94 + i * 0.001 },
          capacity: 85,
          availableStock: 1,
        })),
      },
      Muzaffargarh: {
        total: 2,
        godowns: Array.from({ length: 2 }, (_, i) => ({
          position: { lat: 30.07 + i * 0.001, lng: 71.19 + i * 0.001 },
          capacity: 100,
          availableStock: 1,
        })),
      },
    },
  },

  Sahiwal: {
    total: 6,
    districts: {
      Sahiwal: {
        total: 2,
        godowns: Array.from({ length: 2 }, (_, i) => ({
          position: { lat: 30.67 + i * 0.001, lng: 73.1 + i * 0.001 },
          capacity: 90,
          availableStock: 1,
        })),
      },
      Okara: {
        total: 2,
        godowns: Array.from({ length: 2 }, (_, i) => ({
          position: { lat: 30.81 + i * 0.001, lng: 73.45 + i * 0.001 },
          capacity: 100,
          availableStock: 1,
        })),
      },
      Pakpattan: {
        total: 2,
        godowns: Array.from({ length: 2 }, (_, i) => ({
          position: { lat: 30.35 + i * 0.001, lng: 73.39 + i * 0.001 },
          capacity: 85,
          availableStock: 1,
        })),
      },
    },
  },

  Gujrat: {
    total: 5,
    districts: {
      Gujrat: {
        total: 3,
        godowns: Array.from({ length: 3 }, (_, i) => ({
          position: { lat: 32.57 + i * 0.001, lng: 74.08 + i * 0.001 },
          capacity: 100,
          availableStock: 1,
        })),
      },
      MandiBahauddin: {
        total: 2,
        godowns: Array.from({ length: 2 }, (_, i) => ({
          position: { lat: 32.58 + i * 0.001, lng: 73.49 + i * 0.001 },
          capacity: 95,
          availableStock: 1,
        })),
      },
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

  const [punjabFeature, setPunjabFeature] = useState<ProvinceFeature | null>(
    null
  );

  const [divisionPolys, setDivisionPolys] = useState<DivisionFeature[]>([]);
  const [districtPolys, setDistrictPolys] = useState<DistrictFeature[]>([]);

  const [activeDivision, setActiveDivision] = useState<DivisionFeature | null>(
    null
  );

  const [hoveredDivision, setHoveredDivision] =
    useState<DivisionFeature | null>(null);

  const [hoveredPosition, setHoveredPosition] =
    useState<google.maps.LatLngLiteral | null>(null);

  const [hoveredDistrict, setHoveredDistrict] =
    useState<DistrictFeature | null>(null);
  const [hoveredDistrictPosition, setHoveredDistrictPosition] =
    useState<google.maps.LatLngLiteral | null>(null);

  const [activeDistrict, setActiveDistrict] = useState<DistrictFeature | null>(
    null
  );

  useEffect(() => {
    if (punjab) {
      // Compute punjabCoords if not already set
      const coords: google.maps.LatLngLiteral[][] =
        punjab.geometry.coordinates.map((polygon: number[][][]) =>
          polygon[0].map(([lng, lat]) => ({ lat, lng }))
        );
      setPunjabCoords(coords);

      // Now we can create punjabFeature using punjabCoords
      setPunjabFeature({
        props: punjab.properties,
        coords, // this is the same coords used to draw the polygon
      });
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

  // State to track hovered godown
  const [hoveredGodown, setHoveredGodown] = useState<{
    position: google.maps.LatLngLiteral;
    capacity: number;
    availableStock: number;
  } | null>(null);

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
                        value={division.stockPercent}
                        max={100}
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
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
            defaultZoom={10}
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
            })}

            {/* Card for hovered division */}
            {hoveredDivision && hoveredPosition && !activeDivision && (
              <InfoWindow
                position={hoveredPosition}
                onCloseClick={() => setHoveredDivision(null)}
              >
                <DivisionCard
                  division={hoveredDivision}
                  divisionData={divisionData[hoveredDivision.props.NAME_2!]}
                />
              </InfoWindow>
            )}

            {/* Districts (only inside active division) */}
            {activeDivision &&
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
                })}

            {hoveredDistrict && hoveredDistrictPosition && !activeDistrict && (
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
            )}

            {/* Divisions & District Polygons */}
            {activeDivision &&
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
                    {/* <Pin
                    background={hoveredGodown ? "#fff" : null}
                    borderColor={hoveredGodown ? "#fff" : null}
                    glyphColor={hoveredGodown ? "#0f677a" : null}
                  /> */}
                  </AdvancedMarker>
                ));
              })()}

            {/* Godown InfoWindow */}
            {hoveredGodown && (
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
            )}

            {punjabFeature && (
              <MapUpdater
                activeDivision={activeDivision}
                activeDistrict={activeDistrict}
                punjabFeature={punjabFeature}
              />
            )}
          </Map>
        )}
      </APIProvider>
    </div>
  );
};

export default PunjabMap;

const MapUpdater = ({
  activeDivision,
  activeDistrict,
  punjabFeature,
}: {
  activeDivision: DivisionFeature | null;
  activeDistrict: DistrictFeature | null;
  punjabFeature: ProvinceFeature | null;
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Define helper function inside useEffect
    const fitBounds = (coords: google.maps.LatLngLiteral[][]) => {
      const bounds = new google.maps.LatLngBounds();
      coords.forEach((polygon) =>
        polygon.forEach((point) => bounds.extend(point))
      );
      map.fitBounds(bounds);
    };

    if (activeDistrict) {
      fitBounds(activeDistrict.coords);
    } else if (activeDivision) {
      fitBounds(activeDivision.coords);
    } else if (punjabFeature) {
      // Punjab default view
      setTimeout(() => fitBounds(punjabFeature.coords), 50);
    }
  }, [map, activeDivision, activeDistrict, punjabFeature]);

  return null;
};
