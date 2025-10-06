import { DistrictData, DistrictFeature } from "./PunjabMap";

// DistrictCard.tsx
type GodownCardProps = {
  district: DistrictFeature;
  districtData: DistrictData; // use the new interface we defined
};

const GodownCard = ({ district, districtData }: GodownCardProps) => {
  return (
    <div
      className="border-0 bg-white"
      style={{
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <div className="col font-bold fs-6">{district.props.NAME_3}</div>
      <div className="row d-flex fs-6 m-2">
        <div
          className="col shadow-sm p-2 me-2 d-flex bg-blue-300"
          style={{ borderRadius: "5px" }}
        >
          {/* <Image src={approved} alt="approved" width={40} height={40} /> */}
          &nbsp;
          <div className="col ">
            <p className="text-sm m-0">Stock: {districtData.total}</p>
            {/* <p className="text-xs text-gray-500 m-0">Capacity info if needed</p> */}
          </div>
        </div>
      </div>
      {/* ----- */}
      {/* <div>
        {Object.entries(divisionData.districts).map(([district, stock]) => (
          <div
            key={district}
            className="w-full flex justify-between text-sm border-b py-1"
          >
            <span className="me-3 font-semibold">{district}</span>
            <span className="font-medium">{stock}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default GodownCard;
