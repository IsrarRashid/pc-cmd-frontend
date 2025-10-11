import { Table, Text } from "@radix-ui/themes";
import Card from "./Card";
import { ProductionDashboard } from "@/app/page";
import classnames from "classnames";

const PunjabTableTile = ({
  productionDashboardData,
}: {
  productionDashboardData: ProductionDashboard;
}) => {
  return (
    <Card>
      <Text
        as="p"
        align="center"
        weight="medium"
        className="!text-xs !text-white !py-[5px] !px-[10px] !bg-[#002344] !leading-[1.108em] font-sans"
      >
        Punjab Production, Consumption & Deficit
      </Text>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="!bg-[#02325F] !text-[#FEB019] !font-normal !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
              Division
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="!bg-[#02325F] !text-[#FEB019] !font-normal !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
              Production
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="!bg-[#02325F] !text-[#FEB019] !font-normal !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
              Consumption
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="!bg-[#02325F] !text-[#FEB019] !font-normal !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em] !text-nowrap">
              Surplus / Deficit
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {productionDashboardData?.countryProduction?.provinces
            .find((province) => province.provinceName === "Punjab")
            ?.divisions.map((division) => (
              <Table.Row key={division.divisionId}>
                <Table.RowHeaderCell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                  {division.divisionName}
                </Table.RowHeaderCell>
                <Table.Cell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                  {division.totalProduction}
                </Table.Cell>
                <Table.Cell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                  {division.totalConsumption}
                </Table.Cell>
                <Table.Cell
                  className={classnames({
                    "!text-light-green": division.balance > 0,
                    "!text-danger": division.balance < 0,
                    " !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]":
                      true,
                  })}
                >
                  {division.balance}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default PunjabTableTile;
