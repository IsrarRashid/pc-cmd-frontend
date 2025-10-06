type Props = {
  Province: {
    properties: {
      NAME_1?: string;
      NAME_2?: string;
    };
  };
};

const ProvinceCard = ({ Province }: Props) => {
  return (
    <div className="border-0 bg-white p-4 rounded-lg">
      <div className="font-bold">
        {Province.properties.NAME_2 ||
          Province.properties.NAME_1 ||
          "Unknown Province"}
      </div>
      <p className="text-sm text-gray-500">No data available</p>
    </div>
  );
};

export default ProvinceCard;
