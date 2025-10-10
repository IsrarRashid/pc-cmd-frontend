import { DivisionProduction } from "@/app/page";
import { Box, Table, Text } from "@radix-ui/themes";
import Card from "../../../Card";
import DivisionPieChartPreview from "../../../DivisionPieChartPreview";

type Props = {
  Division: {
    properties: {
      NAME_1?: string; // Province name
      NAME_2?: string; // Division name
    };
  };
  data: DivisionProduction[] | null | undefined;
};

const DivisionCard = ({ Division, data }: Props) => {
  const divisionName = Division.properties.NAME_2 || Division.properties.NAME_1;
  const relatedDivision = data?.find((d) => d.divisionName === divisionName);

  const relatedDistricts = relatedDivision?.districts;

  return (
    <>
      <Card>
        <Box className="p-3">
          {/* <Box className="py-[7px] px-3.5 bg-[#D9ECFF] font-medium">
          <Text as="p" align="center">
            {divisionName} Division Analytics
          </Text>
        </Box> */}
          <DivisionPieChartPreview heading={`${divisionName} Analytics`} />
          <Card>
            <Text
              as="p"
              align="center"
              weight="medium"
              className="!text-xs !text-white !py-[5px] !px-[10px] !bg-[#002344] !leading-[1.108em] font-sans"
            >
              {divisionName} Production, Consumption & Deficit
            </Text>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell className="!bg-[#02325F] !text-[#FEB019] !font-normal !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                    District
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="!bg-[#02325F] !text-[#FEB019] !font-normal !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                    Production
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="!bg-[#02325F] !text-[#FEB019] !font-normal !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                    Consumption
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="!bg-[#02325F] !text-[#FEB019] !font-normal !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                    Deficit
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {relatedDistricts && relatedDistricts.length > 0 ? (
                  relatedDistricts.map((district) => (
                    <Table.Row key={district.districtId}>
                      <Table.RowHeaderCell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        {district.districtName}
                      </Table.RowHeaderCell>
                      <Table.Cell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        {district.totalProduction}
                      </Table.Cell>
                      <Table.Cell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        consumption
                      </Table.Cell>
                      <Table.Cell className="!text-white !text-xs !py-[5px] !px-[10px] !h-fit leading-[1.108em]">
                        deficit
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Box className="py-[7px] px-3.5">
                    <Text as="p" align="center" className="!text-white">
                      No Data Available
                    </Text>
                  </Box>
                )}
              </Table.Body>
            </Table.Root>
          </Card>
        </Box>
      </Card>
    </>
  );
};

export default DivisionCard;
