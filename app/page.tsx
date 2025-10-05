import { DASHBOARD_API } from "./APIs";
import Home from "./components/home/Home";

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
    enoughStockAvailable: false;
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

const HomePage = async () => {
  const res = await fetch(process.env.BACKEND_URL + DASHBOARD_API, {
    next: { revalidate: 10 }, // refresh data every 60 seconds
  });
  const dashboardData: Dashboard = await res.json();
  return <Home dashboardData={dashboardData} />;
};

export default HomePage;
