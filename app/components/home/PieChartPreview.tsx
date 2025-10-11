import { Flex, Select, Text } from "@radix-ui/themes";
import MyPieChart, { ChartType } from "../charts/MyPieChart";
import { Province } from "@/app/page";

const PieChartPreview = ({ province }: { province: Province }) => {
  const chartData: ChartType[] = [
    {
      label: "Production",
      value: province.totalProduction,
      color: "#02B377",
    },
    {
      label: "Consumption",
      value: province.totalConsumption,
      color: "#3BA2F1",
    },
    {
      label: "Deficit",
      value: Math.abs(province.balance),
      color: province.balance > 0 ? "#3D6730" : "#FEB019",
    },
  ];
  return (
    <MyPieChart
      data={chartData}
      otherValue={province.balance}
      height={155}
      header={
        <Flex justify="between" align="center">
          <Text className="!font-semibold " size="1">
            Punjab Analytics
          </Text>
          <Select.Root size="1" defaultValue="Tons">
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
          </Select.Root>
        </Flex>
      }
    />
  );
};

export default PieChartPreview;
