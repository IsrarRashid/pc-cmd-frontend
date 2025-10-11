"use client";

import { Box, useThemeContext } from "@radix-ui/themes";
import { ReactNode } from "react";
import {
  Cell,
  Label,
  Pie,
  PieChart,
  PieLabelRenderProps,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export interface ChartType {
  label: string;
  value: number;
  color: string;
  [key: string]: string | number; // 👈 add this index signature
}

interface Props {
  height?: number;
  data: ChartType[];
  header: ReactNode;
  otherValue: number;
}

const MyPieChart = ({ height = 300, data, header, otherValue }: Props) => {
  const theme = useThemeContext();

  const RADIAN = Math.PI / 180;

  // ✅ Custom label positioned slightly outside the slice
  const renderCustomizedLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, outerRadius, value, name } = props;

    const numCx = Number(cx ?? 0);
    const numCy = Number(cy ?? 0);
    const numMidAngle = Number(midAngle ?? 0);
    const numOuterRadius = Number(outerRadius ?? 50);
    const numValue = Number(value ?? 0);

    const radius = numOuterRadius + 10;
    const x = numCx + radius * Math.cos(-numMidAngle * RADIAN);
    const y = numCy + radius * Math.sin(-numMidAngle * RADIAN);

    // 👇 Add minus sign manually if deficit & negative
    const displayValue =
      name === "Deficit" && otherValue < 0 ? `-${numValue}` : numValue;

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor={x > numCx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="600"
      >
        {displayValue}
      </text>
    );
  };

  // ✅ find max entry for center label
  // const maxEntry = data.reduce((prev, curr) =>
  //   curr.value > prev.value ? curr : prev
  // );

  return (
    <Box className="bg-theme rounded-[17px]">
      {header}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Tooltip
            content={({ payload }) => {
              if (!payload || payload.length === 0) return null;
              const { name, value } = payload[0];
              const displayValue =
                name === "Deficit" && otherValue < 0 ? `-${value}` : value;

              return (
                <div
                  style={{
                    backgroundColor:
                      theme.appearance === "light" ? "#002344" : "#292932",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    color: "#fff",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                    {name}
                  </div>
                  <div style={{ fontSize: "13px" }}>{displayValue}</div>
                </div>
              );
            }}
            contentStyle={{
              backgroundColor:
                theme.appearance === "light" ? "#002344" : "#292932",
              border: "0px",
              borderRadius: "18px",
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

          <Pie
            data={data} // 👈 fix here
            dataKey="value"
            nameKey="label"
            innerRadius={35}
            outerRadius={55}
            paddingAngle={2}
            cornerRadius={4}
            labelLine={false}
            label={renderCustomizedLabel}
            stroke="none" // 👈 remove border line
            strokeWidth={0} // 👈 ensure it's fully gone
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.label}`} fill={entry.color} />
            ))}

            {/* ✅ Center Label - dynamically based on max value */}
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
                      style={{ fill: "#fff" }}
                    >
                      <tspan x={cx} dy="-0.4em" fontSize="16" fontWeight="700">
                        {data[2].label}
                      </tspan>
                      <tspan
                        x={cx}
                        dy="1.4em"
                        fontSize="12"
                        fontWeight="500"
                        fill="#fff"
                      >
                        {otherValue > 0 ? data[2].value : `-${data[2].value}`}
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MyPieChart;
