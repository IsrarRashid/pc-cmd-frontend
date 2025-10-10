"use client";

import { Dashboard, ProductionDashboard } from "@/app/page";
import { Box, Dialog, Flex, Heading, ScrollArea } from "@radix-ui/themes";
import AreaChartPreview from "./AreaChartPreview";
import BarChartPreview from "./BarChartPreview";
import Card from "./Card";
import DepartmentCategoryFilter from "./DepartmentCategoryFilter";
import PakistanMap from "./GoogleMap/PakistanMap/PakistanMap";
import PieTile from "./PieTile";
import ProductFilter from "./ProductFilter";
import ProvinceTile from "./ProvinceTile";
import PunjabTableTile from "./PunjabTableTile";
import TrackingMap from "./TrackingMap/TrackingMap";

interface Props {
  dashboardData: Dashboard;
  productionDashboardData: ProductionDashboard;
}

const Home = ({ dashboardData, productionDashboardData }: Props) => {
  console.log("dashboardData", dashboardData);
  // const [show, setShow] = useState<boolean>(false);

  // const items = [
  //   {
  //     id: 2,
  //     imagePath: "/icons/emojione_tomato.png",
  //   },
  //   {
  //     id: 0,
  //     imagePath: "/icons/noto_onion.png",
  //   },
  //   {
  //     id: 1,
  //     imagePath: "/icons/emojione_sheaf-of-rice.png",
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

  // const yearOptions = [{ year: "2024-2025" }].map((year) => {
  //   return {
  //     value: year.year,
  //     label: year.year,
  //   };
  // });

  const punjabProvince =
    productionDashboardData.countryProduction.provinces.find(
      (province) => province.provinceName === "Punjab"
    );

  return (
    <div>
      {/* <Header show={show} setShow={setShow} /> */}
      <Box className="w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Flex direction="column" className="px-2.5 pb-2.5 !gap-2.5">
            <DepartmentCategoryFilter />
            <Card>
              {/* <Flex
                justify="between"
                align="center"
                gap="2"
                className="!px-2 !py-[5px]"
              >
                {items.map((item) => (
                  <IconButton
                    key={item.id}
                    className={classnames({
                      "!w-[32px] !h-[32px] !relative !rounded-full !transition-all !duration-200":
                        true,
                      "!text-white !bg-[rgba(170,60,49,0.1)] !border-[1.44px] !border-[#AA3C31] ":
                        selectedItem === item.id,
                      " !bg-transparent": selectedItem !== item.id,
                    })}
                    onClick={() => setSelectedItem(item.id)}
                  >
                    {selectedItem === item.id && (
                      <div className="absolute">
                        <FaRegCircle size={36} className="text-[#AA3C31]" />
                      </div>
                    )}
                    <div className="absolute">
                      <Image
                        src={item.imagePath}
                        alt={item.imagePath}
                        width={23}
                        height={23}
                      />
                    </div>
                  </IconButton>
                ))}
              </Flex> */}
              <ProductFilter />
            </Card>
            {/* <CustomSelect
              singleSelectStyles={customSingleSelectStyles}
              closeMenuOnSelect={true}
              options={yearOptions}
              isDisabled={true}
              defaultValue={yearOptions[0]}
            /> */}
            <Dialog.Root>
              <Dialog.Trigger>
                <div className="cursor-none">
                  {punjabProvince && <PieTile province={punjabProvince} />}
                </div>
              </Dialog.Trigger>

              <Dialog.Content className="!p-0 !rounded-none" maxWidth="450px">
                <Dialog.Title className="sr-only">Edit profile</Dialog.Title>
                <Dialog.Description size="2" mb="4" className="sr-only">
                  Make changes to your profile.
                </Dialog.Description>

                {punjabProvince && <PieTile province={punjabProvince} />}
              </Dialog.Content>
            </Dialog.Root>

            <Card>
              <Box>
                <Heading
                  as="h6"
                  className="!text-[1.0575rem] !text-white !px-[17px]"
                >
                  Truck Tracking
                </Heading>
                <TrackingMap
                  productionDashboardData={productionDashboardData}
                />
              </Box>
            </Card>
          </Flex>
          <Box className="col-span-2 rounded-[14px] w-full">
            <Card>
              <PakistanMap productionDashboardData={productionDashboardData} />
            </Card>
          </Box>
          <ScrollArea
            type="auto"
            scrollbars="vertical"
            style={{ height: "515px" }}
          >
            <Flex direction="column" className="!gap-2.5">
              <Dialog.Root>
                <Dialog.Trigger>
                  <div className="cursor-none">
                    <PunjabTableTile
                      productionDashboardData={productionDashboardData}
                    />
                  </div>
                </Dialog.Trigger>

                <Dialog.Content className="!p-0 !rounded-none" maxWidth="450px">
                  <Dialog.Title className="sr-only">Edit profile</Dialog.Title>
                  <Dialog.Description size="2" mb="4" className="sr-only">
                    Make changes to your profile.
                  </Dialog.Description>

                  <PunjabTableTile
                    productionDashboardData={productionDashboardData}
                  />
                </Dialog.Content>
              </Dialog.Root>

              {/* <Card>
                <Text
                  as="p"
                  align="center"
                  weight="medium"
                  className="!text-xs !text-white !py-[5px] !px-[10px] !bg-[#002344] !leading-[1.108em]"
                >
                  Punjab Production, Consumption & Deficit
                </Text>
                <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell className="!bg-[#02325F] !text-[#FEB019] !font-normal !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        Division
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell className="!bg-[#02325F] !text-[#FEB019] !font-normal !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        Production
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell className="!bg-[#02325F] !text-[#FEB019] !font-normal !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        Consumption
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell className="!bg-[#02325F] !text-[#FEB019] !font-normal !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        Deficit
                      </Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.RowHeaderCell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        Mianwali
                      </Table.RowHeaderCell>
                      <Table.Cell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        540,000
                      </Table.Cell>
                      <Table.Cell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        147,380
                      </Table.Cell>
                      <Table.Cell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        392,620
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.RowHeaderCell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        Mianwali
                      </Table.RowHeaderCell>
                      <Table.Cell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        540,000
                      </Table.Cell>
                      <Table.Cell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        147,380
                      </Table.Cell>
                      <Table.Cell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        392,620
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.RowHeaderCell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        Mianwali
                      </Table.RowHeaderCell>
                      <Table.Cell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        540,000
                      </Table.Cell>
                      <Table.Cell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        147,380
                      </Table.Cell>
                      <Table.Cell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        392,620
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>
              </Card> */}
              {/* <Card>
                <Flex
                  justify="between"
                  className="!py-[5px] !px-[10px] !bg-[#002344]"
                >
                  <Text
                    as="p"
                    align="center"
                    weight="medium"
                    className="!text-xs !text-danger !leading-[1.108em]"
                  >
                    Sindh Production
                  </Text>
                  <Text
                    as="p"
                    align="center"
                    weight="medium"
                    className="!text-xs !text-danger !leading-[1.108em]"
                  >
                    10,0000 Tons
                  </Text>
                </Flex>
                <DataList.Root className="!gap-0">
                  <DataList.Item className="!flex !justify-between !items-center !py-[5px] !px-2.5">
                    <DataList.Label minWidth="88px">
                      <Text className="!text-base !text-white" wrap="nowrap">
                        Thatta
                      </Text>
                    </DataList.Label>
                    <DataList.Value className="!w-full !min-w-[200px]">
                      <Flex
                        align="center"
                        gap="2"
                        className="!justify-between !flex-row-reverse w-full"
                      >
                        <Text
                          wrap="nowrap"
                          className="!text-white !text-[0.625rem]"
                        >
                          114,524
                        </Text>
                        <Progress
                          value={100}
                          color="green"
                          className="w-full h-2 bg-transparent"
                          style={{
                            // Transparent background
                            backgroundColor: "transparent",

                            // Radix Themes uses CSS var for progress fill color
                            // so we override it directly
                            // ["--progress-color" as any]: "#038907", // Tailwind's green-500 (success)
                            ["--progress-track-color" as any]: "transparent", // hide track
                            transform: "scaleX(-1)", // visually reverses the direction
                          }}
                        />
                      </Flex>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item className="!flex !justify-between !items-center !py-[5px] !px-2.5">
                    <DataList.Label minWidth="88px">
                      <Text className="!text-base !text-white" wrap="nowrap">
                        Badin
                      </Text>
                    </DataList.Label>
                    <DataList.Value className="!w-full !min-w-[200px]">
                      <Flex
                        align="center"
                        gap="2"
                        className="!justify-between !flex-row-reverse w-full"
                      >
                        <Text
                          wrap="nowrap"
                          className="!text-white !text-[0.625rem]"
                        >
                          100,524
                        </Text>
                        <Progress
                          value={80}
                          className="w-full h-2 bg-transparent"
                          color="yellow"
                          style={{
                            // Transparent background
                            backgroundColor: "transparent",

                            // Radix Themes uses CSS var for progress fill color
                            // so we override it directly
                            // ["--progress-color" as any]: "#feb019", // Tailwind's yellow (success)
                            ["--progress-track-color" as any]: "transparent", // hide track
                            transform: "scaleX(-1)", // visually reverses the direction
                          }}
                        />
                      </Flex>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item className="!flex !justify-between !items-center ">
                    <Separator
                      size="4"
                      className="rounded-full !bg-white !px-0 custom-separator"
                    />
                  </DataList.Item>
                  <DataList.Item className="!flex !justify-between !items-center !py-[5px] !px-2.5">
                    <DataList.Label minWidth="88px">
                      <Text className="!text-base !text-white" wrap="nowrap">
                        Thatta
                      </Text>
                    </DataList.Label>
                    <DataList.Value className="!w-full !min-w-[200px]">
                      <Flex
                        align="center"
                        gap="2"
                        className="!justify-between !flex-row-reverse w-full"
                      >
                        <Text
                          wrap="nowrap"
                          className="!text-white !text-[0.625rem]"
                        >
                          114,524
                        </Text>
                        <Progress
                          value={60}
                          className="w-full h-2 bg-transparent"
                          color="red"
                          style={{
                            // Transparent background
                            backgroundColor: "transparent",

                            // Radix Themes uses CSS var for progress fill color
                            // so we override it directly
                            ["--progress-color" as any]: "#22c55e", // Tailwind's green-500 (success)
                            ["--progress-track-color" as any]: "transparent", // hide track
                            transform: "scaleX(-1)", // visually reverses the direction
                          }}
                        />
                      </Flex>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item className="!flex !justify-between !items-center !py-[5px] !px-2.5">
                    <DataList.Label minWidth="88px">
                      <Text className="!text-base !text-white" wrap="nowrap">
                        Badin
                      </Text>
                    </DataList.Label>
                    <DataList.Value className="!w-full !min-w-[200px]">
                      <Flex
                        align="center"
                        gap="2"
                        className="!justify-between !flex-row-reverse w-full"
                      >
                        <Text
                          wrap="nowrap"
                          className="!text-white !text-[0.625rem]"
                        >
                          114,524
                        </Text>
                        <Progress
                          value={40}
                          color="brown"
                          className="w-full h-2 bg-transparent"
                          style={{
                            // Transparent background
                            backgroundColor: "transparent",

                            // Radix Themes uses CSS var for progress fill color
                            // so we override it directly
                            ["--progress-color" as any]: "#22c55e", // Tailwind's green-500 (success)
                            ["--progress-track-color" as any]: "transparent", // hide track
                            transform: "scaleX(-1)", // visually reverses the direction
                          }}
                        />
                      </Flex>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item className="!flex !justify-between !items-center ">
                    <Separator
                      size="4"
                      className="rounded-full !bg-white !px-0 custom-separator"
                    />
                  </DataList.Item>
                  <DataList.Item className="!flex !justify-between !items-center !py-[5px] !px-2.5">
                    <DataList.Label minWidth="88px">
                      <Text className="!text-base !text-white" wrap="nowrap">
                        Badin
                      </Text>
                    </DataList.Label>
                    <DataList.Value className="!w-full !min-w-[200px]">
                      <Flex
                        align="center"
                        gap="2"
                        className="!justify-between !flex-row-reverse w-full"
                      >
                        <Text
                          wrap="nowrap"
                          className="!text-white !text-[0.625rem]"
                        >
                          114,524
                        </Text>
                        <Progress
                          value={20}
                          color="blue"
                          className="w-full h-2 bg-transparent"
                          style={{
                            // Transparent background
                            backgroundColor: "transparent",

                            // Radix Themes uses CSS var for progress fill color
                            // so we override it directly
                            ["--progress-color" as any]: "#22c55e", // Tailwind's green-500 (success)
                            ["--progress-track-color" as any]: "transparent", // hide track
                            transform: "scaleX(-1)", // visually reverses the direction
                          }}
                        />
                      </Flex>
                    </DataList.Value>
                  </DataList.Item>
                </DataList.Root>
              </Card> */}
              {productionDashboardData.countryProduction.provinces.map(
                (province) => (
                  <Dialog.Root key={province.provinceId}>
                    <Dialog.Trigger>
                      <div className="cursor-none">
                        <ProvinceTile province={province} />
                      </div>
                    </Dialog.Trigger>

                    <Dialog.Content
                      className="!p-0 !rounded-none"
                      maxWidth="450px"
                    >
                      <Dialog.Title className="sr-only">
                        Edit profile
                      </Dialog.Title>
                      <Dialog.Description size="2" mb="4" className="sr-only">
                        Make changes to your profile.
                      </Dialog.Description>

                      <ProvinceTile province={province} />
                    </Dialog.Content>
                  </Dialog.Root>
                )
              )}
              {/* <Card>
                <Flex
                  justify="between"
                  className="!py-[5px] !px-[10px] !bg-[#002344]"
                >
                  <Text
                    as="p"
                    align="center"
                    weight="medium"
                    className="!text-xs !text-[#008FFB] !leading-[1.108em]"
                  >
                    Balochistan Production
                  </Text>
                  <Text
                    as="p"
                    align="center"
                    weight="medium"
                    className="!text-xs !text-[#008FFB] !leading-[1.108em]"
                  >
                    10,0000 Tons
                  </Text>
                </Flex>
                <DataList.Root className="!gap-0">
                  <DataList.Item className="!flex !justify-between !items-center !py-[5px] !px-2.5">
                    <DataList.Label minWidth="88px">
                      <Text className="!text-base !text-white" wrap="nowrap">
                        Thatta
                      </Text>
                    </DataList.Label>
                    <DataList.Value className="!w-full !min-w-[200px]">
                      <Flex
                        align="center"
                        gap="2"
                        className="!justify-between !flex-row-reverse w-full"
                      >
                        <Text
                          wrap="nowrap"
                          className="!text-white !text-[0.625rem]"
                        >
                          114,524
                        </Text>
                        <Progress
                          value={100}
                          color="green"
                          className="w-full h-2 bg-transparent"
                          style={{
                            // Transparent background
                            backgroundColor: "transparent",

                            // Radix Themes uses CSS var for progress fill color
                            // so we override it directly
                            // ["--progress-color" as any]: "#038907", // Tailwind's green-500 (success)
                            ["--progress-track-color" as any]: "transparent", // hide track
                            transform: "scaleX(-1)", // visually reverses the direction
                          }}
                        />
                      </Flex>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item className="!flex !justify-between !items-center !py-[5px] !px-2.5">
                    <DataList.Label minWidth="88px">
                      <Text className="!text-base !text-white" wrap="nowrap">
                        Badin
                      </Text>
                    </DataList.Label>
                    <DataList.Value className="!w-full !min-w-[200px]">
                      <Flex
                        align="center"
                        gap="2"
                        className="!justify-between !flex-row-reverse w-full"
                      >
                        <Text
                          wrap="nowrap"
                          className="!text-white !text-[0.625rem]"
                        >
                          100,524
                        </Text>
                        <Progress
                          value={80}
                          className="w-full h-2 bg-transparent"
                          color="yellow"
                          style={{
                            // Transparent background
                            backgroundColor: "transparent",

                            // Radix Themes uses CSS var for progress fill color
                            // so we override it directly
                            // ["--progress-color" as any]: "#feb019", // Tailwind's yellow (success)
                            ["--progress-track-color" as any]: "transparent", // hide track
                            transform: "scaleX(-1)", // visually reverses the direction
                          }}
                        />
                      </Flex>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item className="!flex !justify-between !items-center ">
                    <Separator
                      size="4"
                      className="rounded-full !bg-white !px-0 custom-separator"
                    />
                  </DataList.Item>
                  <DataList.Item className="!flex !justify-between !items-center !py-[5px] !px-2.5">
                    <DataList.Label minWidth="88px">
                      <Text className="!text-base !text-white" wrap="nowrap">
                        Thatta
                      </Text>
                    </DataList.Label>
                    <DataList.Value className="!w-full !min-w-[200px]">
                      <Flex
                        align="center"
                        gap="2"
                        className="!justify-between !flex-row-reverse w-full"
                      >
                        <Text
                          wrap="nowrap"
                          className="!text-white !text-[0.625rem]"
                        >
                          114,524
                        </Text>
                        <Progress
                          value={60}
                          className="w-full h-2 bg-transparent"
                          color="red"
                          style={{
                            // Transparent background
                            backgroundColor: "transparent",

                            // Radix Themes uses CSS var for progress fill color
                            // so we override it directly
                            ["--progress-color" as any]: "#22c55e", // Tailwind's green-500 (success)
                            ["--progress-track-color" as any]: "transparent", // hide track
                            transform: "scaleX(-1)", // visually reverses the direction
                          }}
                        />
                      </Flex>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item className="!flex !justify-between !items-center !py-[5px] !px-2.5">
                    <DataList.Label minWidth="88px">
                      <Text className="!text-base !text-white" wrap="nowrap">
                        Badin
                      </Text>
                    </DataList.Label>
                    <DataList.Value className="!w-full !min-w-[200px]">
                      <Flex
                        align="center"
                        gap="2"
                        className="!justify-between !flex-row-reverse w-full"
                      >
                        <Text
                          wrap="nowrap"
                          className="!text-white !text-[0.625rem]"
                        >
                          114,524
                        </Text>
                        <Progress
                          value={40}
                          color="brown"
                          className="w-full h-2 bg-transparent"
                          style={{
                            // Transparent background
                            backgroundColor: "transparent",

                            // Radix Themes uses CSS var for progress fill color
                            // so we override it directly
                            ["--progress-color" as any]: "#22c55e", // Tailwind's green-500 (success)
                            ["--progress-track-color" as any]: "transparent", // hide track
                            transform: "scaleX(-1)", // visually reverses the direction
                          }}
                        />
                      </Flex>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item className="!flex !justify-between !items-center ">
                    <Separator
                      size="4"
                      className="rounded-full !bg-white !px-0 custom-separator"
                    />
                  </DataList.Item>
                  <DataList.Item className="!flex !justify-between !items-center !py-[5px] !px-2.5">
                    <DataList.Label minWidth="88px">
                      <Text className="!text-base !text-white" wrap="nowrap">
                        Badin
                      </Text>
                    </DataList.Label>
                    <DataList.Value className="!w-full !min-w-[200px]">
                      <Flex
                        align="center"
                        gap="2"
                        className="!justify-between !flex-row-reverse w-full"
                      >
                        <Text
                          wrap="nowrap"
                          className="!text-white !text-[0.625rem]"
                        >
                          114,524
                        </Text>
                        <Progress
                          value={20}
                          color="blue"
                          className="w-full h-2 bg-transparent"
                          style={{
                            // Transparent background
                            backgroundColor: "transparent",

                            // Radix Themes uses CSS var for progress fill color
                            // so we override it directly
                            ["--progress-color" as any]: "#22c55e", // Tailwind's green-500 (success)
                            ["--progress-track-color" as any]: "transparent", // hide track
                            transform: "scaleX(-1)", // visually reverses the direction
                          }}
                        />
                      </Flex>
                    </DataList.Value>
                  </DataList.Item>
                </DataList.Root>
              </Card> */}
            </Flex>
          </ScrollArea>
        </div>
        <div className="mb-3 w-full px-2">
          <div className="grid grid-cols-1 md:grid-cols-3 mb-3 gap-2.5">
            <Box className="w-full col-span-2 z-10 ">
              <AreaChartPreview
                productionDashboardData={productionDashboardData}
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
              <BarChartPreview
                productionDashboardData={productionDashboardData}
              />
            </Box>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Home;

// Custom Single Select Style
// const customSingleSelectStyles: StylesConfig<
//   OptionType,
//   false,
//   GroupBase<OptionType>
// > = {
//   control: (base, state) => ({
//     ...base,
//     "::-webkit-scrollbar": {
//       width: "8px",
//       height: "8px",
//     },
//     "::-webkit-scrollbar-track": {
//       background: "#f1f1f1",
//     },
//     "::-webkit-scrollbar-thumb": {
//       background: "#22a3bd",
//       borderRadius: "10px",
//     },
//     "::-webkit-scrollbar-thumb:hover": {
//       background: "#108fa8",
//     },
//     background: "#063A6A",
//     borderRadius: 0,
//     color: "#fff",
//     fontWeight: 400,
//     fontSize: "16px",
//     border: "none",
//     boxShadow: state.isFocused ? "0 0 0 1.5px #0C8CE9" : "0 0 0 1.5px #eff0f2",
//     transition: "all 0.3s",
//   }),
//   placeholder: (base) => ({
//     ...base,
//     color: "#fff", // Set the placeholder color
//     fontWeight: 400,
//   }),
//   dropdownIndicator: (base) => ({
//     ...base,
//     padding: 10.5,
//   }),
//   singleValue: (base) => ({
//     ...base,
//     color: "#fff", // ✅ White text for selected value
//   }),
//   indicatorSeparator: (base) => ({
//     ...base,
//     display: "none",
//   }),
//   clearIndicator: (base) => ({
//     ...base,
//     padding: 4,
//   }),
//   valueContainer: (base) => ({
//     ...base,
//     padding: "0 6px",
//   }),
//   input: (base) => ({
//     ...base,
//     margin: 0,
//     padding: 0,
//   }),
//   menu: (base) => ({
//     ...base,
//     // ✅ CRITICAL: Increased z-index to be above Radix Dialog
//     zIndex: 99999,
//     padding: "4px 8px",
//     borderRadius: 14,
//     border: 0,
//     boxShadow: "0px 0px 7px 3px rgba(0,0,0,0.1)",
//   }),
//   menuPortal: (base) => ({
//     ...base,
//     // ✅ CRITICAL: Must be higher than Radix Dialog overlay (default is around 9999)
//     zIndex: 99999,
//   }),
//   option: (base, state) => ({
//     ...base,
//     backgroundColor: state.isSelected
//       ? "#C2E7E4"
//       : state.isFocused
//       ? "#E4EDEC"
//       : "white",
//     color: "#333",
//     fontSize: "14px",
//     padding: "10px",
//     borderRadius: 7,
//     // ✅ Ensure pointer events work
//     cursor: "pointer",
//     pointerEvents: "auto",
//   }),
//   menuList: (base) => ({
//     ...base,
//     maxHeight: 43 * 6,
//     // ✅ Ensure pointer events work
//     pointerEvents: "auto",
//     "::-webkit-scrollbar": {
//       width: "8px",
//       height: "8px",
//     },
//     "::-webkit-scrollbar-track": {
//       background: "#f1f1f1",
//     },
//     "::-webkit-scrollbar-thumb": {
//       background: "#22a3bd",
//       borderRadius: "10px",
//     },
//     "::-webkit-scrollbar-thumb:hover": {
//       background: "#108fa8",
//     },
//   }),
// };
