type Props = {
  District: {
    properties: {
      NAME_1?: string; // Province name
      NAME_2?: string; // Division name
      NAME_3?: string; // District name
    };
  };
};

const DistrictCard = ({ District }: Props) => {
  return (
    <div className="border-0 bg-white p-4 rounded-lg shadow-md">
      <div className="font-bold">
        {District.properties.NAME_3 ||
          District.properties.NAME_2 ||
          District.properties.NAME_1 ||
          "Unknown District"}
      </div>
      <p className="text-sm text-gray-500">No data available</p>
    </div>
  );
};

export default DistrictCard;
