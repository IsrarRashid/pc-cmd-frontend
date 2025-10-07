"use client";

import { ProductionDashboard } from "@/app/page";
import {
  Box,
  Button,
  DropdownMenu,
  Flex,
  useThemeContext,
} from "@radix-ui/themes";
import { ReactNode } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type LineChartData = {
  label: string;
  redLine?: number;
  greenLine?: number;
  blueLine?: number;
  cyanLine?: number;
  orangeLine?: number;
};

type Props = {
  data: LineChartData[];
  heading: ReactNode;
  height: number;
  other?: ReactNode;
  productionDashboardData: ProductionDashboard;
};

const CustomLineChart = ({
  data,
  heading,
  height,
  other,
  productionDashboardData,
}: Props) => {
  const theme = useThemeContext();

  return (
    <Box className="bg-theme bg-white rounded-[17px]" p="4">
      <Flex justify="between" align="center">
        {heading}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button className="!bg-[#1E1B39] !rounded-[13px] !text-sm !py-[1em] !px-[.5em]">
              In this Week <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item className="data-[highlighted]:!bg-primary">
              Item 1
            </DropdownMenu.Item>
            <DropdownMenu.Item className="data-[highlighted]:!bg-primary">
              Item 2
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>

      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          {/* 5 static lines */}
          <Line
            dataKey="redLine"
            name={
              productionDashboardData?.topSupplyChains?.[0]?.provinceName ||
              "Province 1"
            }
            stroke="#D6191D"
            strokeWidth={3}
            strokeDasharray="5 5"
          />

          <Line
            dataKey="greenLine"
            name={
              productionDashboardData?.topSupplyChains?.[1]?.provinceName ||
              "Province 2"
            }
            stroke="#609052"
            strokeWidth={3}
          />

          <Line
            dataKey="blueLine"
            name={
              productionDashboardData?.topSupplyChains?.[2]?.provinceName ||
              "Province 3"
            }
            stroke="#0378C7"
            strokeWidth={3}
            strokeDasharray="5 5"
          />

          <Line
            dataKey="cyanLine"
            name={
              productionDashboardData?.topSupplyChains?.[3]?.provinceName ||
              "Province 4"
            }
            stroke="#48CAE4"
            strokeWidth={3}
          />

          <Line
            dataKey="orangeLine"
            name={
              productionDashboardData?.topSupplyChains?.[4]?.provinceName ||
              "Province 5"
            }
            stroke="#FFA500"
            strokeWidth={3}
          />

          <XAxis
            dataKey="label"
            scale="point"
            padding={{ left: 30, right: 30 }}
            dy={10}
          />
          <YAxis
            label={{
              value: "Count",
              angle: -90,
              position: "insideLeft",
              dy: 20,
              fontWeight: "bold",
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor:
                theme.appearance === "light" ? "#1E1B39" : "#292932",
              border: "0px",
              borderRadius: "20px",
              padding: "10px",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
            }}
            labelStyle={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#fff",
            }}
            itemStyle={{
              fontSize: "14px",
              color: theme.appearance === "light" ? "#fff" : "#B5B5BE",
            }}
          />
          <CartesianGrid
            strokeDasharray="500 500"
            horizontal={false}
            stroke="#44444F"
            strokeWidth={1}
          />
        </LineChart>
      </ResponsiveContainer>

      {other}
    </Box>
  );
};

export default CustomLineChart;
