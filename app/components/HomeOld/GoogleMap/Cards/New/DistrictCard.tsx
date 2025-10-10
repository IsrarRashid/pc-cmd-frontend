import { DistrictProduction } from "@/app/page";
import { Box, Flex, Text } from "@radix-ui/themes";

interface Props {
  District: {
    properties: {
      NAME_1?: string; // Province name
      NAME_2?: string; // Division name
      NAME_3?: string; // District name
    };
  };
  data: DistrictProduction[] | null | undefined;
}

const DistrictCard = ({ District, data }: Props) => {
  const districtName =
    District.properties.NAME_3 ||
    District.properties.NAME_2 ||
    District.properties.NAME_1;

  const relatedDistrict = data?.find(
    (d) =>
      d.districtName.trim().toLowerCase() === districtName?.trim().toLowerCase()
  );

  return (
    <>
      <Box className="w-[277px] !bg-white !rounded-[10px] border-[1px] border-[#E6E6E6] pt-[7px]">
        <Box className="py-[7px] px-3.5 bg-[#D9ECFF] font-medium">
          <Text as="p" align="center">
            {districtName} District
          </Text>
        </Box>
        <Box className="py-[7px] px-3.5">
          {relatedDistrict ? (
            <Flex justify="between" gap="2">
              <Text>{relatedDistrict.districtName}</Text>
              <Text>{relatedDistrict.totalProduction}</Text>
            </Flex>
          ) : (
            "No Data Available"
          )}
        </Box>
      </Box>
    </>
  );
};

export default DistrictCard;
