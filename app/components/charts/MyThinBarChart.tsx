"use client";

import { Box, Flex, Heading, useThemeContext } from "@radix-ui/themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GoTriangleDown } from "react-icons/go";

export interface ChartType {
  label: string;
  value: number;
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
}

const MyThinBarChart = ({
  mon,
  tue,
  wed,
  thu,
  fri,
  sat,
  heading,
  height,
  data,
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
          width={500}
          height={300}
          data={data}
          margin={{
            left: -5,
            right: 10,
            bottom: -10,
          }}
          barSize={25}
        >
          <XAxis
            dataKey="label"
            scale="point"
            padding={{ left: 30, right: 30 }}
          />
          <YAxis tickFormatter={(value) => `${value} T`} />
          <Tooltip
            contentStyle={{
              backgroundColor:
                theme.appearance === "light" ? "#1E1B39" : "#292932", // Background color of the tooltip
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
          <CartesianGrid
            strokeDasharray="10 10"
            vertical={false}
            stroke="#44444F"
            strokeWidth={2}
          />
          <Bar dataKey="value" fill="#EAA64D" radius={[100, 100, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MyThinBarChart;
