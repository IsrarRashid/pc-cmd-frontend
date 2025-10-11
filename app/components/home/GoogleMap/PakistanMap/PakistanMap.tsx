"use client";

import { Product } from "@/app/components/Navbar/forms/ProductForm";
import { DivisionProduction, ProductionDashboard, Province } from "@/app/page";
import { devmap } from "@/app/utils/utils";
import pakistanGeo from "@/public/data/gadm41_PAK/gadm41_PAK_0.json";
import provinces from "@/public/data/gadm41_PAK/gadm41_PAK_1.json";
import oldDivisions from "@/public/data/gadm41_PAK/gadm41_PAK_2.json";
import districts from "@/public/data/gadm41_PAK/gadm41_PAK_3.json";
import { Avatar, Box, Button, Flex, Table, Text } from "@radix-ui/themes";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdFullscreen } from "react-icons/md";
import { RiFullscreenExitFill } from "react-icons/ri";
import DistrictsArea, { GeoJSONDistricts } from "./DistrictsArea";
import DivisionsArea, {
  DivisionFeature,
  GeoJSONDivisions,
} from "./DivisionsArea";
import MapWrapper from "./MapWrapper";
import PakistanArea, { GeoJSONPakistan } from "./PakistanArea";
import ProvincesArea, {
  GeoJSONProvinces,
  ProvinceFeature,
} from "./ProvincesArea";

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

interface Props {
  productionDashboardData: ProductionDashboard;
  productsData: Product[];
}

