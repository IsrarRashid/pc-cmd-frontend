import React from "react";
import MyThinBarChart, { ChartType } from "../charts/MyThinBarChart";
import { ProductionDashboard } from "@/app/page";
import { Flex, Heading, Text } from "@radix-ui/themes";

const BarChartPreview = ({
  productionDashboardData,
}: {
  productionDashboardData: ProductionDashboard;
}) => {
  const tinyBarChartData: ChartType[] = [
    {
      label: "Punjab",
      value: productionDashboardData?.seasonCycle?.punjabProduction,
      season: productionDashboardData?.seasonCycle?.punjabSession,
      percentage: Number(
        productionDashboardData?.seasonCycle?.punjabPercentage.toFixed(2)
      ),
      color: "#f0f036",
    },
    {
      label: "Sindh",
      value: productionDashboardData?.seasonCycle?.sindhProduction,
      season: productionDashboardData?.seasonCycle?.sindhSession,
      percentage: Number(
        productionDashboardData?.seasonCycle?.sindhPercentage.toFixed(2)
      ),
      color: "#e61313",
    },
    {
      label: "B-tan",
      value: productionDashboardData?.seasonCycle?.balochistanProduction,
      season: productionDashboardData?.seasonCycle?.balochistanSession,
      percentage: Number(
        productionDashboardData?.seasonCycle?.balochistanPercentage.toFixed(2)
      ),
      color: "#B8885A",
    },

    {
      label: "KPK",
      value: productionDashboardData?.seasonCycle?.kpkProduction,
      season: productionDashboardData?.seasonCycle?.kpkSession,
      percentage: Number(
        productionDashboardData?.seasonCycle?.kpkPercentage.toFixed(2)
      ),
      color: "#37b5ef",
    },
  ];

  return (
    <MyThinBarChart
      heading={
        <Flex justify="between" align="center" className="!mb-2.5">
          <Heading weight="medium" className="!text-sm !text-white">
            Season Production
          </Heading>
          {/* <Flex>
            In this Week <GoTriangleDown size={21} />
          </Flex> */}
          <Text weight="medium" className="!text-white" size="2">
            {productionDashboardData?.seasonCycle?.totalProduction}
          </Text>
        </Flex>
      }
      height={173}
      data={tinyBarChartData}
      layout="vertical"
    />
  );
};

export default BarChartPreview;
