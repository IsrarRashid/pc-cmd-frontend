"use client";

import { ProductionDashboard } from "@/app/page";
import { Box, Flex, useThemeContext } from "@radix-ui/themes";
import { ReactNode } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../home/Card";

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

const CustomAreaChart = ({
  data,
  heading,
  height,
  other,
  productionDashboardData,
}: Props) => {
  const theme = useThemeContext();

  // Define color constants for stroke and gradient stops
  const RED_COLOR = "#e61313";
  const GREEN_COLOR = "#038907";
  const BLUE_COLOR = "#008FFB";
  const CYAN_COLOR = "#F0F036";
  const ORANGE_COLOR = "#008FFB";

  const GRADIENT_OPACITY = 0.8;

  return (
    <Card>
      <Box className="py-2.5 px-5">
        <Flex justify="between" align="center" className="mb-2.5 ">
          {heading}
          {/* <DropdownMenu.Root>
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
          </DropdownMenu.Root> */}
        </Flex>

        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data}>
            {/* 1. Define Gradients in <defs> */}
            <defs>
              {/* Red Line Gradient: from 80% opacity to 0% */}
              <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={RED_COLOR}
                  stopOpacity={GRADIENT_OPACITY}
                />
                <stop offset="95%" stopColor={RED_COLOR} stopOpacity={0} />
              </linearGradient>

              {/* Green Line Gradient */}
              <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={GREEN_COLOR}
                  stopOpacity={GRADIENT_OPACITY}
                />
                <stop offset="95%" stopColor={GREEN_COLOR} stopOpacity={0} />
              </linearGradient>

              {/* Blue Line Gradient */}
              <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={BLUE_COLOR}
                  stopOpacity={GRADIENT_OPACITY}
                />
                <stop offset="95%" stopColor={BLUE_COLOR} stopOpacity={0} />
              </linearGradient>

              {/* Cyan Line Gradient */}
              <linearGradient id="colorCyan" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={CYAN_COLOR}
                  stopOpacity={GRADIENT_OPACITY}
                />
                <stop offset="95%" stopColor={CYAN_COLOR} stopOpacity={0} />
              </linearGradient>

              {/* Orange Line Gradient */}
              <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={ORANGE_COLOR}
                  stopOpacity={GRADIENT_OPACITY}
                />
                <stop offset="95%" stopColor={ORANGE_COLOR} stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* 2. Apply Gradient fill and Solid Line stroke */}

            <Area
              type="monotone"
              dataKey="redLine"
              name={
                productionDashboardData?.topSupplyChains?.[0]?.provinceName ||
                "Province 1"
              }
              stroke={RED_COLOR} // Solid Line (Highlight)
              strokeWidth={3}
              fill="url(#colorRed)" // Gradient Fill
              // strokeDasharray="5 5"
            />

            <Area
              type="monotone"
              dataKey="greenLine"
              name={
                productionDashboardData?.topSupplyChains?.[1]?.provinceName ||
                "Province 2"
              }
              stroke={GREEN_COLOR} // Solid Line (Highlight)
              strokeWidth={3}
              fill="url(#colorGreen)" // Gradient Fill
            />

            <Area
              type="monotone"
              dataKey="blueLine"
              name={
                productionDashboardData?.topSupplyChains?.[2]?.provinceName ||
                "Province 3"
              }
              stroke={BLUE_COLOR} // Solid Line (Highlight)
              strokeWidth={3}
              fill="url(#colorBlue)" // Gradient Fill
              // strokeDasharray="5 5"
            />

            <Area
              type="monotone"
              dataKey="cyanLine"
              name={
                productionDashboardData?.topSupplyChains?.[3]?.provinceName ||
                "Province 4"
              }
              stroke={CYAN_COLOR} // Solid Line (Highlight)
              strokeWidth={3}
              fill="url(#colorCyan)" // Gradient Fill
            />

            <Area
              type="monotone"
              dataKey="orangeLine"
              name={
                productionDashboardData?.topSupplyChains?.[4]?.provinceName ||
                "Province 5"
              }
              stroke={ORANGE_COLOR} // Solid Line (Highlight)
              strokeWidth={3}
              fill="url(#colorOrange)" // Gradient Fill
            />

            {/* XAxis, YAxis, Tooltip, and CartesianGrid remain unchanged */}
            <XAxis
              dataKey="label"
              scale="point"
              padding={{ left: 30, right: 30 }}
              dy={10}
              tick={{ fill: "#fff" }}
            />
            <YAxis
              label={{
                value: "Available in Quintals",
                angle: -90,
                position: "insideLeft",
                dy: 60,
                fontWeight: "normal",
                fill: "#fff",
              }}
              tick={{ fill: "#fff" }}
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
          </AreaChart>
        </ResponsiveContainer>
        {other}
      </Box>
    </Card>
  );
};

export default CustomAreaChart;
