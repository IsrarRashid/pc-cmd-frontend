"use client";

import { Box, useThemeContext } from "@radix-ui/themes";
import { ReactNode } from "react";
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export interface ChartType {
  label: string;
  value: number;
  color: string;
}

interface Props {
  // mon: number;
  // tue: number;
  // wed: number;
  // thu: number;
  // fri: number;
  // sat: number;
  height?: number;
  data: ChartType[];
  header: ReactNode;
}

export interface ChartType {
  label: string;
  value: number;
  color: string;
}

const MyPieChart = ({
  // mon,
  // tue,
  // wed,
  // thu,
  // fri,
  // sat,
  height = 300,
  data,
  header,
}: Props) => {
  // const data: ChartType[] = [
  //   { label: "Mon", value: mon, color: "#0088FE" },
  //   { label: "Tue", value: tue, color: "#00C49F" },
  //   { label: "Wed", value: wed, color: "#FFBB28" },
  //   { label: "Thu", value: thu, color: "#FF8042" },
  //   { label: "Fri", value: fri, color: "#FF6699" },
  //   { label: "Sat", value: sat, color: "#AA33FF" },
  // ];

  const theme = useThemeContext();

  // find the max
  const maxEntry = data.reduce((prev, curr) =>
    curr.value > prev.value ? curr : prev
  );

  return (
    <Box className="bg-theme rounded-[17px]">
      {header}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart width={600} height={400} data={data}>
          <Tooltip
            contentStyle={{
              backgroundColor:
                theme.appearance === "light" ? "#aa3c31" : "#292932", // Background color of the tooltip
              border: "0px", // Border styling
              borderRadius: "20px", // Rounded corners
              padding: "10px",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
            }}
            labelStyle={{
              fontSize: "16px", // Label font size
              fontWeight: "bold", // Label font weight
              color: "#fff",
            }}
            itemStyle={{
              fontSize: "14px", // Item font size
              fontWeight: "normal", // Item font weight
              color: theme.appearance === "light" ? "#fff" : "#B5B5BE",
            }}
          />
          <Pie
            dataKey="value"
            fill="#aa3c31"
            innerRadius={40}
            nameKey="label" // 👈 tell Legend to use "label"
            outerRadius={60}
            paddingAngle={2}
            cornerRadius={3.31}
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.label}`} fill={entry.color} />
            ))}
            {/* Center text */}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  const { cx, cy } = viewBox;
                  return (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{ fontSize: "14px", fill: "#333" }}
                    >
                      <tspan x={cx} dy="-0.4em" fontSize="20" fontWeight="bold">
                        {maxEntry.value}
                      </tspan>
                      <tspan x={cx} dy="1.2em" fontSize="12" fill="#666">
                        {maxEntry.label}
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
          </Pie>
          {/* <Legend
            verticalAlign="bottom"
            align="center"
            layout="vertical"
            iconType="circle"
          /> */}
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MyPieChart;
