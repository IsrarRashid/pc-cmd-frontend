import { Province } from "@/app/page";
import { Box, Flex, Text } from "@radix-ui/themes";

interface Props {
  Province: {
    properties: {
      NAME_1?: string;
      NAME_2?: string;
    };
  };
  data: Province[];
}

const ProvinceCard = ({ Province, data }: Props) => {
  // Filter divisions that belong to this province
  // const relatedDivisions = divisions.features.filter(
  //   (d) => d.properties.NAME_1 === provinceName
  // );
  const provinceName = Province.properties.NAME_1 || Province.properties.NAME_2;

  const relatedProvince = data.find((d) => d.provinceName === provinceName);

  const relatedDivisions = relatedProvince?.divisions;

  return (
    <>
      <Box className="w-[277px] !bg-white !rounded-[10px] border-[1px] border-[#E6E6E6] pt-[7px] ">
        <Box className="py-[7px] px-3.5 bg-[#D9ECFF] font-medium">
          <Text as="p" align="center">
            {provinceName} Province ({relatedProvince?.totalProduction || 0})
          </Text>
        </Box>
        {/* <Box className="py-[7px] px-3.5">
          {relatedDivisions.length > 0 ? (
            relatedDivisions.map((division, i) => (
              <Flex key={i} justify="between" gap="2">
                <Text>{division.properties.NAME_2}</Text>
              </Flex>
            ))
          ) : (
            <Text color="gray">No divisions found</Text>
          )}
        </Box> */}
        {relatedDivisions && relatedDivisions.length > 0 ? (
          relatedDivisions.map((division) => (
            <Box key={division.divisionId} className="py-[7px] px-3.5">
              <Flex justify="between" gap="2">
                <Text>{division.divisionName || ""}</Text>
                <Text>{division.totalProduction || "No Data Available"} T</Text>
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

export default ProvinceCard;
