"use client";

import CustomSelect, {
  defaultOption,
} from "@/app/components/Form/CustomSelect";
import MyThinBarChart, {
  ChartType,
} from "@/app/components/charts/MyThinBarChart";
import { DivisionProduction, ProductionDashboard, Province } from "@/app/page";
import { devmap } from "@/app/utils/utils";
import pakistanGeo from "@/public/data/gadm41_PAK/gadm41_PAK_0.json";
import provinces from "@/public/data/gadm41_PAK/gadm41_PAK_1.json";
import oldDivisions from "@/public/data/gadm41_PAK/gadm41_PAK_2.json";
import districts from "@/public/data/gadm41_PAK/gadm41_PAK_3.json";
import * as Accordion from "@radix-ui/react-accordion";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Table,
  Text,
} from "@radix-ui/themes";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import classnames from "classnames";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdFullscreen } from "react-icons/md";
import { RiFullscreenExitFill } from "react-icons/ri";
import CustomLineChart, {
  LineChartData,
} from "../../../charts/CustomLineChart";
import DivisionsArea, {
  DivisionFeature,
  GeoJSONDivisions,
} from "./DivisionsArea";
import MapWrapper from "./MapWrapper";
import ProvincesArea, {
  GeoJSONProvinces,
  ProvinceFeature,
} from "./ProvincesArea";
import DistrictsArea, { GeoJSONDistricts } from "./DistrictsArea";
import TrackingArea from "./TrackingArea";
import PakistanArea, { GeoJSONPakistan } from "./PakistanArea";

//========= for Adding two more divisions in punjab division
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

const punjabDivisions = oldDivisions.features.filter(
  (f) => f.properties.NAME_1 === "Punjab"
);

const punjabDivisionsFixed = [...punjabDivisions, ...extraDivisions];

const divisions = {
  ...oldDivisions,
  features: [
    ...oldDivisions.features.filter((f) => f.properties.NAME_1 !== "Punjab"),
    ...punjabDivisionsFixed,
  ],
};

//========= for updateing oldDivisions boundary punjab division
// const multanFeature = oldDivisions.features.find(
//   (f) => f.properties.NAME_2 === "Multan"
// );

// const sahiwalFeature = punjabDistricts.find(
//   (d) => d.properties.NAME_3 === "Sahiwal"
// );

