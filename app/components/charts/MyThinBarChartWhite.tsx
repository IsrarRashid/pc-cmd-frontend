"use client";

import { Box, Flex, Heading, useThemeContext } from "@radix-ui/themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GoTriangleDown } from "react-icons/go";

export interface ChartType {
  label: string;
  value: number;
  color?: string;
}

interface Props {
  mon?: number;
  tue?: number;
  wed?: number;
  thu?: number;
  fri?: number;
  sat?: number;
  heading: string;
  height: number;
  data: ChartType[];
  layout?: "vertical" | "horizontal";
}

const MyThinBarChartWhite = ({
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
    <Box
      className="bg-theme bg-white rounded-[14px] border-[#E2E8F0] border-[1px]"
      p="5"
    >
      <Flex justify="between" align="center" className="mb-[30px]">
        <Heading weight="medium" className="text-[1.563rem]">
          {heading}
        </Heading>
        <Flex>
          In this Week <GoTriangleDown size={21} />
        </Flex>
      </Flex>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          layout={layout}
          width={500}
          height={300}
          data={data}
          margin={
            layout === "vertical"
              ? { top: 0, right: 0, left: 0, bottom: 0 }
              : { top: 0, right: 0, left: 0, bottom: 0 }
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
              />
              <YAxis
                type="category"
                dataKey="label"
                tick={{ fill: "#fff" }}
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
          <Tooltip {...tooltipStyles} />
          <CartesianGrid
            strokeDasharray="10 10"
            vertical={false}
            stroke="#44444F"
            strokeWidth={2}
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
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MyThinBarChartWhite;
