import React, { useMemo, useState } from "react";
import {
  useGetDriversQuery,
  useGetAllocationsQuery,
  useGetOrdersQuery,
  useGetVehiclesQuery,
  useGetHubsQuery,
  useUpdateVehicleMutation,
  useUpdateOrderMutation,
  useUpdateHubMutation,
} from "../api/api";

const randomOffset = () => (Math.random() - 0.5) * 0.01;

const DriverShift: React.FC = () => {
  const { data: drivers } = useGetDriversQuery();
  const { data: allocations } = useGetAllocationsQuery();
  const { data: orders } = useGetOrdersQuery();
  const { data: vehicles } = useGetVehiclesQuery();
  const { data: hubs } = useGetHubsQuery();

  const [updateVehicle] = useUpdateVehicleMutation();
  const [updateOrder] = useUpdateOrderMutation();
  const [updateHub] = useUpdateHubMutation();

  const [selectedDriver, setSelectedDriver] = useState<string | "">("");
  const driverAllocations = useMemo(
    () => allocations?.filter((a) => a.driverId === selectedDriver) || [],
    [allocations, selectedDriver],
  );
  const driverOrders = useMemo(
    () => orders?.filter((o) => o.assignedDriverId === selectedDriver) || [],
    [orders, selectedDriver],
  );

  const handleGPS = async () => {
    // update vehicle location for all allocated vehicles of this driver
    for (const a of driverAllocations) {
      const v = vehicles?.find((x) => x.id === a.vehicleId);
      if (!v || !v.currentLocation) continue;
      const newLoc = {
        lat: v.currentLocation.lat + randomOffset(),
        lng: v.currentLocation.lng + randomOffset(),
      };
      await updateVehicle({ id: v.id, currentLocation: newLoc }).unwrap();
    }
  };

  const handleComplete = async (orderId: string) => {
    const ord = orders?.find((o) => o.id === orderId);
    if (!ord) return;
    // update order status
    await updateOrder({ id: ord.id, status: "completed" }).unwrap();
    // update inventory on destination hub
    const hub = hubs?.find((h) => h.id === ord.destinationId);
    if (hub) {
      const current = hub.inventory[ord.productId] ?? 0;
      const updated = {
        ...hub.inventory,
        [ord.productId]: Math.max(0, current - ord.quantity),
      };
      await updateHub({ id: hub.id, inventory: updated }).unwrap();
    }
    alert("Delivery completed. Inventory updated.");
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Driver Interface - Shift</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Select Driver
            </label>
            <select
              className="w-full p-2 border rounded"
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
            >
              <option value="">-- choose --</option>
              {drivers?.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="p-3 mb-4 border rounded bg-card border-var">
            <div className="font-semibold">Today's Allocations</div>
            <ul className="mt-2 space-y-2">
              {driverAllocations.map((a) => (
                <li key={a.id} className="p-2 border rounded">
                  <div>Vehicle: {a.vehicleId}</div>
                  <div>Date: {a.date}</div>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <button
                onClick={handleGPS}
                className="px-3 py-2 text-white rounded bg-sky-600"
              >
                Send GPS Update
              </button>
            </div>
          </div>
          <div className="p-3 border rounded bg-card border-var">
            <div className="font-semibold">Assigned Deliveries</div>
            <ul className="mt-2 space-y-2">
              {driverOrders.map((o) => (
                <li
                  key={o.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <div>
                    <div className="font-medium">
                      {o.productId} - {o.quantity}
                    </div>
                    <div className="text-sm">
                      Destination: {o.destinationId}
                    </div>
                    <div className="text-sm">Status: {o.status}</div>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleComplete(o.id)}
                      className="px-2 py-1 text-white bg-green-600 rounded"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() =>
                        updateOrder({ id: o.id, status: "failed" }).unwrap()
                      }
                      className="px-2 py-1 text-white bg-red-600 rounded"
                    >
                      Fail
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 border rounded bg-card border-var">
          <h3 className="font-semibold">Quick Actions</h3>
          <p className="mt-2 text-sm">
            Start shift / End shift actions can be simulated here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DriverShift;
