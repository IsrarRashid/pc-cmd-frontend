import React from "react";
import MyThinBarChart, { ChartType } from "../charts/MyThinBarChart";
import { ProductionDashboard } from "@/app/page";

const BarChartPreview = ({
  productionDashboardData,
}: {
  productionDashboardData: ProductionDashboard;
}) => {
  const tinyBarChartData: ChartType[] = [
    {
      label: "totalProduction",
      value: productionDashboardData.seasonCycle.punjabProduction,
      color: "#038907",
    },
    {
      label: "Punjab",
      value: productionDashboardData.seasonCycle.punjabProduction,
      color: "#f0f036",
    },
    {
      label: "Sindh",
      value: productionDashboardData.seasonCycle.sindhProduction,
      color: "#e61313",
    },
    {
      label: "Balochistan",
      value: productionDashboardData.seasonCycle.balochistanProduction,
      color: "#B8885A",
    },

    {
      label: "KPK",
      value: productionDashboardData.seasonCycle.kpkProduction,
      color: "#37b5ef",
    },
  ];

  return (
    <MyThinBarChart
      heading="Season Production"
      height={200}
      data={tinyBarChartData}
      layout="vertical"
    />
  );
};

export default BarChartPreview;
