import {
  Box,
  Button,
  Checkbox,
  Flex,
  IconButton,
  ScrollArea,
  Table,
  Text,
} from "@radix-ui/themes";
import TableHeader from "../table/TableHeader";
import TableRoot from "../table/TableRoot";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa";
import Image from "next/image";

const List = () => {
  const headers = [
    "S. No.",
    "District",
    "Flour Mills",
    "No. of Atta Dealer/Retailer",
    "Quantity Purchased",
    "Quantity Grinded",
    "Wheat Balance",
    "Flour Bags Produced 10Kg",
    "Flour Bags Produced 20Kg",
    "Flour Bags Provided to the Market 10Kg",
    "Flour Bags Provided to the Market 20Kg",
    "Balance Flour Bags 10Kg",
    "Balance Flour Bags 20Kg",
    "Existing Stock",
  ];
  return (
    <>
      {/* <ScrollArea type="auto" scrollbars="both" style={{ height: "70vh" }}>
        <TableRoot>
          <TableHeader>
            <Table.Row className="!text-[#717680]">
              <Table.ColumnHeaderCell className="!text-nowrap !py-3 !px-6 !bg-white !fixed !top-0">
                <Text as="label" className="!font-semibold !text-xs">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Flex gap="1" align="center">
                      <Text>S.No</Text>
                      <FaArrowDown size={12} className="text-[#A4A7AE]" />
                    </Flex>
                  </Flex>
                </Text>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="!text-nowrap !py-3 !px-6 text-[#535862]">
                <Flex gap="1" align="center">
                  <Text>District</Text>
                  <FaArrowUp size={12} className="text-primary" />
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="!text-nowrap !py-3 !px-6 text-[#535862]">
                <Flex gap="1" align="center">
                  <Text>Flour Mills</Text>
                  <FaArrowDown size={12} className="text-[#A4A7AE]" />
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="!text-nowrap !py-3 !px-6 text-[#535862]">
                <Flex gap="1" align="center">
                  <Text>Quantity Purchased</Text>
                  <FaArrowDown size={12} className="text-[#A4A7AE]" />
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="!text-nowrap !py-3 !px-6 text-[#535862]">
                <Flex gap="1" align="center">
                  <Text>No. of Atta Dealer/Retailer</Text>
                  <FaArrowDown size={12} className="text-[#A4A7AE]" />
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="!text-nowrap !py-3 !px-6 text-[#535862]">
                <Flex gap="1" align="center">
                  <Text>Quantity Grinded</Text>
                  <FaArrowDown size={12} className="text-[#A4A7AE]" />
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="!text-nowrap !py-3 !px-6 text-[#535862]">
                <Flex gap="1" align="center">
                  <Text>Wheat Balance</Text>
                  <FaArrowDown size={12} className="text-[#A4A7AE]" />
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="!text-nowrap !py-3 !px-6 text-[#535862]">
                <Flex gap="1" align="center">
                  <Text>Flour Bags Produced 10Kg</Text>
                  <FaArrowDown size={12} className="text-[#A4A7AE]" />
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="!text-nowrap !py-3 !px-6 text-[#535862]">
                <Flex gap="1" align="center">
                  <Text>Flour Bags Produced 20Kg</Text>
                  <FaArrowDown size={12} className="text-[#A4A7AE]" />
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="!text-nowrap !py-3 !px-6 text-[#535862]">
                <Flex gap="1" align="center">
                  <Text>Flour Bags Provided to the Market 10Kg</Text>
                  <FaArrowDown size={12} className="text-[#A4A7AE]" />
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="!text-nowrap !py-3 !px-6 text-[#535862]">
                <Flex gap="1" align="center">
                  <Text>Flour Bags Provided to the Market 20Kg</Text>
                  <FaArrowDown size={12} className="text-[#A4A7AE]" />
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="!text-nowrap !py-3 !px-6 text-[#535862]">
                <Flex gap="1" align="center">
                  <Text>Balance Flour Bags 10Kg</Text>
                  <FaArrowDown size={12} className="text-[#A4A7AE]" />
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="!text-nowrap !py-3 !px-6 text-[#535862]">
                <Flex gap="1" align="center">
                  <Text>Balance Flour Bags 20Kg</Text>
                  <FaArrowDown size={12} className="text-[#A4A7AE]" />
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="!text-nowrap !py-3 !px-6 text-[#535862]">
                <Flex gap="1" align="center">
                  <Text>Existing Stock</Text>
                  <FaArrowDown size={12} className="text-[#A4A7AE]" />
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="!text-nowrap !py-3 !px-6 text-[#535862]"></Table.ColumnHeaderCell>
            </Table.Row>
          </TableHeader>

          <Table.Body className="bg-theme text-sm">
            <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
              <Table.RowHeaderCell className="!py-4 !px-6 !align-middle">
                <Text as="label" className="!font-semibold !text-xs">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Text>
              </Table.RowHeaderCell>
              <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                Bahawalnagar
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">12</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">87</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">225</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                293.6
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                -68.6
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">558</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                4015
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                9407
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                3334
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                2623
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">681</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                2088.1
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                <IconButton className="!bg-transparent !cursor-pointer">
                  <Image
                    src="/icons/eye.svg"
                    alt="eye"
                    width={20}
                    height={20}
                    style={{ width: "20px", height: "20px" }}
                  />
                </IconButton>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="hover:bg-[#C6C6C61A] transition-colors">
              <Table.RowHeaderCell className="!py-4 !px-6 !align-middle">
                <Text as="label" className="!font-semibold !text-xs">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>2</Text>
                  </Flex>
                </Text>
              </Table.RowHeaderCell>
              <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                DG Khan
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">12</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">87</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">225</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                293.6
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                -68.6
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">558</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                4015
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                9407
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                3334
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                2623
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">681</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                2088.1
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                <IconButton className="!bg-transparent !cursor-pointer">
                  <Image
                    src="/icons/eye.svg"
                    alt="eye"
                    width={20}
                    height={20}
                    style={{ width: "20px", height: "20px" }}
                  />
                </IconButton>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
              <Table.RowHeaderCell className="!py-4 !px-6 !align-middle">
                <Text as="label" className="!font-semibold !text-xs">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>3</Text>
                  </Flex>
                </Text>
              </Table.RowHeaderCell>
              <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                Lahore
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">12</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">87</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">225</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                293.6
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                -68.6
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">558</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                4015
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                9407
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                3334
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                2623
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">681</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                2088.1
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                <IconButton className="!bg-transparent !cursor-pointer">
                  <Image
                    src="/icons/eye.svg"
                    alt="eye"
                    width={20}
                    height={20}
                    style={{ width: "20px", height: "20px" }}
                  />
                </IconButton>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
              <Table.RowHeaderCell className="!py-4 !px-6 !align-middle">
                <Text as="label" className="!font-semibold !text-xs">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Text>
              </Table.RowHeaderCell>
              <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                Bahawalnagar
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">12</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">87</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">225</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                293.6
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                -68.6
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">558</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                4015
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                9407
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                3334
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                2623
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">681</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                2088.1
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                <IconButton className="!bg-transparent !cursor-pointer">
                  <Image
                    src="/icons/eye.svg"
                    alt="eye"
                    width={20}
                    height={20}
                    style={{ width: "20px", height: "20px" }}
                  />
                </IconButton>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="hover:bg-[#C6C6C61A] transition-colors">
              <Table.RowHeaderCell className="!py-4 !px-6 !align-middle">
                <Text as="label" className="!font-semibold !text-xs">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>2</Text>
                  </Flex>
                </Text>
              </Table.RowHeaderCell>
              <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                DG Khan
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">12</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">87</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">225</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                293.6
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                -68.6
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">558</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                4015
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                9407
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                3334
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                2623
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">681</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                2088.1
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                <IconButton className="!bg-transparent !cursor-pointer">
                  <Image
                    src="/icons/eye.svg"
                    alt="eye"
                    width={20}
                    height={20}
                    style={{ width: "20px", height: "20px" }}
                  />
                </IconButton>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
              <Table.RowHeaderCell className="!py-4 !px-6 !align-middle">
                <Text as="label" className="!font-semibold !text-xs">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>3</Text>
                  </Flex>
                </Text>
              </Table.RowHeaderCell>
              <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                Lahore
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">12</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">87</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">225</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                293.6
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                -68.6
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">558</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                4015
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                9407
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                3334
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                2623
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">681</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                2088.1
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                <IconButton className="!bg-transparent !cursor-pointer">
                  <Image
                    src="/icons/eye.svg"
                    alt="eye"
                    width={20}
                    height={20}
                    style={{ width: "20px", height: "20px" }}
                  />
                </IconButton>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
              <Table.RowHeaderCell className="!py-4 !px-6 !align-middle">
                <Text as="label" className="!font-semibold !text-xs">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>3</Text>
                  </Flex>
                </Text>
              </Table.RowHeaderCell>
              <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                Lahore
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">12</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">87</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">225</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                293.6
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                -68.6
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">558</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                4015
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                9407
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                3334
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                2623
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">681</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                2088.1
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                <IconButton className="!bg-transparent !cursor-pointer">
                  <Image
                    src="/icons/eye.svg"
                    alt="eye"
                    width={20}
                    height={20}
                    style={{ width: "20px", height: "20px" }}
                  />
                </IconButton>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
              <Table.RowHeaderCell className="!py-4 !px-6 !align-middle">
                <Text as="label" className="!font-semibold !text-xs">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>3</Text>
                  </Flex>
                </Text>
              </Table.RowHeaderCell>
              <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                Lahore
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">12</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">87</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">225</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                293.6
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                -68.6
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">558</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                4015
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                9407
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                3334
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                2623
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">681</Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                2088.1
              </Table.Cell>
              <Table.Cell className="!py-4 !px-6 !align-middle">
                <IconButton className="!bg-transparent !cursor-pointer">
                  <Image
                    src="/icons/eye.svg"
                    alt="eye"
                    width={20}
                    height={20}
                    style={{ width: "20px", height: "20px" }}
                  />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </TableRoot>
      </ScrollArea> */}
      <TableRoot className="border-collapse w-full">
        <ScrollArea type="auto" scrollbars="both" style={{ height: "70vh" }}>
          <Box>
            <TableHeader>
              <Table.Row className="!text-[#717680]">
                {headers?.map((header, i) => {
                  if (i === 0) {
                    return (
                      <Table.ColumnHeaderCell key={i} className="!text-nowrap !py-3 !px-6 !sticky !top-0 !bg-white !z-20">
                        <Text as="label" className="!font-semibold !text-xs">
                          <Flex gap="3" align="center">
                            <Checkbox />
                            <Flex gap="1" align="center">
                              <Text>S.No</Text>
                              <FaArrowDown
                                size={12}
                                className="text-[#A4A7AE]"
                              />
                            </Flex>
                          </Flex>
                        </Text>
                      </Table.ColumnHeaderCell>
                    );
                  } else {
                    return (
                      <Table.ColumnHeaderCell key={i} className="!text-nowrap !py-3 !px-6 !text-[#535862] !sticky !top-0 !bg-white !z-20">
                        <Flex gap="1" align="center">
                          <Text>{header}</Text>
                          <FaArrowUp size={12} className="text-primary" />
                        </Flex>
                      </Table.ColumnHeaderCell>
                    );
                  }
                })}
                <Table.ColumnHeaderCell className="!text-nowrap !py-3 !px-6 !text-[#535862] !sticky !top-0 !bg-white !z-20"></Table.ColumnHeaderCell>
                {/* repeat more headers with same sticky + bg */}
              </Table.Row>
            </TableHeader>

            <Table.Body className="bg-theme text-sm">
              <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
                <Table.RowHeaderCell className="!py-4 !px-6 !align-middle sticky left-0 bg-[#FAFAFA] z-10">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                  Bahawalnagar
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  12
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  87
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  225
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  293.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  -68.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  558
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  4015
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  9407
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  3334
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2623
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  681
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2088.1
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  <IconButton className="!bg-transparent !cursor-pointer">
                    <Image
                      src="/icons/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Table.Cell>
                {/* more cells */}
              </Table.Row>
              <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
                <Table.RowHeaderCell className="!py-4 !px-6 !align-middle sticky left-0 bg-[#FAFAFA] z-10">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                  Bahawalnagar
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  12
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  87
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  225
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  293.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  -68.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  558
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  4015
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  9407
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  3334
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2623
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  681
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2088.1
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  <IconButton className="!bg-transparent !cursor-pointer">
                    <Image
                      src="/icons/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Table.Cell>
                {/* more cells */}
              </Table.Row>
              <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
                <Table.RowHeaderCell className="!py-4 !px-6 !align-middle sticky left-0 bg-[#FAFAFA] z-10">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                  Bahawalnagar
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  12
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  87
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  225
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  293.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  -68.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  558
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  4015
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  9407
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  3334
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2623
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  681
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2088.1
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  <IconButton className="!bg-transparent !cursor-pointer">
                    <Image
                      src="/icons/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Table.Cell>
                {/* more cells */}
              </Table.Row>
              <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
                <Table.RowHeaderCell className="!py-4 !px-6 !align-middle sticky left-0 bg-[#FAFAFA] z-10">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                  Bahawalnagar
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  12
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  87
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  225
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  293.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  -68.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  558
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  4015
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  9407
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  3334
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2623
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  681
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2088.1
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  <IconButton className="!bg-transparent !cursor-pointer">
                    <Image
                      src="/icons/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Table.Cell>
                {/* more cells */}
              </Table.Row>
              <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
                <Table.RowHeaderCell className="!py-4 !px-6 !align-middle sticky left-0 bg-[#FAFAFA] z-10">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                  Bahawalnagar
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  12
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  87
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  225
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  293.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  -68.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  558
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  4015
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  9407
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  3334
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2623
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  681
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2088.1
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  <IconButton className="!bg-transparent !cursor-pointer">
                    <Image
                      src="/icons/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Table.Cell>
                {/* more cells */}
              </Table.Row>
              <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
                <Table.RowHeaderCell className="!py-4 !px-6 !align-middle sticky left-0 bg-[#FAFAFA] z-10">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                  Bahawalnagar
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  12
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  87
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  225
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  293.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  -68.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  558
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  4015
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  9407
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  3334
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2623
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  681
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2088.1
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  <IconButton className="!bg-transparent !cursor-pointer">
                    <Image
                      src="/icons/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Table.Cell>
                {/* more cells */}
              </Table.Row>
              <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
                <Table.RowHeaderCell className="!py-4 !px-6 !align-middle sticky left-0 bg-[#FAFAFA] z-10">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                  Bahawalnagar
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  12
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  87
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  225
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  293.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  -68.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  558
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  4015
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  9407
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  3334
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2623
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  681
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2088.1
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  <IconButton className="!bg-transparent !cursor-pointer">
                    <Image
                      src="/icons/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Table.Cell>
                {/* more cells */}
              </Table.Row>
              <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
                <Table.RowHeaderCell className="!py-4 !px-6 !align-middle sticky left-0 bg-[#FAFAFA] z-10">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                  Bahawalnagar
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  12
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  87
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  225
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  293.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  -68.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  558
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  4015
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  9407
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  3334
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2623
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  681
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2088.1
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  <IconButton className="!bg-transparent !cursor-pointer">
                    <Image
                      src="/icons/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Table.Cell>
                {/* more cells */}
              </Table.Row>
              <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
                <Table.RowHeaderCell className="!py-4 !px-6 !align-middle sticky left-0 bg-[#FAFAFA] z-10">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                  Bahawalnagar
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  12
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  87
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  225
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  293.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  -68.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  558
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  4015
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  9407
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  3334
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2623
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  681
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2088.1
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  <IconButton className="!bg-transparent !cursor-pointer">
                    <Image
                      src="/icons/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Table.Cell>
                {/* more cells */}
              </Table.Row>
              <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
                <Table.RowHeaderCell className="!py-4 !px-6 !align-middle sticky left-0 bg-[#FAFAFA] z-10">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                  Bahawalnagar
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  12
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  87
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  225
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  293.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  -68.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  558
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  4015
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  9407
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  3334
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2623
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  681
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2088.1
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  <IconButton className="!bg-transparent !cursor-pointer">
                    <Image
                      src="/icons/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Table.Cell>
                {/* more cells */}
              </Table.Row>
              <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
                <Table.RowHeaderCell className="!py-4 !px-6 !align-middle sticky left-0 bg-[#FAFAFA] z-10">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                  Bahawalnagar
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  12
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  87
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  225
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  293.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  -68.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  558
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  4015
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  9407
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  3334
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2623
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  681
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2088.1
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  <IconButton className="!bg-transparent !cursor-pointer">
                    <Image
                      src="/icons/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Table.Cell>
                {/* more cells */}
              </Table.Row>
              <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
                <Table.RowHeaderCell className="!py-4 !px-6 !align-middle sticky left-0 bg-[#FAFAFA] z-10">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                  Bahawalnagar
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  12
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  87
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  225
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  293.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  -68.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  558
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  4015
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  9407
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  3334
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2623
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  681
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2088.1
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  <IconButton className="!bg-transparent !cursor-pointer">
                    <Image
                      src="/icons/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Table.Cell>
                {/* more cells */}
              </Table.Row>
              <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
                <Table.RowHeaderCell className="!py-4 !px-6 !align-middle sticky left-0 bg-[#FAFAFA] z-10">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                  Bahawalnagar
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  12
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  87
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  225
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  293.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  -68.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  558
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  4015
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  9407
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  3334
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2623
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  681
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2088.1
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  <IconButton className="!bg-transparent !cursor-pointer">
                    <Image
                      src="/icons/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Table.Cell>
                {/* more cells */}
              </Table.Row>
              <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
                <Table.RowHeaderCell className="!py-4 !px-6 !align-middle sticky left-0 bg-[#FAFAFA] z-10">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                  Bahawalnagar
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  12
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  87
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  225
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  293.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  -68.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  558
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  4015
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  9407
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  3334
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2623
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  681
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2088.1
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  <IconButton className="!bg-transparent !cursor-pointer">
                    <Image
                      src="/icons/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Table.Cell>
                {/* more cells */}
              </Table.Row>
              <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
                <Table.RowHeaderCell className="!py-4 !px-6 !align-middle sticky left-0 bg-[#FAFAFA] z-10">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                  Bahawalnagar
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  12
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  87
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  225
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  293.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  -68.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  558
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  4015
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  9407
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  3334
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2623
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  681
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2088.1
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  <IconButton className="!bg-transparent !cursor-pointer">
                    <Image
                      src="/icons/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Table.Cell>
                {/* more cells */}
              </Table.Row>
              <Table.Row className="hover:bg-[#C6C6C61A] bg-[#FAFAFA] transition-colors">
                <Table.RowHeaderCell className="!py-4 !px-6 !align-middle sticky left-0 bg-[#FAFAFA] z-10">
                  <Flex gap="3" align="center">
                    <Checkbox />
                    <Text>1</Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell className="!py-4 !px-6 !font-medium !align-middle">
                  Bahawalnagar
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  12
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  87
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  225
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  293.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  -68.6
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  558
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  4015
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  9407
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  3334
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2623
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  681
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  2088.1
                </Table.Cell>
                <Table.Cell className="!py-4 !px-6 !align-middle">
                  <IconButton className="!bg-transparent !cursor-pointer">
                    <Image
                      src="/icons/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Table.Cell>
                {/* more cells */}
              </Table.Row>
            </Table.Body>
          </Box>
        </ScrollArea>
      </TableRoot>

      <Flex justify="between" px="5" pt="3" pb="4">
        <Button className="!border-[#D5D7DA] !border-[1px] !bg-white !text-[#414651] !rounded-lg">
          <FaArrowLeft />
          Previous
        </Button>
        <Flex>
          <Button className="!bg-transparent !font-medium !text-[#252B37]">
            1
          </Button>
          <Button className="!bg-transparent !font-medium !text-[#252B37]">
            1
          </Button>
          <Button className="!bg-transparent !font-medium !text-[#252B37]">
            1
          </Button>
          <Button className="!bg-transparent !font-medium !text-[#252B37]">
            ...
          </Button>
          <Button className="!bg-transparent !font-medium !text-[#252B37]">
            8
          </Button>
          <Button className="!bg-transparent !font-medium !text-[#252B37]">
            9
          </Button>
          <Button className="!bg-transparent !font-medium !text-[#252B37]">
            10
          </Button>
        </Flex>
        <Button className="!border-[#D5D7DA] !border-[1px] !bg-white !text-[#414651] !rounded-lg">
          Next
          <FaArrowRight />
        </Button>
      </Flex>
    </>
  );
};

export default List;
