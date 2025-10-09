import { PRODUCTION_API } from "@/app/APIs";
import NavbarToggle from "./NavbarToggle";

// interface Production {
//   id: number;
//   productId: number;
//   countaryId: number;
//   provinceId: number;
//   divisionId: number;
//   districtId: number;
//   population: number;
//   productionQuantity: number;
//   consumptionQuantity: number;
//   unitId: number;
//   createdAt: string;
//   updatedAt: string;
//   createdBy: string;
//   updatedBy: string;
// }

const NavbarData = async () => {
  const res = await fetch(process.env.BACKEND_URL + PRODUCTION_API);
  const response = await res.json();
  console.log("response", response);
  return <NavbarToggle />;
};

export default NavbarData;
