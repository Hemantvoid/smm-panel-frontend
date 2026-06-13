import { useEffect, useState } from "react";
import api from "../axios";
import toast from "react-hot-toast";

export default function AdminWalletRequests() {

  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    try {
      const res = await api.get(
        "/admin/wallet/requests"
      );

      setRequests(res.data);

    } catch {
      toast.error(
        "Failed to load requests"
      );
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const approve = async (id) => {
    try {

      await api.put(
        `/admin/wallet/${id}/approve`
      );

      toast.success(
        "Approved"
      );

      loadRequests();

    } catch {
      toast.error(
        "Failed"
      );
    }
  };

  const reject = async (id) => {
    try {

      await api.put(
        `/admin/wallet/${id}/reject`
      );

      toast.success(
        "Rejected"
      );

      loadRequests();

    } catch {
      toast.error(
        "Failed"
      );
    }
  };
  setInterval(loadRequests, 10000)

  return (
    <div className="p-6 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Wallet Requests
      </h1>

      <div className="
        bg-slate-900
        rounded-2xl
        overflow-hidden
      ">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Amount</th>
              <th className="p-4">UTR</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>

          </thead>

          <tbody>

            {requests.map((r) => (

              <tr
                key={r.id}
                className="border-t border-slate-700"
              >

                <td className="p-4">
                  {r.username}
                </td>

                <td className="p-4">
                  ₹{r.amount}
                </td>

                <td className="p-4">
                  {r.utr}
                </td>

                <td className="p-4">

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      ${
                        r.status === "APPROVED"
                          ? "bg-green-600"
                          : r.status === "REJECTED"
                          ? "bg-red-600"
                          : "bg-yellow-600"
                      }
                    `}
                  >
                    {r.status}
                  </span>

                </td>

                <td className="p-4">

                  {r.status === "PENDING" && (

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          approve(r.id)
                        }
                        className="
                          bg-green-600
                          px-3
                          py-2
                          rounded-lg
                        "
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          reject(r.id)
                        }
                        className="
                          bg-red-600
                          px-3
                          py-2
                          rounded-lg
                        "
                      >
                        Reject
                      </button>

                    </div>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}