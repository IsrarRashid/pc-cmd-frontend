import { Flex, Text } from "@radix-ui/themes";
import MyPieChart, { ChartType } from "../charts/MyPieChart";

const DivisionPieChartPreview = ({ heading }: { heading: string }) => {
  const chartData: ChartType[] = [
    {
      label: "Production",
      // value: data?.data.privateParties.ldcCompany,
      // value: dashboardData.wheatStats.flour,
      value: 1000,
      color: "#038907",
    },
    {
      label: "Consumption",
      // value: data?.data.privateParties.ldcCompany,
      // value: dashboardData.wheatStats.flour,
      value: 400,
      color: "#FEB019",
    },
    {
      label: "Deficit",
      // value: data?.data.privateParties.ginningFactories,
      // value: dashboardData.wheatStats.wheat,
      value: 400,
      color: "#E61313",
    },
  ];
  return (
    <MyPieChart
      otherValue={0}
      data={chartData}
      height={200}
      header={
        <Flex justify="between" align="center">
          <Text className="!font-semibold !text-white" size="1">
            {heading}
          </Text>
          {/* <Select.Root size="1" defaultValue="select">
            <Select.Trigger
              radius="full"
              className="!bg-[#002344] !text-white"
            />
            <Select.Content className="!bg-[#002344] !text-white">
              <Select.Group>
                <Select.Item value="select">Select</Select.Item>
                <Select.Item value="Tons">Tons</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root> */}
        </Flex>
      }
    />
  );
};

export default DivisionPieChartPreview;
