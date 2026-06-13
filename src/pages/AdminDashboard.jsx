import { useEffect, useState } from "react";
import api from "../axios";

export default function AdminDashboard() {
  const [providers, setProviders] = useState([]);
  const [services, setServices] = useState([]);
  const [globalMargin, setGlobalMargin] = useState("");
  const [stats, setStats] = useState({});

  const [newProvider, setNewProvider] = useState({
    name: "",
    apiKey: "",
    apiUrl: "",
  });

  // ===============================
  // LOAD STATS
  // ===============================
  const loadStats = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // INITIAL LOAD
  // ===============================
  const loadInitial = async () => {
    try {
      const providerRes = await api.get("/admin/providers");
      setProviders(providerRes.data);

      const serviceRes = await api.get("/admin/services");

      const enriched = serviceRes.data.map((s) => ({
        ...s,
        margin: "",
      }));

      setServices(enriched);
    } catch (err) {
      console.error("Initial load failed", err);
    }
  };

  useEffect(() => {
    loadInitial();
    loadStats();
  }, []);

  // ===============================
  // ADD PROVIDER
  // ===============================
  const addProvider = async () => {
    try {
      await api.post("/admin/providers", newProvider);

      setNewProvider({
        name: "",
        apiKey: "",
        apiUrl: "",
      });

      loadInitial();
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // SYNC PROVIDER
  // ===============================
  const syncProvider = async (providerId) => {
    try {
      await api.post(
        `/admin/provider/services/sync?providerId=${providerId}`
      );

      alert("Synced Successfully ✅");
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // UPDATE SERVICE FIELD
  // ===============================
  const updateServiceField = (id, field, value) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, [field]: value }
          : s
      )
    );
  };

  // ===============================
  // AUTO MAP SINGLE
  // ===============================
  const autoMap = async (s) => {
    try {
      if (!s.margin) {
        alert("Enter margin");
        return;
      }

      await api.put(
        `/admin/services/${s.id}/auto-map?margin=${s.margin}`
      );

      alert("Auto mapped ✅");

      loadInitial();
    } catch (err) {
      console.error(err);
      alert("Auto mapping failed ❌");
    }
  };

  // ===============================
  // AUTO MAP ALL
  // ===============================
  const autoMapAll = async () => {
    try {
      if (!globalMargin) {
        alert("Enter margin");
        return;
      }

      await api.put(
        `/admin/services/auto-map-all?margin=${globalMargin}`
      );

      alert("All services mapped ✅");

      loadInitial();
    } catch (err) {
      console.error(err);
      alert("Failed ❌");
    }
  };

  return (
    <div className="space-y-6 text-white">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-slate-400 mt-1">
          Manage providers, services and profit margins
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-5">

        <StatCard
          title="Total Orders"
          value={stats.totalOrders || 0}
        />

        <StatCard
          title="Revenue"
          value={`₹${stats.revenue?.toFixed(2) || 0}`}
        />

        <StatCard
          title="Cost"
          value={`₹${stats.cost?.toFixed(2) || 0}`}
        />

        <StatCard
          title="Profit"
          value={`₹${stats.profit?.toFixed(2) || 0}`}
          green
        />

        <StatCard
          title="Today Profit"
          value={`₹${stats.todayProfit?.toFixed(2) || 0}`}
          green
        />

        <StatCard
          title="Completed Orders"
          value={stats.completedOrders || 0}
        />

      </div>

      {/* ADD PROVIDER */}
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">

        <h2 className="text-xl font-semibold mb-5">
          Add Provider
        </h2>

        <div className="grid grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Provider Name"
            value={newProvider.name}
            onChange={(e) =>
              setNewProvider({
                ...newProvider,
                name: e.target.value,
              })
            }
            className="bg-slate-900 p-3 rounded-lg outline-none"
          />

          <input
            type="text"
            placeholder="API Key"
            value={newProvider.apiKey}
            onChange={(e) =>
              setNewProvider({
                ...newProvider,
                apiKey: e.target.value,
              })
            }
            className="bg-slate-900 p-3 rounded-lg outline-none"
          />

          <input
            type="text"
            placeholder="API URL"
            value={newProvider.apiUrl}
            onChange={(e) =>
              setNewProvider({
                ...newProvider,
                apiUrl: e.target.value,
              })
            }
            className="bg-slate-900 p-3 rounded-lg outline-none"
          />

        </div>

        <button
          onClick={addProvider}
          className="mt-5 bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 rounded-lg"
        >
          Add Provider
        </button>
      </div>

      {/* PROVIDERS */}
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">

        <h2 className="text-xl font-semibold mb-5">
          Providers
        </h2>

        <div className="space-y-3">

          {providers.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between bg-slate-700 p-4 rounded-xl"
            >
              <span className="font-medium">
                {p.name}
              </span>

              <button
                onClick={() => syncProvider(p.id)}
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition"
              >
                Sync
              </button>
            </div>
          ))}

        </div>
      </div>

      {/* GLOBAL MARGIN */}
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex gap-4 items-center">

        <input
          type="number"
          step="0.01"
          placeholder="Global Margin"
          value={globalMargin}
          onChange={(e) =>
            setGlobalMargin(e.target.value)
          }
          className="bg-slate-900 p-3 rounded-lg outline-none"
        />

        <button
          onClick={autoMapAll}
          className="bg-green-600 hover:bg-green-500 px-5 py-3 rounded-lg transition"
        >
          Auto Map All
        </button>
      </div>

      {/* SERVICES */}
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">

        <h2 className="text-xl font-semibold mb-5">
          Services
        </h2>

        <div className="space-y-3">

          {services.map((s) => (
            <div
              key={s.id}
              className="grid grid-cols-5 gap-4 items-center bg-slate-700 p-4 rounded-xl"
            >

              <span>{s.id}</span>

              <span className="text-sm truncate">
                {s.name}
              </span>

              <span className="text-yellow-400 font-semibold">
                ₹{s.costPrice || 0}
              </span>

              <input
                type="number"
                step="0.01"
                value={s.margin}
                onChange={(e) =>
                  updateServiceField(
                    s.id,
                    "margin",
                    e.target.value
                  )
                }
                className="bg-slate-900 p-2 rounded-lg outline-none"
              />

              <button
                onClick={() => autoMap(s)}
                className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg transition"
              >
                Apply
              </button>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

/* ===============================
   REUSABLE CARD
================================ */
function StatCard({ title, value, green }) {
  return (
    <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2
        className={`text-2xl font-bold mt-2 ${
          green ? "text-green-400" : ""
        }`}
      >
        {value}
      </h2>
    </div>
  );
}