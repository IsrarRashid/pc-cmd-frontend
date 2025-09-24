"use client";

import {
  Badge,
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  Text,
  TextField,
  useThemeContext,
} from "@radix-ui/themes";
import { FiSearch } from "react-icons/fi";
import { LuCloudUpload } from "react-icons/lu";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import List from "../home/List";

interface Props {
  mon: number;
  tue: number;
  wed: number;
  thu: number;
  fri: number;
  sat: number;
  heading: string;
  height: number;
}

const MyBarChartDialog = ({
  mon,
  tue,
  wed,
  thu,
  fri,
  sat,
  heading,
  height,
}: Props) => {
  const data = [
    {
      label: "Mon",
      value: mon,
    },
    {
      label: "Tue",
      value: tue,
    },
    {
      label: "Wed",
      value: wed,
    },
    {
      label: "Thu",
      value: thu,
    },
    {
      label: "Fri",
      value: fri,
    },
    {
      label: "Sat",
      value: sat,
    },
  ];

  const theme = useThemeContext();

  return (
    <Box
      className="bg-theme rounded-[14px] border-[#E2E8F0] border-[1px]"
      p="5"
    >
      <Flex justify="between" align="center" className="mb-[30px]">
        <Heading className="!font-semibold" size="5">
          {heading}
        </Heading>
        {/* <Flex>
          In this Week <GoTriangleDown size={21} />
        </Flex> */}
      </Flex>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            left: -20,
            right: 10,
            bottom: -10,
          }}
          barSize={50}
        >
          <XAxis
            dataKey="label"
            scale="point"
            padding={{ left: 30, right: 30 }}
          />
          <YAxis />
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
          <Dialog.Root>
            <Dialog.Trigger>
              <g role="button">
                <Bar
                  dataKey="value"
                  fill="#aa3c31"
                  radius={4.59}
                  cursor="pointer"
                />
              </g>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="1127px" className="!p-0">
              <Dialog.Title className="sr-only">title</Dialog.Title>
              <Dialog.Description className="sr-only" size="2" mb="4">
                Make changes to your profile.
              </Dialog.Description>

              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 !py-5 !px-6">
                <Flex align="center" gap="2">
                  <Text weight="bold" size="5" className="text-[#181D27]">
                    Users
                  </Text>
                  <Badge
                    radius="full"
                    variant="outline"
                    className="!text-primary !shadow-[0px_0px_0px_1px_#AA3C31] bg-[rgba(170,60,49,0.1)]"
                  >
                    In progress
                  </Badge>
                </Flex>
                <Box>
                  <Flex align="center" gap="3" justify="end">
                    <TextField.Root
                      placeholder="Search"
                      size="3"
                      className="!bg-white !h-10 !rounded-lg !shadow-[0px_0px_0px_1px_#D5D7DA] py-2.5 px-3.5"
                    >
                      <TextField.Slot className="!font-medium">
                        <FiSearch size={15} className="text-[#717680]" />
                      </TextField.Slot>
                    </TextField.Root>
                    <Button className="!font-semibold !text-sm !px-3.5 !py-2.5 !rounded-lg !text-[rgba(65,70,81,1)] !bg-white !h-full !shadow-[0px_0px_0px_1px_#D5D7DA]">
                      Download all
                    </Button>
                    <Button className="!text-white !bg-primary !h-full !rounded-lg !text-sm !shadow-[0px_0px_0px_1.5px_rgba(58,58,58,0.1)] !px-3.5 !py-2.5 ">
                      <LuCloudUpload size={20} />
                      Upload
                    </Button>
                  </Flex>
                </Box>
              </div>

              <List />

              {/* <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button>Save</Button>
                </Dialog.Close>
              </Flex> */}
            </Dialog.Content>
          </Dialog.Root>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MyBarChartDialog;
