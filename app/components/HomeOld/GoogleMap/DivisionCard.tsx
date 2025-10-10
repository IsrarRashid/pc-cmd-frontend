import { DivisionData, DivisionFeature } from "./PunjabMap";

type DivisionCardProps = {
  division: DivisionFeature;
  divisionData?: DivisionData; // make it optional
};

const DivisionCard = ({ division, divisionData }: DivisionCardProps) => {
  if (!divisionData) {
    return (
      <div className="border-0 bg-white p-4 rounded-lg">
        <div className="font-bold">{division.properties.NAME_2}</div>
        <p className="text-sm text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div
      className="border-0 bg-white"
      style={{
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      {/* Division Name */}
      <div className="col font-bold fs-6">{division.properties.NAME_2}</div>

      {/* Total */}
      <div className="row d-flex fs-6 m-2">
        <div
          className="col shadow-sm p-2 me-2 d-flex bg-blue-300"
          style={{ borderRadius: "5px" }}
        >
          &nbsp;
          <div className="col ">
            <p className="m-0 text-secondary font-medium">Total</p>
            <p className="m-0 font-bold">{divisionData.total}</p>
          </div>
        </div>
      </div>

      {/* Districts */}
      <div>
        {Object.entries(divisionData.districts).map(
          ([districtName, districtData]) => (
            <div
              key={districtName}
              className="w-full flex justify-between text-sm border-b py-1"
            >
              <span className="me-3 font-semibold">{districtName}</span>
              <span className="font-medium">{districtData.total}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DivisionCard;
