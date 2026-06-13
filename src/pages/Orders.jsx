import { useMemo, useState } from "react";

import Skeleton from "../components/ui/Skeleton";

import { useQuery } from "@tanstack/react-query";

import api from "../axios";

import OrderTable from "../components/OrderTable";

import toast from "react-hot-toast";

export default function Orders() {

  // ===============================
  // STATES
  // ===============================
  const [page, setPage] = useState(0);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");

  // ===============================
  // FETCH ORDERS
  // ===============================
  const fetchOrders = async () => {

    const res = await api.get(
      "/orders"
    );

    return res.data;
  };

  // ===============================
  // REACT QUERY
  // ===============================
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({

    queryKey: ["orders", page],

    queryFn: fetchOrders,

  });

  // ===============================
  // ACTIONS
  // ===============================
  const handleRefill = async (id) => {

    try {

      await api.post(
        `/orders/${id}/refill`
      );

      toast.success("Refill requested");

      refetch();

    } catch (err) {

      console.error(err);

     toast.error(
  err?.response?.data?.message ||
  "Something went wrong"
);

    }
  };

  const handleCancel = async (id) => {

    try {

      await api.post(
        `/orders/${id}/cancel`
      );

      toast.success("Order cancelled");

      refetch();

    } catch (err) {

      console.error(err);

      toast.error(
  err?.response?.data?.message ||
  "Something went wrong"
);

    }
  };

  // ===============================
  // FILTERED ORDERS
  // ===============================
  const filteredOrders = useMemo(() => {

  const orders = Array.isArray(data)
    ? data
    : data?.content || [];

  return orders.filter((o) => {

    const matchesSearch =

      o.serviceName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      String(o.orderId)
        .includes(search);

    const matchesStatus =

      status === "ALL"

        ? true

        : o.status
            ?.toUpperCase() === status;

    return (
      matchesSearch &&
      matchesStatus
    );

  });

}, [data, search, status]);

  // ===============================
  // LOADING
  // ===============================
  if (isLoading) {

  return (

    <div className="space-y-6">

      {/* HEADER */}
      <div className="space-y-3">

        <Skeleton className="h-10 w-56" />

        <Skeleton className="h-4 w-72" />

      </div>

      {/* FILTERS */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex gap-4">

        <Skeleton className="h-12 flex-1" />

        <Skeleton className="h-12 w-44" />

      </div>

      {/* TABLE */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">

        {[...Array(6)].map((_, i) => (

          <Skeleton
            key={i}
            className="h-16 w-full"
          />

        ))}

      </div>

    </div>
  );
}

  // ===============================
  // ERROR
  // ===============================
  if (error) {

    return (
      <div className="text-red-400 text-lg">
        Failed to load orders
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Orders
          </h1>

          <p className="text-slate-400 mt-1">
            Manage and track all orders
          </p>

        </div>

      </div>

      {/* FILTERS */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex flex-col md:flex-row gap-4">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by ID or Service..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="bg-slate-900 text-white p-3 rounded-xl outline-none flex-1"
        />

        {/* STATUS */}
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="bg-slate-900 text-white p-3 rounded-xl outline-none"
        >

          <option value="ALL">
            All Status
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="PROCESSING">
            Processing
          </option>

          <option value="COMPLETED">
            Completed
          </option>

          <option value="CANCELLED">
            Cancelled
          </option>

        </select>

      </div>

      {/* TABLE */}
      <OrderTable
        orders={filteredOrders}
        onRefill={handleRefill}
        onCancel={handleCancel}
      />

     

    </div>
  );
}