"use client";

import { Box, useThemeContext } from "@radix-ui/themes";
import { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../home/Card";

export interface ChartType {
  label: string;
  value: number;
  season: string;
  percentage: number;
  color?: string;
}

interface Props {
  mon?: number;
  tue?: number;
  wed?: number;
  thu?: number;
  fri?: number;
  sat?: number;
  heading: ReactNode;
  height: number;
  data: ChartType[];
  layout?: "vertical" | "horizontal";
}

const MyThinBarChart = ({
  heading,
  height,
  data,
  layout = "horizontal",
}: Props) => {
  // const data = [
  //   {
  //     label: "Mon",
  //     value: mon,
  //   },
  //   {
  //     label: "Tue",
  //     value: tue,
  //   },
  //   {
  //     label: "Wed",
  //     value: wed,
  //   },
  //   {
  //     label: "Thu",
  //     value: thu,
  //   },
  //   {
  //     label: "Fri",
  //     value: fri,
  //   },
  //   {
  //     label: "Sat",
  //     value: sat,
  //   },
  // ];

  const theme = useThemeContext();

  const tooltipStyles = {
    contentStyle: {
      backgroundColor: theme.appearance === "light" ? "#1E1B39" : "#292932",
      border: "0px",
      borderRadius: "20px",
      padding: "10px",
      boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
    },
    labelStyle: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#fff",
    },
    itemStyle: {
      fontSize: "14px",
      fontWeight: "normal",
      color: theme.appearance === "light" ? "#fff" : "#B5B5BE",
    },
  };

  return (
    <Card>
      <Box className="py-2.5 px-5">
        {heading}
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            layout={layout}
            width={500}
            height={300}
            data={data}
            margin={
              layout === "vertical"
                ? { top: 0, right: 10, left: -10, bottom: 0 }
                : { top: 20, right: 10, left: 20, bottom: 10 }
            }
            barSize={25}
          >
            {layout === "vertical" ? (
              <>
                {/* Vertical Layout */}
                <XAxis
                  type="number"
                  tickFormatter={(value) => `${value} T`}
                  domain={[0, "dataMax + 10"]}
                  tick={{ fill: "rgba(255, 255, 255, 0.64)" }}
                />
                <YAxis
                  type="category"
                  dataKey="label"
                  tick={{ fill: "rgba(255, 255, 255, 0.64)" }}
                  width={70}
                />
              </>
            ) : (
              <>
                {/* Horizontal Layout */}
                <XAxis
                  dataKey="label"
                  scale="point"
                  padding={{ left: 30, right: 30 }}
                  tick={{ fill: "#fff" }}
                />
                <YAxis
                  tickFormatter={(value) => `${value} T`}
                  tick={{ fill: "#fff" }}
                />
              </>
            )}
            <Tooltip {...tooltipStyles} cursor={{ fill: "transparent" }} />
            <CartesianGrid
              strokeDasharray="10 10"
              vertical={true}
              horizontal={false}
              stroke="rgba(53, 82, 151, 0.4)"
              strokeWidth={1}
            />
            <Bar
              dataKey="value"
              fill="color"
              radius={
                layout === "vertical"
                  ? [0, 10, 10, 0] // rounded right side
                  : [10, 10, 0, 0] // rounded top
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || "#EAA64D"} // fallback to default color
                />
              ))}
              {/* ✅ Show Values Inside Bar */}
              <LabelList
                dataKey="value"
                position={layout === "vertical" ? "insideLeft" : "top"} // adjust per layout
                fill="#000"
                fontSize={14}
                fontWeight="normal"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default MyThinBarChart;
