import { DivisionProduction } from "@/app/page";
import { Box, Flex, Text } from "@radix-ui/themes";

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
      <Box className="w-[277px] !bg-white !rounded-[10px] border-[1px] border-[#E6E6E6] pt-[7px]">
        <Box className="py-[7px] px-3.5 bg-[#D9ECFF] font-medium">
          <Text as="p" align="center">
            {divisionName} Division
          </Text>
        </Box>
        {relatedDistricts && relatedDistricts.length > 0 ? (
          relatedDistricts.map((district) => (
            <Box key={district.districtId} className="py-[7px] px-3.5">
              <Flex justify="between" gap="2">
                <Text>{district.districtName || ""}</Text>
                <Text>{district.totalProduction || "No Data Available"} T</Text>
              </Flex>
            </Box>
          ))
        ) : (
          <Box className="py-[7px] px-3.5">
            <Text as="p" align="center">
              No Data Available
            </Text>
          </Box>
        )}
      </Box>
    </>
  );
};

export default DivisionCard;
