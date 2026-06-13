import { useEffect, useState } from "react";
import api from "../axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Order fetch error:", err);
    }
  };

  useEffect(() => {
    loadOrders();

    // 🔥 auto refresh every 5 sec
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl mb-4">All Orders</h2>

      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-sm">
              <th>ID</th>
              <th>User</th>
              <th>Service</th>
              <th>Qty</th>
              <th>Cost</th>
              <th>Sell</th>
              <th>Profit</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.orderId} className="text-center border-b border-gray-700">
                <td>{o.orderId}</td>
                <td>{o.customerName}</td>
                <td>{o.serviceName}</td>
                <td>{o.quantity}</td>

                <td className="text-red-400">
                  ₹{o.costPrice?.toFixed(2)}
                </td>

                <td className="text-yellow-400">
                  ₹{o.sellPrice?.toFixed(2)}
                </td>

                <td className="text-green-400 font-bold">
                  ₹{o.profit?.toFixed(2)}
                </td>

                <td>
                  <span className="bg-blue-500 px-2 py-1 rounded text-xs">
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}