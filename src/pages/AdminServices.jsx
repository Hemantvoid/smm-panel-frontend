import { useEffect, useState } from "react";
import api from "../axios";

export default function AdminServices() {

  const [services, setServices] = useState([]);
  const [margin, setMargin] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await api.get("/admin/services");
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const autoMapAll = async () => {
    try {
      if (!margin) {
        alert("Enter margin");
        return;
      }

      await api.put(
        `/admin/services/auto-map-all?margin=${margin}`
      );

      alert("All services mapped ✅");

      load();

    } catch (err) {
      console.error(err);
      alert("Mapping failed ❌");
    }
  };

  return (
    <div className="text-white space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Services
        </h1>

        <p className="text-slate-400 mt-1">
          Manage and auto-map provider services
        </p>
      </div>

      {/* AUTO MAP */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Global Auto Mapping
        </h2>

        <div className="flex gap-3">

          <input
            type="number"
            placeholder="Margin %"
            value={margin}
            onChange={(e) => setMargin(e.target.value)}
            className="bg-slate-900 p-3 rounded-lg outline-none w-48"
          />

          <button
            onClick={autoMapAll}
            className="bg-green-600 hover:bg-green-500 px-5 py-3 rounded-lg transition"
          >
            Auto Map All
          </button>

        </div>

      </div>

      {/* SERVICES */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-5">
          Services List
        </h2>

        <div className="space-y-3">

          {services.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between bg-slate-700 p-4 rounded-xl"
            >

              <div className="flex flex-col">

                <span className="font-medium">
                  {s.name}
                </span>

                <span className="text-sm text-slate-400">
                  Service ID: {s.id}
                </span>

              </div>

              <div className="text-yellow-400 font-semibold">
                ₹{s.costPrice || 0}
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}