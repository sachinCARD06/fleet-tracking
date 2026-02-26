import DriverDashboard from "@/pages/driver/DriverDashboard";
import DriverShift from "@/pages/DriverShift";

export const driverRoutes = [
  {
    path: "/",
    element: <DriverDashboard />,
    name: "Dashboard",
  },
  {
    path: "/driver",
    element: <DriverShift />,
    name: "Shift",
  },
];
