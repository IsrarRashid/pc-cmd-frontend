import { ProductionDashboard } from "@/app/page";
import CustomLineChart, { LineChartData } from "../charts/CustomLineChart";
import { useMemo } from "react";
import { Box, Heading, Text } from "@radix-ui/themes";

const LineChartPreview = ({
  productionDashboardData,
}: {
  productionDashboardData: ProductionDashboard;
}) => {
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

  return (
    <CustomLineChart
      productionDashboardData={productionDashboardData}
      data={lineChartData}
      heading={
        <>
          <Box>
            <Text size="4" className="!text-white">
              Supply chain of Tomato in Wholesale Markets of
            </Text>
            <Heading className="!text-[1.375rem] !text-white" mb="3">
              Punjab
            </Heading>
          </Box>
        </>
      }
      height={287}
    />
  );
};

export default LineChartPreview;
