type Props = {
  Division: {
    properties: {
      NAME_1?: string; // Province name
      NAME_2?: string; // Division name
    };
  };
};

const DivisionCard = ({ Division }: Props) => {
  return (
    <div className="border-0 bg-white p-4 rounded-lg shadow-md">
      <div className="font-bold">
        {Division.properties.NAME_2 ||
          Division.properties.NAME_1 ||
          "Unknown Division"}
      </div>
      <p className="text-sm text-gray-500">No data available</p>
    </div>
  );
};

export default DivisionCard;
