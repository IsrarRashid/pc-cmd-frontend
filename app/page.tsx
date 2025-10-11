import { DASHBOARD_API, PRODUCT_API, PRODUCTION_DASHBOARD_API } from "./APIs";
import DashboardWrapper from "./components/DashboardWrapper";
import Home from "./components/home/Home";
import { Product } from "./components/Navbar/forms/ProductForm";

interface District {
  name: string;
  capacity: number;
  stock: number;
  stockPercent: number;
}

export interface Division {
  division: string;
  capacity: number;
  stock: number;
  stockPercent: number;
  districts: District[];
}

export interface Dashboard {
  wheatStock: {
    total: number;
    change: string;
    warehouses: number;
    todayStock: number;
  };
  wheatGrinded: {
    total: number;
    mills: number;
    todayStock: number;
  };
  flourIssued: {
    total: number;
    wholesalers: number;
    todayIssued: number;
  };
  millDetails: {
    millsRegistered: number;
    functionalMills: number;
    nonFunctionalMills: number;
    aataChakiRegistered: number;
  };
  divisions: Division[];
  stockIndicator: {
    enoughStockAvailable: boolean;
    percent: number;
  };
  wheatStats: {
    wheat: number;
    flour: number;
  };
  salesChart: [
    {
      day: string;
      quantity: number;
    }
  ];
}

///////////////////////Production Dashboard Interface

export interface DistrictProduction {
  districtId: number;
  districtName: string;
  totalProduction: number;
  totalConsumption: number;
  balance: number;
  status: string;
  seasons: null;
}
export interface DivisionProduction {
  divisionId: number;
  divisionName: string;
  totalProduction: number;
  totalConsumption: number;
  balance: number;
  status: string;
  districts: DistrictProduction[];
}

export interface Province {
  provinceId: number;
  provinceName: string;
  totalProduction: number;
  totalConsumption: number;
  balance: number;
  status: string;
  divisions: DivisionProduction[];
}

export interface CountryProduction {
  countryName: string;
  totalProduction: number;
  totalConsumption: number;
  balance: number;
  status: string;
  provinces: Province[];
}

export interface Tracking {
  id: number;
  vehicleNumber: string;
  driverName: string;
  driverContact: string;
  startDate: string;
  endDate: string;
  quantity: number;
  distanceKm: number;
  coveredDistance: number;
  start_lat: number;
  start_long: number;
  end_lat: number;
  end_long: number;
}

// Define types clearly
export interface DataPoint {
  date: string;
  quantity: number;
}

export interface SupplyChain {
  provinceId: number;
  provinceName: string;
  dataPoints: DataPoint[];
}

export interface ProductionDashboard {
  countryProduction: CountryProduction;
  tracking: Tracking[];
  topSupplyChains: SupplyChain[];
  seasonCycle: {
    totalProduction: number;
    punjabProduction: number;
    sindhProduction: number;
    balochistanProduction: number;
    kpkProduction: number;
    punjabPercentage: number;
    sindhPercentage: number;
    balochistanPercentage: number;
    kpkPercentage: number;
    punjabSession: string;
    sindhSession: string;
    balochistanSession: string;
    kpkSession: string;
  };
}

interface Props {
  searchParams: Promise<{ product: string }>;
}

const HomePage = async ({ searchParams }: Props) => {
  const { product } = await searchParams;
  const res = await fetch(`${process.env.BACKEND_URL}${DASHBOARD_API}`, {
    cache: "no-store",
  });

  const res2 = await fetch(
    `${process.env.BACKEND_URL}${PRODUCTION_DASHBOARD_API}?productId=${product}`,
    { cache: "no-store" }
  );

  const res3 = await fetch(`${process.env.BACKEND_URL}${PRODUCT_API}`, {
    cache: "no-store",
  });

  const dashboardData: Dashboard = await res.json();
  const productionDashboardData: ProductionDashboard = await res2.json();
  const productsData: Product[] = await res3.json();
  console.log("dashboardData", dashboardData);
  console.log("productionDashboardData", productionDashboardData);
  console.log("productsData", productsData);

  // const economicBalances = Object.values(
  //   ECONOMIC_BALANCE_ENUM
  // ) as ECONOMIC_BALANCE_ENUM[]; // Cast to ECONOMIC_BALANCE_ENUM[]
  // const myEconomicBalance = economicBalances.includes(
  //   economicBalance as ECONOMIC_BALANCE_ENUM
  // )
  //   ? (economicBalance as ECONOMIC_BALANCE_ENUM)
  //   : undefined;

  // console.log("myEconomicBalance", myEconomicBalance);
  return (
    <DashboardWrapper>
      {productionDashboardData && dashboardData && productsData && (
        <Home
          dashboardData={dashboardData}
          productionDashboardData={productionDashboardData}
          productsData={productsData}
        />
      )}
    </DashboardWrapper>
  );
};

export default HomePage;