const PakistanMap = ({ productionDashboardData, productsData }: Props) => {
  const [selectedProvince, setSelectedProvince] =
    useState<ProvinceFeature | null>(null);

  const [selectedDivision, setSelectedDivision] =
    useState<DivisionFeature | null>(null);

  // const [selectedItem, setSelectedItem] = useState<number>(0);
  // const [showGraph, setShowGraph] = useState<boolean>(false);

  //=========API Data
  const [specificProvince, setSpecificProvince] = useState<Province>();
  const [specificDivision, setSpecificDivision] =
    useState<DivisionProduction>();

  console.log("specificProvince", specificProvince);
  console.log("specificDivision", specificDivision);
  console.log("specificDivision", specificDivision);

  const searchParams = useSearchParams();
  const product = searchParams.get("product") || undefined;
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  useEffect(() => {
    if (product && productsData) {
      const selectedProduct = productsData.find(
        (p) => p.id === Number(product)
      );
      setSelectedProduct(selectedProduct);
    }
  }, [productsData, product]);

  useEffect(() => {
    if (selectedProduct) {
      console.log("selectedProduct", selectedProduct);
    }
  }, [selectedProduct]);

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

  // const items = [
  //   {
  //     id: 0,
  //     imagePath: "/icons/noto_onion.png",
  //   },
  //   {
  //     id: 1,
  //     imagePath: "/icons/emojione_sheaf-of-rice.png",
  //   },
  //   {
  //     id: 2,
  //     imagePath: "/icons/emojione_tomato.png",
  //   },
  //   {
  //     id: 3,
  //     imagePath: "/icons/noto_potato.png",
  //   },
  //   {
  //     id: 4,
  //     imagePath: "/icons/twemoji_cooked-rice.png",
  //   },
  // ];

  // const yearOptions = [{ year: "2024-2025" }, { year: "2025-2026" }].map(
  //   (year) => {
  //     return {
  //       value: year,
  //       label: year,
  //     };
  //   }
  // );

  // const yearOptions = [{ year: "2024-2025" }].map((year) => {
  //   return {
  //     value: year.year,
  //     label: year.year,
  //   };
  // });

  // const divisionOptions = [
  //   { divisionName: "Lahore" },
  //   { divisionName: "Kasur" },
  //   { divisionName: "Nankana Sahib" },
  //   { divisionName: "Sheikhupura" },
  // ].map((division) => {
  //   return {
  //     value: division.divisionName,
  //     label: division.divisionName,
  //   };
  // });

  // const districtOptions = [
  //   { districtName: "Okara" },
  //   { districtName: "Sahiwal" },
  //   { districtName: "Sargodha" },
  // ].map((district) => {
  //   return {
  //     value: district.districtName,
  //     label: district.districtName,
  //   };
  // });

  // const lineChartData = data?.map((d) => ({
  //   label: d.name,
  //   value: d.count,
  // }));

  // const handleProvinceSelect = (provinceName: string) => {
  //   // Find the province object from your GeoJSON data
  //   const foundProvince = (provinces as GeoJSONProvinces).features.find(
  //     (feature) => feature.properties.NAME_1 === provinceName
  //   );

  //   if (foundProvince) {
  //     setSelectedProvince(foundProvince);
  //   }
  // };

  // 🔹 Prepare data only once
  // const lineChartData: LineChartData[] = useMemo(() => {
  //   if (!productionDashboardData?.topSupplyChains) return [];

  //   const topSupplyChains = productionDashboardData.topSupplyChains;

  //   // assume first 5 provinces (red, green, blue, cyan, orange)
  //   const [p1, p2, p3, p4, p5] = topSupplyChains;

  //   // collect all unique dates
  //   const allDates = [
  //     ...new Set(
  //       topSupplyChains.flatMap((p) => p.dataPoints.map((d) => d.date))
  //     ),
  //   ].sort();

  //   // merge by date into single array
  //   return allDates.map((date) => ({
  //     label: new Date(date).toLocaleDateString("en-US", {
  //       month: "short",
  //       day: "numeric",
  //     }),
  //     redLine: p1?.dataPoints.find((d) => d.date === date)?.quantity || 0,
  //     greenLine: p2?.dataPoints.find((d) => d.date === date)?.quantity || 0,
  //     blueLine: p3?.dataPoints.find((d) => d.date === date)?.quantity || 0,
  //     cyanLine: p4?.dataPoints.find((d) => d.date === date)?.quantity || 0,
  //     orangeLine: p5?.dataPoints.find((d) => d.date === date)?.quantity || 0,
  //   }));
  // }, [productionDashboardData]);

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
        <div className="absolute mb-3 left-2.5 top-2.5 z-10">
          <Flex
            align="center"
            gap="2"
            className="!bg-[#013769] !shadow-[0_0_0_1px_#013769] !rounded-lg !px-[0.438em] !py-[0.188em]"
          >
            {selectedProduct && (
              <Avatar
                src={
                  selectedProduct.icon.startsWith("/upload")
                    ? selectedProduct.icon
                    : `/upload/${selectedProduct.icon}`
                }
                width={23}
                height={23}
                className="!w-[23px] !h-[23px]"
                onClick={() => setSelectedProvince(null)}
                fallback="?"
              ></Avatar>
            )}
            <Text wrap="nowrap" className="!text-white">
              {selectedProduct?.name}
            </Text>
          </Flex>
        </div>
        <div className="absolute mb-3 right-14 top-2.5 z-10">
          {selectedProvince && !selectedDivision && (
            <Button
              className="!bg-[#013769] !shadow-[0_0_0_1px_#013769] !rounded-lg !px-[0.875em] !py-[0.625em]"
              onClick={() => setSelectedProvince(null)}
            >
              Back to Provinces
            </Button>
          )}
          {selectedProvince && selectedDivision && (
            <Button
              className="!bg-[#013769] !shadow-[0_0_0_1px_#013769] !rounded-lg !px-[0.875em] !py-[0.625em]"
              onClick={() => setSelectedDivision(null)}
            >
              Back to Divisions
            </Button>
          )}
        </div>
        <div className="absolute mb-3 right-2.5 top-14 z-10">
          {/* {!selectedProvince && !selectedDivision && (
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
          )} */}
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
        <button
          className="absolute top-2.5 right-3 z-20 bg-white p-1 rounded shadow"
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
                height: `${isFullscreen ? "100vh" : "500px"}`,
                transition: "all .3s",
              }}
              mapTypeId="hybrid"
              zoomControl={true}
              fullscreenControl={false}
              mapTypeControl={false}
            >
              <MapWrapper />
              <PakistanArea
                geoData={pakistanGeo as GeoJSONPakistan}
                selectedProvince={selectedProvince}
              />
              {productionDashboardData?.countryProduction?.provinces && (
                <ProvincesArea
                  geoData={provinces as GeoJSONProvinces}
                  selectedProvince={selectedProvince}
                  onProvinceClick={(province) => setSelectedProvince(province)}
                  data={
                    productionDashboardData?.countryProduction?.provinces ?? []
                  }
                />
              )}
              {specificProvince?.divisions && (
                <DivisionsArea
                  geoData={divisions as GeoJSONDivisions}
                  selectedProvince={selectedProvince}
                  selectedDivision={selectedDivision}
                  onDivisionClick={(division) => setSelectedDivision(division)}
                  data={specificProvince?.divisions ?? []}
                />
              )}
              {specificDivision?.districts && (
                <DistrictsArea
                  geoData={districts as GeoJSONDistricts}
                  selectedDivision={selectedDivision}
                  data={specificDivision?.districts ?? []}
                />
              )}
            </Map>
          )}
        </APIProvider>
      </div>
    </div>
  );
};

export default PakistanMap;
