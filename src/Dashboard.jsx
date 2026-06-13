import {
  motion,
} from "framer-motion";

import {
  Wallet,
  ShoppingCart,
  Activity,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  useDashboard,
} from "./features/dashboard/hooks/useDashboard";

import StatCard from "./components/StatCard";

import Card from "./components/ui/Card";

import Button from "./components/ui/Button";

import Skeleton from "./components/ui/Skeleton";

import Orders from "./pages/Orders";

export default function Dashboard() {

  const navigate = useNavigate();

  const {
    data,
    isLoading,
  } = useDashboard();

  // ===============================
  // LOADING
  // ===============================
  if (isLoading) {

    return (

      <div className="space-y-8">

        <Skeleton className="h-12 w-72 rounded-2xl" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {[...Array(4)].map((_, i) => (

            <Skeleton
              key={i}
              className="h-44 rounded-3xl"
            />

          ))}

        </div>

        <Skeleton className="h-96 rounded-3xl" />

      </div>
    );
  }

  // ===============================
  // DATA
  // ===============================
  const orders =
    data?.orders?.content || [];

  const totalOrders =
    orders.length;

  const completedOrders =
    orders.filter(
      (o) => o.status === "COMPLETED"
    ).length;

  const processingOrders =
    orders.filter(
      (o) => o.status === "PROCESSING"
    ).length;

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.4,
      }}

      className="space-y-8"
    >

      {/* ========================================= */}
      {/* HERO */}
      {/* ========================================= */}
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent p-8">

        {/* GLOW */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          {/* LEFT */}
          <div>

            <p className="text-indigo-400 font-medium mb-3">

              USER DASHBOARD

            </p>

            <h1 className="text-5xl font-bold tracking-tight leading-tight">

              Grow Faster With
              <br />

              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">

                Premium SMM Services

              </span>

            </h1>

            <p className="text-slate-400 text-lg mt-5 max-w-2xl leading-relaxed">

              Manage orders, track growth,
              monitor performance and scale
              your social media presence from
              one modern dashboard.

            </p>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-4 mt-8">

              <Button
  onClick={() =>
    navigate("/dashboard/order")
  }
  className="px-6 py-3"
>
  Create Order
</Button>

              <button
                onClick={() =>
                  navigate("/dashboard/orders")
                }
                className="px-6 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >

                View Orders

              </button>

            </div>

          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-2 gap-5 min-w-[320px]">

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

              <p className="text-slate-400 text-sm mb-2">

                Wallet

              </p>

              <h2 className="text-3xl font-bold text-green-400">
                ₹{Number(data?.balance || 0).toFixed(2)}
              </h2>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

              <p className="text-slate-400 text-sm mb-2">

                Orders

              </p>

              <h2 className="text-3xl font-bold">

                {totalOrders}

              </h2>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

              <p className="text-slate-400 text-sm mb-2">

                Completed

              </p>

              <h2 className="text-3xl font-bold text-blue-400">

                {completedOrders}

              </h2>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

              <p className="text-slate-400 text-sm mb-2">

                Processing

              </p>

              <h2 className="text-3xl font-bold text-yellow-400">

                {processingOrders}

              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================= */}
      {/* STATS */}
      {/* ========================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Wallet Balance"
          value={`₹${Number(data?.balance || 0).toFixed(2)}`}
          icon={<Wallet />}
          color="bg-green-500/20 text-green-400"
          change="+12.5%"
        />

        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={<ShoppingCart />}
          color="bg-indigo-500/20 text-indigo-400"
          change="+8.2%"
        />

        <StatCard
          title="Completed Orders"
          value={completedOrders}
          icon={<Activity />}
          color="bg-blue-500/20 text-blue-400"
          change="+18.1%"
        />

        <StatCard
          title="Profit Growth"
          value="₹12,420"
          icon={<TrendingUp />}
          color="bg-purple-500/20 text-purple-400"
          change="+22.4%"
        />

      </div>

      {/* ========================================= */}
      {/* QUICK ACTIONS */}
      {/* ========================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* WALLET */}
        <Card className="relative overflow-hidden">

          <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 blur-3xl rounded-full" />

          <div className="relative z-10">

            <p className="text-slate-400 text-sm mb-2">

              Available Wallet

            </p>

            <h2 className="text-4xl font-bold text-white mb-6">
  ₹{Number(data?.balance || 0).toFixed(2)}
</h2>

            <Button
              onClick={() =>
                navigate("/dashboards/funds")
              }
            >

              Add Funds

            </Button>

          </div>

        </Card>

        {/* PERFORMANCE */}
        <Card className="relative overflow-hidden">

          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full" />

          <div className="relative z-10">

            <p className="text-slate-400 text-sm mb-2">

              Account Performance

            </p>

            <h2 className="text-4xl font-bold mb-4">

              98%

            </h2>

            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">

              <div className="w-[98%] h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />

            </div>

          </div>

        </Card>

        {/* ACTIVE STATUS */}
        <Card className="relative overflow-hidden">

          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full" />

          <div className="relative z-10">

            <div className="flex items-center justify-between mb-6">

              <div>

                <p className="text-slate-400 text-sm mb-2">

                  System Status

                </p>

                <h2 className="text-3xl font-bold text-green-400">

                  Active

                </h2>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400">

                <ArrowUpRight />

              </div>

            </div>

            <p className="text-slate-400 leading-relaxed">

              All services are operational and
              processing normally.

            </p>

          </div>

        </Card>

      </div>

      {/* ========================================= */}
      {/* RECENT ORDERS */}
      {/* ========================================= */}
      <Card className="overflow-hidden">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>

            <h2 className="text-3xl font-bold text-white">

              Recent Orders

            </h2>

            <p className="text-slate-400 mt-2">

              Track and manage your latest
              activities

            </p>

          </div>

          <Button
            onClick={() =>
              navigate("/dashboard/orders")
            }
          >

            View All Orders

          </Button>

        </div>

        <Orders />

      </Card>

    </motion.div>
  );
}