"use client";

import { Dashboard, ProductionDashboard } from "@/app/page";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import PakistanMap from "./GoogleMap/PakistanMap/PakistanMap";
import Header from "./Header";

interface Props {
  dashboardData: Dashboard;
  productionDashboardData: ProductionDashboard;
}

const Home = ({ dashboardData, productionDashboardData }: Props) => {
  // const chartData: ChartType[] = [
  //   {
  //     label: "Flour",
  //     // value: data?.data.privateParties.ldcCompany,
  //     value: dashboardData.wheatStats.flour,
  //     color: "#2A2A2A",
  //   },
  //   {
  //     label: "Wheat",
  //     // value: data?.data.privateParties.ginningFactories,
  //     value: dashboardData.wheatStats.wheat,
  //     color: "#aa3c31",
  //   },
  // ];

  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      <Header show={show} setShow={setShow} />
      <div
        className={`
    mb-2 transition-all duration-500 ease-in-out overflow-hidden
    ${show ? "h-[310px] opacity-100" : "h-0 opacity-0"}
  `}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 mb-3 gap-2.5">
          <Box className="rounded-[14px] border-[#E2E8F0] border-[1px] p-6">
            <Flex
              justify="between"
              align="center"
              className="gap-[13px] mb-2.5"
            >
              <Flex
                justify="center"
                align="center"
                className="w-12 h-12 bg-[rgba(170,60,49,0.2)] rounded-full "
              >
                <Image
                  src="/icons/wheat.svg"
                  alt="wheat"
                  width={24}
                  height={24}
                  style={{ width: "24px", height: "24px" }}
                />
              </Flex>
              <Heading size="4" className="!text-[#475569] !leading-6">
                Wheat Stock
              </Heading>
              <GrLinkNext size={20} className="text-[#CBD5E1] -rotate-45" />
            </Flex>
            <Heading
              as="h2"
              align="center"
              mb="2"
              className="!text-[2.25rem] !text-[#1E293B] !leading-11"
            >
              {dashboardData.wheatStock.total}
            </Heading>
            {/* <Flex align="center" gap="1" justify="center" className="mb-2.5">
              <LuTrendingUp size={20} className="text-[#22C55E]" />
              <Text size="2" weight="bold" className="text-[#22C55E]">
                {dashboardData.wheatStock.change}
              </Text>
              <Text size="2">vs last month</Text>
            </Flex> */}
            <Flex className="gap-3.5">
              <Box className="rounded-3xl border-[#E2E8F0] border-[1px] p-[15px] w-full">
                <Heading
                  as="h2"
                  size="5"
                  align="center"
                  className="!leading-11 !text-[#1E293B]"
                >
                  {dashboardData.wheatStock.warehouses}
                </Heading>
                <Text
                  as="p"
                  size="2"
                  weight="bold"
                  align="center"
                  className="!leading-6 !text-[#475569]"
                >
                  No of Warehous
                </Text>
              </Box>
              <Box className="rounded-3xl border-[#E2E8F0] border-[1px] p-[15px] w-full">
                <Heading
                  as="h2"
                  size="5"
                  align="center"
                  className="!leading-11 !text-[#1E293B]"
                >
                  {dashboardData.wheatStock.todayStock}
                </Heading>
                <Text
                  as="p"
                  size="2"
                  weight="bold"
                  align="center"
                  className="!leading-6 !text-[#475569]"
                >
                  Today Stock In
                </Text>
              </Box>
            </Flex>
          </Box>
          <Box className="rounded-[14px] border-[#E2E8F0] border-[1px] p-6">
            <Flex
              justify="between"
              align="center"
              className="gap-[13px] mb-2.5"
            >
              <Flex
                justify="center"
                align="center"
                className="w-12 h-12 bg-[rgba(170,60,49,0.2)] rounded-full "
              >
                <Image
                  src="/icons/floor.svg"
                  alt="flour"
                  width={24}
                  height={24}
                  style={{ width: "24px", height: "24px" }}
                />
              </Flex>
              <Heading size="4" className="!text-[#475569]">
                Wheat Grinded
              </Heading>
              <GrLinkNext size={20} className="text-[#CBD5E1] -rotate-45" />
            </Flex>
            <Heading
              as="h2"
              align="center"
              mb="2"
              className="!text-[2.25rem] !text-[#1E293B]"
            >
              {dashboardData.wheatGrinded.total}
            </Heading>
            {/* <Flex align="center" gap="1" justify="center" className="mb-2.5">
            <LuTrendingUp size={20} className="text-[#22C55E]" />
            <Text size="2" weight="bold" className="text-[#22C55E]">
              +12%
            </Text>
            <Text size="2">vs last month</Text>
          </Flex> */}
            <Flex className="gap-3.5">
              <Box className="rounded-3xl border-[#E2E8F0] border-[1px] p-[15px] w-full">
                <Heading
                  as="h2"
                  size="5"
                  align="center"
                  className="!leading-11 !text-[#1E293B]"
                >
                  {dashboardData.wheatGrinded.mills}
                </Heading>
                <Text
                  as="p"
                  size="2"
                  weight="bold"
                  align="center"
                  className="!leading-6 !text-[#475569]"
                >
                  No of Mills
                </Text>
              </Box>
              <Box className="rounded-3xl border-[#E2E8F0] border-[1px] p-[15px] w-full">
                <Heading
                  as="h2"
                  size="5"
                  align="center"
                  className="!leading-11 !text-[#1E293B]"
                >
                  {dashboardData.wheatGrinded.todayStock}
                </Heading>
                <Text
                  as="p"
                  size="2"
                  weight="bold"
                  align="center"
                  className="!leading-6 !text-[#1E293B]"
                >
                  Today Stock In
                </Text>
              </Box>
            </Flex>
          </Box>
          <Box className="rounded-[14px] border-[#E2E8F0] border-[1px] p-6">
            <Flex
              justify="between"
              align="center"
              className="gap-[13px] mb-2.5"
            >
              <Flex
                justify="center"
                align="center"
                className="w-12 h-12 bg-[rgba(170,60,49,0.2)] rounded-full "
              >
                <Image
                  src="/icons/issued.svg"
                  alt="issued"
                  width={24}
                  height={24}
                  style={{ width: "24px", height: "24px" }}
                />
              </Flex>
              <Heading size="4" className="!text-[#475569] !leading-6">
                Flour Issued
              </Heading>
              <GrLinkNext size={20} className="text-[#CBD5E1] -rotate-45" />
            </Flex>
            <Heading
              as="h2"
              align="center"
              mb="2"
              className="!text-[2.25rem] !text-[#1E293B] !leading-11"
            >
              {dashboardData.flourIssued.total}
            </Heading>
            {/* <Flex align="center" gap="1" justify="center" className="mb-2.5">
            <LuTrendingUp size={20} className="text-[#22C55E]" />
            <Text size="2" weight="bold" className="text-[#22C55E]">
              +12%
            </Text>
            <Text size="2">vs last month</Text>
          </Flex> */}
            <Flex className="gap-3.5">
              <Box className="rounded-3xl border-[#E2E8F0] border-[1px] p-[15px] w-full">
                <Heading
                  as="h2"
                  size="5"
                  align="center"
                  className="!leading-11 !text-[#1E293B]"
                >
                  {dashboardData.flourIssued.wholesalers}
                </Heading>
                <Text
                  as="p"
                  size="2"
                  weight="bold"
                  align="center"
                  className="!leading-6 text-[#475569]"
                >
                  Wholesellers
                </Text>
              </Box>
              <Box className="rounded-3xl border-[#E2E8F0] border-[1px] p-[15px] w-full">
                <Heading
                  as="h2"
                  size="5"
                  align="center"
                  className="!leading-11 !text-[#1E293B]"
                >
                  {dashboardData.flourIssued.todayIssued}
                </Heading>
                <Text
                  as="p"
                  size="2"
                  weight="bold"
                  align="center"
                  className="!leading-6 !text-[#475569]"
                >
                  Today Issued
                </Text>
              </Box>
            </Flex>
          </Box>
          <Box className="rounded-[14px] border-[#E2E8F0] border-[1px] px-[15px] py-[11px]">
            <Flex
              justify="between"
              align="center"
              className="gap-[13px] mb-2.5"
            >
              <Heading as="h6" className="!text-lg !leading-6 !text-[#475569]">
                Mill Details
              </Heading>
              <GrLinkNext size={20} className="text-[#CBD5E1] -rotate-45" />
            </Flex>
            <div className="grid grid-cols-1 md:grid-cols-2 mb-3 gap-2.5">
              <Box className="rounded-3xl border-[#E2E8F0] border-[1px] p-[15px] w-full">
                <Heading
                  as="h2"
                  size="5"
                  align="center"
                  className="!leading-11 !text-[#1E293B]"
                >
                  {dashboardData.millDetails.millsRegistered}
                </Heading>
                <Text
                  as="p"
                  size="2"
                  weight="bold"
                  align="center"
                  className="!leading-6 !text-[#475569]"
                >
                  Mills Registered
                </Text>
              </Box>
              <Box className="rounded-3xl border-[#E2E8F0] border-[1px] p-[15px] w-full">
                <Heading
                  as="h2"
                  size="5"
                  align="center"
                  className="!leading-11 !text-[#1E293B]"
                >
                  {dashboardData.millDetails.functionalMills}
                </Heading>
                <Text
                  as="p"
                  size="2"
                  weight="bold"
                  align="center"
                  className="!leading-6 !text-[#475569]"
                >
                  Functional Mills
                </Text>
              </Box>
              <Box className="rounded-3xl border-[#E2E8F0] border-[1px] p-[15px] w-full">
                <Heading
                  as="h2"
                  size="5"
                  align="center"
                  className="!leading-11 text-[#1E293B]"
                >
                  {dashboardData.millDetails.nonFunctionalMills}
                </Heading>
                <Text
                  as="p"
                  size="2"
                  weight="bold"
                  align="center"
                  className="!leading-6 !text-[#475569]"
                >
                  Non-Functional Mills
                </Text>
              </Box>
              <Box className="rounded-3xl border-[#E2E8F0] border-[1px] p-[15px] w-full">
                <Heading
                  as="h2"
                  size="5"
                  align="center"
                  className="!leading-11 !text-[#1E293B]"
                >
                  {dashboardData.millDetails.aataChakiRegistered}
                </Heading>
                <Text
                  as="p"
                  size="2"
                  weight="bold"
                  align="center"
                  className="!leading-6 !text-[#475569]"
                >
                  Aata Chaki Registered
                </Text>
              </Box>
            </div>
          </Box>
          {/* <Box className="rounded-[14px] border-[#E2E8F0] border-[1px] p-6">
            <MyPieChart
              data={chartData}
              height={120}
              header={
                <Flex
                  justify="between"
                  align="center"
                  className="gap-[13px] mb-2.5"
                >
                  <Text className="font-semibold text-[0.968rem]">
                    Wheat Stats
                  </Text>

                  <Select.Root defaultValue="Select">
                    <Select.Trigger
                      radius="full"
                      variant="soft"
                      className="!bg-[#F8F8FF]"
                    />
                    <Select.Content>
                      <Select.Group>
                        <Select.Item value="Select">Select</Select.Item>
                        <Select.Item value="Tons">Tons</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </Flex>
              }
            />
            <Flex justify="between" className="px-[26.54px]">
              <Flex align="center" gap="1">
                <Box className="w-[13.27px] h-[13.27px] bg-primary rounded-[4.42px]"></Box>
                <Text
                  weight="medium"
                  className="text-[0.829rem] text-[#667085]"
                >
                  Wheat
                </Text>
              </Flex>
              <Text weight="medium" className="text-[0.829rem] text-[#0A0E15]">
                2476
              </Text>
            </Flex>
            <Flex justify="between" className="px-[26.54px]">
              <Flex align="center" gap="1">
                <Box className="w-[13.27px] h-[13.27px] bg-[#2A2A2A] rounded-[4.42px]"></Box>
                <Text
                  weight="medium"
                  className="text-[0.829rem] text-[#667085]"
                >
                  Flour
                </Text>
              </Flex>
              <Text weight="medium" className="text-[0.829rem] text-[#0A0E15]">
                120
              </Text>
            </Flex>
          </Box> */}
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-4 mb-3 gap-2.5">
          <Box className="rounded-[14px] border-[#E2E8F0] border-[1px] p-6">
            <Flex
              justify="between"
              align="center"
              className="gap-[13px]"
              mb="5"
            >
              <Heading as="h2" size="4" className="!text-[#475569]">
                Mills Registered
              </Heading>
              <GrLinkNext size={20} className="text-[#CBD5E1] -rotate-45" />
            </Flex>
            <Flex justify="between">
              <Box>
                <Heading as="h2" className="!text-[2.25rem] !text-[#1E293B]">
                  {dashboardData.millDetails.millsRegistered}
                </Heading>
              </Box>
              <Flex
                justify="center"
                align="center"
                className="w-12 h-12 bg-[rgba(170,60,49,0.2)] rounded-full self-end"
              >
                <Image
                  src="/icons/factory-01.svg"
                  alt="factory-01"
                  width={24}
                  height={24}
                  style={{ width: "24px", height: "24px" }}
                />
              </Flex>
            </Flex>
          </Box>
          <Box className="rounded-[14px] border-[#E2E8F0] border-[1px] p-6">
            <Flex
              justify="between"
              align="center"
              className="gap-[13px]"
              mb="5"
            >
              <Heading as="h2" size="4" className="!text-[#475569]">
                Functional Mills
              </Heading>
              <GrLinkNext size={20} className="text-[#CBD5E1] -rotate-45" />
            </Flex>
            <Flex justify="between">
              <Box>
                <Heading as="h2" className="!text-[2.25rem] !text-[#1E293B]">
                  {dashboardData.millDetails.functionalMills}
                </Heading>
              </Box>
              <Flex
                justify="center"
                align="center"
                className="w-12 h-12 bg-[rgba(170,60,49,0.2)] rounded-full self-end"
              >
                <Image
                  src="/icons/factory.svg"
                  alt="factory"
                  width={24}
                  height={24}
                  style={{ width: "24px", height: "24px" }}
                />
              </Flex>
            </Flex>
          </Box>
          <Box className="rounded-[14px] border-[#E2E8F0] border-[1px] p-6">
            <Flex
              justify="between"
              align="center"
              className="gap-[13px]"
              mb="5"
            >
              <Heading as="h2" size="4" className="!text-[#475569]">
                Non-Functional Mills
              </Heading>
              <GrLinkNext size={20} className="text-[#CBD5E1] -rotate-45" />
            </Flex>
            <Flex justify="between">
              <Box>
                <Heading as="h2" className="!text-[2.25rem] !text-[#1E293B]">
                  {dashboardData.millDetails.nonFunctionalMills}
                </Heading>
              </Box>
              <Flex
                justify="center"
                align="center"
                className="w-12 h-12 bg-[rgba(170,60,49,0.2)] rounded-full self-end"
              >
                <Image
                  src="/icons/factory-02.svg"
                  alt="factory-02"
                  width={24}
                  height={24}
                  style={{ width: "24px", height: "24px" }}
                />
              </Flex>
            </Flex>
          </Box>
          <Box className="rounded-[14px] border-[#E2E8F0] border-[1px] p-6">
            <Flex
              justify="between"
              align="center"
              className="gap-[13px]"
              mb="5"
            >
              <Heading as="h2" size="4" className="!text-[#475569]">
                Aata Chaki Registered
              </Heading>
              <GrLinkNext size={20} className="text-[#CBD5E1] -rotate-45" />
            </Flex>
            <Flex justify="between">
              <Box>
                <Heading as="h2" className="!text-[2.25rem] !text-[#1E293B]">
                  {dashboardData.millDetails.aataChakiRegistered}
                </Heading>
              </Box>
              <Flex
                justify="center"
                align="center"
                className="w-12 h-12 bg-[rgba(170,60,49,0.2)] rounded-full self-end"
              >
                <Image
                  src="/icons/machine-robot.svg"
                  alt="machine-robot"
                  width={24}
                  height={24}
                  style={{ width: "24px", height: "24px" }}
                />
              </Flex>
            </Flex>
          </Box>
        </div> */}
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 mb-3 gap-2.5">
        <Box className="w-full col-span-2">
          <MyBarChartDialog
            heading="Divisional Data"
            mon={10}
            tue={20}
            wed={30}
            thu={40}
            fri={50}
            sat={60}
            height={450}
          />
        </Box>
        <Box className="w-full">
          <MyThinBarChart
            heading="SALES CHART"
            mon={10}
            tue={20}
            wed={30}
            thu={40}
            fri={50}
            sat={60}
            height={450}
          />
        </Box>
      </div> */}
      <Box className="rounded-[14px] border-[#E2E8F0] border-[1px] w-full h-full">
        <div className="w-full h-full">
          {/* <MyMap /> */}
          {/* <PunjabMap divisions={dashboardData.divisions} /> */}
          <PakistanMap productionDashboardData={productionDashboardData} />
        </div>
      </Box>
    </div>
  );
};

export default Home;
