import React from "react";
import { useGetVehiclesQuery } from "../api/api";
import FleetMap from "../components/FleetMap";

const AdminDashboard: React.FC = () => {
  const { data: vehicles, isLoading, isError, refetch } = useGetVehiclesQuery();

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <div>
          <button
            onClick={() => refetch()}
            className="px-3 py-2 text-white rounded-md bg-sky-600"
          >
            Refresh
          </button>
        </div>
      </header>

      <section>
        {isLoading && <div>Loading vehicles...</div>}
        {isError && <div className="text-red-500">Failed to load vehicles</div>}
        {vehicles && <FleetMap vehicles={vehicles} />}
      </section>
    </div>
  );
};

export default AdminDashboard;