const PakistanMap = ({
  productionDashboardData,
}: {
  productionDashboardData: ProductionDashboard;
}) => {
  const [selectedProvince, setSelectedProvince] =
    useState<ProvinceFeature | null>(null);

  const [selectedDivision, setSelectedDivision] =
    useState<DivisionFeature | null>(null);

  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [showGraph, setShowGraph] = useState<boolean>(false);

  //=========API Data
  const [specificProvince, setSpecificProvince] = useState<Province>();
  const [specificDivision, setSpecificDivision] =
    useState<DivisionProduction>();

  useEffect(() => {
    if (selectedProvince) {
      const specificProvince =
        productionDashboardData.countryProduction?.provinces?.find(
          (province) =>
            province.provinceName === selectedProvince.properties.NAME_1
        );
      setSpecificProvince(specificProvince);
    }
  }, [selectedProvince, productionDashboardData]);

  useEffect(() => {
    if (selectedDivision && specificProvince) {
      const specificDivision = specificProvince.divisions.find(
        (division) =>
          division.divisionName === selectedDivision.properties.NAME_2
      );

      setSpecificDivision(specificDivision);
    }
  }, [selectedDivision, specificProvince]);

  const items = [
    {
      id: 0,
      imagePath: "/icons/noto_onion.png",
    },
    {
      id: 1,
      imagePath: "/icons/emojione_sheaf-of-rice.png",
    },
    {
      id: 2,
      imagePath: "/icons/emojione_tomato.png",
    },
    {
      id: 3,
      imagePath: "/icons/noto_potato.png",
    },
    {
      id: 4,
      imagePath: "/icons/twemoji_cooked-rice.png",
    },
  ];

  // const yearOptions = [{ year: "2024-2025 }, { year: "2026-2027" }].map(
  //   (year) => {
  //     return {
  //       value: year,
  //       label: year,
  //     };
  //   }
  // );

  const yearOptions = [{ year: "2024-2025" }].map((year) => {
    return {
      value: year.year,
      label: year.year,
    };
  });

  const divisionOptions = [
    { divisionName: "Lahore" },
    { divisionName: "Kasur" },
    { divisionName: "Nankana Sahib" },
    { divisionName: "Sheikhupura" },
  ].map((division) => {
    return {
      value: division.divisionName,
      label: division.divisionName,
    };
  });

  const districtOptions = [
    { districtName: "Okara" },
    { districtName: "Sahiwal" },
    { districtName: "Sargodha" },
  ].map((district) => {
    return {
      value: district.districtName,
      label: district.districtName,
    };
  });

  // const lineChartData = data?.map((d) => ({
  //   label: d.name,
  //   value: d.count,
  // }));

  const tinyBarChartData: ChartType[] = [
    {
      label: "Punjab",
      value: productionDashboardData.seasonCycle.punjabProduction,
      season: productionDashboardData.seasonCycle.punjabSession,
      percentage: productionDashboardData.seasonCycle.punjabPercentage,
      color: "#f0f036",
    },
    {
      label: "Sindh",
      value: productionDashboardData.seasonCycle.sindhProduction,
      season: productionDashboardData.seasonCycle.sindhSession,
      percentage: productionDashboardData.seasonCycle.sindhPercentage,
      color: "#e61313",
    },
    {
      label: "Balochistan",
      value: productionDashboardData.seasonCycle.balochistanProduction,
      season: productionDashboardData.seasonCycle.balochistanSession,
      percentage: productionDashboardData.seasonCycle.balochistanPercentage,
      color: "#B8885A",
    },

    {
      label: "KPK",
      value: productionDashboardData.seasonCycle.kpkProduction,
      season: productionDashboardData.seasonCycle.kpkSession,
      percentage: productionDashboardData.seasonCycle.kpkPercentage,
      color: "#37b5ef",
    },
  ];

  const handleProvinceSelect = (provinceName: string) => {
    // Find the province object from your GeoJSON data
    const foundProvince = (provinces as GeoJSONProvinces).features.find(
      (feature) => feature.properties.NAME_1 === provinceName
    );

    if (foundProvince) {
      setSelectedProvince(foundProvince);
    }
  };

  // 🔹 Prepare data only once
  const lineChartData: LineChartData[] = useMemo(() => {
    if (!productionDashboardData?.topSupplyChains) return [];

    const topSupplyChains = productionDashboardData.topSupplyChains;

    // assume first 5 provinces (red, green, blue, cyan, orange)
    const [p1, p2, p3, p4, p5] = topSupplyChains;

    // collect all unique dates
    const allDates = [
      ...new Set(
        topSupplyChains.flatMap((p) => p.dataPoints.map((d) => d.date))
      ),
    ].sort();

    // merge by date into single array
    return allDates.map((date) => ({
      label: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      redLine: p1?.dataPoints.find((d) => d.date === date)?.quantity || 0,
      greenLine: p2?.dataPoints.find((d) => d.date === date)?.quantity || 0,
      blueLine: p3?.dataPoints.find((d) => d.date === date)?.quantity || 0,
      cyanLine: p4?.dataPoints.find((d) => d.date === date)?.quantity || 0,
      orangeLine: p5?.dataPoints.find((d) => d.date === date)?.quantity || 0,
    }));
  }, [productionDashboardData]);

  // line chart dummy data
  //   const lineChartData = [
  //   { label: "Mon", redLine: 10, greenLine: 15, blueLine: 8, cyanLine: 5, orangeLine: 12 },
  //   { label: "Tue", redLine: 20, greenLine: 25, blueLine: 18, cyanLine: 10, orangeLine: 22 },
  //   { label: "Wed", redLine: 15, greenLine: 18, blueLine: 12, cyanLine: 8, orangeLine: 16 },
  //   { label: "Thu", redLine: 25, greenLine: 30, blueLine: 20, cyanLine: 15, orangeLine: 26 },
  //   { label: "Fri", redLine: 18, greenLine: 22, blueLine: 16, cyanLine: 12, orangeLine: 20 },
  // ];

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // Cleanup listener on unmount
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    const wrapper = document.getElementById("map-wrapper");
    if (!document.fullscreenElement) {
      wrapper?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="relative w-full h-full">
      <div id="map-wrapper" className="relative w-full h-full mb-3">
        <div className="absolute mb-3 left-2.5 top-14 z-10">
          <Accordion.Root
            type="single"
            collapsible
            className="w-[305px] p-2.5 rounded-[10px] bg-white transition-all duration-300"
            // defaultValue="item-1"
          >
            <div
              style={{ maxHeight: `calc(100vh - 280px)` }}
              className="overflow-y-auto"
            >
              <Accordion.Item
                value="asd"
                className="rounded-tr-[8.66px] rounded-tl-[8.66px] "
              >
                <Accordion.Trigger className="group w-full hover:bg-gray-50 transition-colors duration-300 ">
                  <Box className="border-[1px] border-[#D0D5DD] rounded-lg py-[7px] px-[14px]">
                    <Flex justify="between" align="center" gap="2">
                      <Flex align="center" gap="2">
                        <Avatar
                          src="/images/user.png"
                          fallback="/images/dp1.png"
                          radius="full"
                          size="2"
                        />
                        <Text className="!text-[#101828]">Name</Text>
                      </Flex>
                      <IoChevronDownOutline
                        size={20}
                        className="transition-transform duration-300 group-data-[state=open]:rotate-180 text-[#667085]"
                      />
                    </Flex>
                  </Box>
                </Accordion.Trigger>
                <Accordion.Content className="AccordionContent">
                  <Box className="border-[1.44px] border-[#D4D4D4] rounded-[14px] pt-1.5 px-2 pb-1 my-[5px]">
                    <Flex justify="between" align="center" gap="2">
                      {items.map((item) => (
                        <IconButton
                          key={item.id}
                          className={classnames({
                            "!w-[47px] !h-[47px] !rounded-[6px] !p-[13px] !transition-all !duration-200":
                              true,
                            "!text-white !bg-[rgba(170,60,49,0.1)] !border-[1.44px] !border-[#AA3C31] ":
                              selectedItem === item.id,
                            " !bg-transparent": selectedItem !== item.id,
                          })}
                          onClick={() => setSelectedItem(item.id)}
                        >
                          <Image
                            src={item.imagePath}
                            alt={item.imagePath}
                            width={23}
                            height={23}
                          />
                        </IconButton>
                      ))}
                    </Flex>
                  </Box>
                  <Box className="!mb-[5px] px-0.5">
                    <CustomSelect
                      options={[defaultOption, ...yearOptions]}
                      isDisabled={true}
                      id="years"
                      defaultValue={yearOptions[0]}
                      placeholder="Select Year"
                      closeMenuOnSelect={true}
                      // value={
                      //   smdpIdentifierOptions.find(
                      //     (opt) => opt.value === formData.smdpIdentifier
                      //   )
                      //     ? [
                      //         smdpIdentifierOptions.find(
                      //           (opt) => opt.value === formData.smdpIdentifier
                      //         )!,
                      //       ]
                      //     : null
                      // }
                      // onChangeSingle={(nv, meta) =>
                      //   handleSelectChange("smdpIdentifier", nv, meta, setFormData)
                      // }
                    />
                  </Box>
                  <Box className="!mb-[5px] px-0.5">
                    <CustomSelect
                      options={[defaultOption, ...divisionOptions]}
                      id="division"
                      placeholder="Select Division"
                      closeMenuOnSelect={true}
                      // value={
                      //   smdpIdentifierOptions.find(
                      //     (opt) => opt.value === formData.smdpIdentifier
                      //   )
                      //     ? [
                      //         smdpIdentifierOptions.find(
                      //           (opt) => opt.value === formData.smdpIdentifier
                      //         )!,
                      //       ]
                      //     : null
                      // }
                      // onChangeSingle={(nv, meta) =>
                      //   handleSelectChange("smdpIdentifier", nv, meta, setFormData)
                      // }
                    />
                  </Box>
                  <Box className="!mb-[5px] px-0.5">
                    <CustomSelect
                      options={[defaultOption, ...districtOptions]}
                      id="district"
                      placeholder="Select District"
                      closeMenuOnSelect={true}
                      // value={
                      //   smdpIdentifierOptions.find(
                      //     (opt) => opt.value === formData.smdpIdentifier
                      //   )
                      //     ? [
                      //         smdpIdentifierOptions.find(
                      //           (opt) => opt.value === formData.smdpIdentifier
                      //         )!,
                      //       ]
                      //     : null
                      // }
                      // onChangeSingle={(nv, meta) =>
                      //   handleSelectChange("smdpIdentifier", nv, meta, setFormData)
                      // }
                    />
                  </Box>
                </Accordion.Content>
              </Accordion.Item>
            </div>
          </Accordion.Root>
        </div>
        <div className="absolute mb-3 right-14 top-2.5 z-10">
          {selectedProvince && !selectedDivision && (
            <Button
              className="!bg-primary"
              onClick={() => setSelectedProvince(null)}
            >
              Back to Provinces
            </Button>
          )}
          {selectedProvince && selectedDivision && (
            <Button
              className="!bg-primary"
              onClick={() => setSelectedDivision(null)}
            >
              Back to Divisions
            </Button>
          )}
        </div>
        <div className="absolute mb-3 right-2.5 top-14 z-10">
          {!selectedProvince && !selectedDivision && (
            <Box className="w-[277px] !bg-white !rounded-[10px] border-[1px] border-[#E6E6E6] pt-[7px]">
              <Box className="py-[7px] px-3.5 bg-[#D9ECFF]">
                <Text as="p" align="center" weight="medium">
                  All Provinces (
                  {productionDashboardData.countryProduction.provinces.reduce(
                    (sum, province) => sum + (province.totalProduction || 0),
                    0
                  )}
                  )
                </Text>
              </Box>
              <Box className="py-[7px] px-3.5">
                {productionDashboardData.countryProduction.provinces.map(
                  (province) => (
                    <Button
                      key={province.provinceId}
                      onClick={() =>
                        handleProvinceSelect(province.provinceName)
                      }
                      className="!bg-transparent hover:!bg-gray-200 !transition-colors !duration-200 !w-full !h-full !text-black !inline-block !py-1 !font-normal"
                    >
                      <Flex justify="between" gap="2">
                        <Text>{province.provinceName}</Text>
                        <Text>{province.totalProduction} T</Text>
                      </Flex>
                    </Button>
                  )
                )}
              </Box>
            </Box>
          )}
          {selectedProvince && !selectedDivision && (
            <Box className="w-[277px] !bg-white !rounded-[10px] border-[1px] border-[#E6E6E6] pt-[7px]">
              <Box className="py-[7px] px-3.5 bg-[#D9ECFF]">
                <Text as="p" align="center" weight="medium">
                  {selectedProvince && selectedProvince.properties.NAME_1}{" "}
                  {selectedProvince && "Province"} (
                  {specificProvince?.totalProduction || 0})
                </Text>
              </Box>
              <Box className="py-[7px] px-3.5">
                {selectedProvince &&
                  specificProvince?.divisions.map((division) => (
                    <Flex key={division.divisionId} justify="between" gap="2">
                      <Text>{division.divisionName}</Text>
                      <Text>{division.totalProduction} T</Text>
                    </Flex>
                  ))}
              </Box>
            </Box>
          )}
          {selectedProvince && selectedDivision && (
            <Box className="w-full !bg-white !rounded-[10px] border-[1px] border-[#E6E6E6] pt-[7px]">
              <Box className="py-[7px] px-3.5 bg-[#D9ECFF]">
                <Text as="p" align="center" weight="medium">
                  Production, Consumption & Deficit
                </Text>
              </Box>
              <Box className="py-[7px] px-3.5">
                <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell>Division</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>
                        Production
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>
                        Consumption
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Deficit</Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.RowHeaderCell>Lahore</Table.RowHeaderCell>
                      <Table.Cell>1020</Table.Cell>
                      <Table.Cell>19134</Table.Cell>
                      <Table.Cell>-18114</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.RowHeaderCell>Lahore</Table.RowHeaderCell>
                      <Table.Cell>1020</Table.Cell>
                      <Table.Cell>19134</Table.Cell>
                      <Table.Cell>-18114</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.RowHeaderCell>Lahore</Table.RowHeaderCell>
                      <Table.Cell>1020</Table.Cell>
                      <Table.Cell>19134</Table.Cell>
                      <Table.Cell>-18114</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.RowHeaderCell>Lahore</Table.RowHeaderCell>
                      <Table.Cell>1020</Table.Cell>
                      <Table.Cell>19134</Table.Cell>
                      <Table.Cell>-18114</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>
              </Box>
            </Box>
            // <Box className="w-[277px] !bg-white !rounded-[10px] border-[1px] border-[#E6E6E6] pt-[7px]">
            //   <Box className="py-[7px] px-3.5 bg-[#D9ECFF]">
            //     <Text as="p" align="center" weight="medium">
            //       {selectedDivision && selectedDivision.properties.NAME_2}{" "}
            //       {selectedDivision && "Division"} (
            //       {specificDivision?.totalProduction || 0})
            //     </Text>
            //   </Box>
            //   <Box className="py-[7px] px-3.5">
            //     {selectedDivision &&
            //       specificProvince &&
            //       specificDivision?.districts.map((district) => (
            //         <Flex key={district.districtName} justify="between" gap="2">
            //           <Text>{district.districtName}</Text>
            //           <Text>{district.totalProduction} T</Text>
            //         </Flex>
            //       ))}
            //   </Box>
            // </Box>
          )}
        </div>
        <div className="absolute mb-3 right-14 bottom-0 z-10 w-[95%]">
          <Flex justify="end">
            <Button
              onClick={() => setShowGraph(!showGraph)}
              className="!bg-white !text-[#101828] !border-[#D0D5DD] !border-[1px] !mb-2"
            >
              {showGraph ? "Hide" : "Show Graph"}
            </Button>
          </Flex>
        </div>
        <button
          className="absolute top-3 right-3 z-20 bg-white p-1 rounded shadow"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? (
            <RiFullscreenExitFill size={24} />
          ) : (
            <MdFullscreen size={24} />
          )}
        </button>
        <APIProvider
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}
          libraries={["routes", "geometry", "marker"]}
        >
          {devmap && (
            <Map
              mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
              defaultZoom={10}
              defaultCenter={{ lat: 31.17, lng: 72.7097 }}
              gestureHandling="greedy"
              style={{
                width: "100%",
                height: `calc(${showGraph ? "100" : "100"}vh)`,
                transition: "all .3s",
              }}
              mapTypeId="hybrid"
              zoomControl={true}
              fullscreenControl={false}
            >
              <MapWrapper />
              <PakistanArea
                geoData={pakistanGeo as GeoJSONPakistan}
                selectedProvince={selectedProvince}
              />
              <ProvincesArea
                geoData={provinces as GeoJSONProvinces}
                selectedProvince={selectedProvince}
                onProvinceClick={(province) => setSelectedProvince(province)}
                data={productionDashboardData.countryProduction.provinces}
              />
              <DivisionsArea
                geoData={divisions as GeoJSONDivisions}
                selectedProvince={selectedProvince}
                selectedDivision={selectedDivision}
                onDivisionClick={(division) => setSelectedDivision(division)}
                data={specificProvince?.divisions}
              />
              <DistrictsArea
                geoData={districts as GeoJSONDistricts}
                selectedDivision={selectedDivision}
                data={specificDivision?.districts}
              />
              <TrackingArea data={productionDashboardData.tracking} />
            </Map>
          )}
        </APIProvider>
      </div>
      <div className="mb-3 w-[95%]">
        {showGraph && (
          <div className="grid grid-cols-1 md:grid-cols-3 mb-3 gap-2.5">
            {/* <Box className="w-full !bg-white col-span-2 z-10 rounded-[17px]"> */}
            <Box className="w-full col-span-2 z-10 ">
              <CustomLineChart
                productionDashboardData={productionDashboardData}
                data={lineChartData}
                heading={
                  <>
                    <Box>
                      <Text size="4" className="!text-[#9291A5]">
                        Supply chain
                      </Text>
                      <Heading className="!text-[1.375rem]" mb="3">
                        Analytics
                      </Heading>
                    </Box>
                  </>
                }
                height={287}
              />
              {/* <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                      <Table.Cell>danilo@example.com</Table.Cell>
                      <Table.Cell>Developer</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
                      <Table.Cell>zahra@example.com</Table.Cell>
                      <Table.Cell>Admin</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
                      <Table.Cell>jasper@example.com</Table.Cell>
                      <Table.Cell>Developer</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root> */}
            </Box>
            <Box className="w-full z-10">
              <MyThinBarChart
                heading="Season Cycle"
                height={280}
                data={tinyBarChartData}
              />
            </Box>
          </div>
        )}
      </div>
    </div>
  );
};

export default PakistanMap;
