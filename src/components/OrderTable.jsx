import {
  Eye,
  RotateCcw,
  XCircle,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useState,
} from "react";

import Modal from "./ui/Modal";

export default function OrderTable({
  orders,
  onRefill,
  onCancel,
}) {

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  // ===============================
  // STATUS COLORS
  // ===============================
  const getStatusStyle = (status) => {

    switch ((status || "").toUpperCase()) {

      case "COMPLETED":
        return `
          bg-green-500/10
          text-green-400
          border border-green-500/20
        `;

      case "PENDING":
        return `
          bg-yellow-500/10
          text-yellow-300
          border border-yellow-500/20
        `;

      case "PROCESSING":
        return `
          bg-blue-500/10
          text-blue-400
          border border-blue-500/20
        `;

      case "CANCELLED":
        return `
          bg-red-500/10
          text-red-400
          border border-red-500/20
        `;

      default:
        return `
          bg-slate-500/10
          text-slate-300
          border border-slate-500/20
        `;
    }
  };

  // ===============================
  // EMPTY STATE
  // ===============================
  if (!orders?.length) {

    return (

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-16 text-center">

        <h2 className="text-2xl font-bold text-white mb-3">

          No Orders Found

        </h2>

        <p className="text-slate-400">

          Orders will appear here once created.

        </p>

      </div>
    );
  }

  return (

    <>
      {/* ========================================= */}
      {/* TABLE */}
      {/* ========================================= */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">

        {/* HEADER */}
        <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-white">

              Orders

            </h2>

            <p className="text-slate-400 mt-1">

              Track and manage all activities

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl text-sm text-slate-300">

            Total Orders:
            <span className="text-white font-semibold ml-2">

              {orders.length}

            </span>

          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            {/* HEAD */}
            <thead className="bg-black/20 border-b border-white/10">

              <tr className="text-slate-400 text-sm">

                <th className="px-8 py-5 text-left font-medium">

                  ORDER ID

                </th>

                <th className="px-8 py-5 text-left font-medium">

                  SERVICE

                </th>

                <th className="px-8 py-5 text-left font-medium">

                  LINK

                </th>

                <th className="px-8 py-5 text-left font-medium">

                  QUANTITY

                </th>

                <th className="px-8 py-5 text-left font-medium">

                  STATUS

                </th>

                <th className="px-8 py-5 text-left font-medium">

                  DATE

                </th>

                <th className="px-8 py-5 text-center font-medium">

                  ACTIONS

                </th>

              </tr>

            </thead>

            {/* BODY */}
            <tbody>

              {orders.map((o, i) => (

                <motion.tr

                  key={o.orderId}

                  initial={{
                    opacity: 0,
                    y: 10,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    delay: i * 0.03,
                  }}

                  className="
                    border-b border-white/5
                    hover:bg-white/[0.03]
                    transition-all duration-300
                  "
                >

                  {/* ORDER ID */}
                  <td className="px-8 py-6">

                    <div className="font-semibold text-indigo-400">

                      #{o.orderId}

                    </div>

                  </td>

                  {/* SERVICE */}
                  <td className="px-8 py-6">

                    <div className="max-w-[260px]">

                      <h3 className="text-white font-medium truncate">

                        {o.serviceName}

                      </h3>

                    </div>

                  </td>

                  {/* LINK */}
                  <td className="px-8 py-6">

                    <div className="max-w-[250px] truncate text-slate-400">

                      {o.link || "-"}

                    </div>

                  </td>

                  {/* QTY */}
                  <td className="px-8 py-6">

                    <div className="font-semibold text-white">

                      {o.quantity}

                    </div>

                  </td>

                  {/* STATUS */}
                  <td className="px-8 py-6">

                    <span
                      className={`
                        inline-flex items-center
                        px-4 py-2
                        rounded-full
                        text-xs
                        font-semibold
                        tracking-wide
                        ${getStatusStyle(o.status)}
                      `}
                    >

                      {o.status}

                    </span>

                  </td>

                  {/* DATE */}
                  <td className="px-8 py-6 whitespace-nowrap text-slate-400 text-sm">

                    {o.createdAt
                      ? new Date(
                          o.createdAt
                        ).toLocaleString()
                      : "-"}

                  </td>

                  {/* ACTIONS */}
                  <td className="px-8 py-6">

                    <div className="flex items-center justify-center gap-3">

                      {/* VIEW */}
                      <button
                        onClick={() =>
                          setSelectedOrder(o)
                        }
                        className="
                          w-10 h-10
                          rounded-xl
                          bg-white/5
                          hover:bg-indigo-500/20
                          border border-white/10
                          hover:border-indigo-500/20
                          flex items-center justify-center
                          transition-all
                        "
                      >

                        <Eye size={16} />

                      </button>

                      {/* REFILL */}
                      <button
                        onClick={() =>
                          onRefill(o.orderId)
                        }
                        className="
                          w-10 h-10
                          rounded-xl
                          bg-blue-500/10
                          hover:bg-blue-500/20
                          border border-blue-500/20
                          text-blue-400
                          flex items-center justify-center
                          transition-all
                        "
                      >

                        <RotateCcw size={16} />

                      </button>

                      {/* CANCEL */}
                      <button
                        onClick={() =>
                          onCancel(o.orderId)
                        }
                        className="
                          w-10 h-10
                          rounded-xl
                          bg-red-500/10
                          hover:bg-red-500/20
                          border border-red-500/20
                          text-red-400
                          flex items-center justify-center
                          transition-all
                        "
                      >

                        <XCircle size={16} />

                      </button>

                    </div>

                  </td>

                </motion.tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* ========================================= */}
      {/* MODAL */}
      {/* ========================================= */}
      <Modal
        open={!!selectedOrder}
        onClose={() =>
          setSelectedOrder(null)
        }
        title="Order Details"
      >

        <div className="space-y-6 text-white">

          <div>

            <p className="text-slate-400 text-sm mb-2">

              Order ID

            </p>

            <h3 className="text-xl font-semibold">

              #{selectedOrder?.orderId}

            </h3>

          </div>

          <div>

            <p className="text-slate-400 text-sm mb-2">

              Service

            </p>

            <h3 className="font-semibold">

              {selectedOrder?.serviceName}

            </h3>

          </div>

          <div>

            <p className="text-slate-400 text-sm mb-2">

              Link

            </p>

            <a
              href={selectedOrder?.link}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 break-all"
            >

              {selectedOrder?.link}

            </a>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <p className="text-slate-400 text-sm mb-2">

                Quantity

              </p>

              <h3 className="font-semibold">

                {selectedOrder?.quantity}

              </h3>

            </div>

            <div>

              <p className="text-slate-400 text-sm mb-2">

                Status

              </p>

              <h3 className="font-semibold">

                {selectedOrder?.status}

              </h3>

            </div>

          </div>

        </div>

      </Modal>

    </>
  );
}