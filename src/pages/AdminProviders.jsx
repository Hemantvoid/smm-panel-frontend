import { useEffect, useState } from "react";
import api from "../axios";

export default function AdminProviders() {

  const [providers, setProviders] = useState([]);

  useEffect(() => {
    api
      .get("/admin/providers")
      .then((res) => setProviders(res.data));
  }, []);

  const sync = async (id) => {
    try {
      await api.post(
        `/admin/provider/services/sync?providerId=${id}`
      );

      alert("Synced ✅");
    } catch (err) {
      console.error(err);
      alert("Sync failed ❌");
    }
  };
  
  const deleteProvider = async (id) => {

    if (!window.confirm(
        "Delete this provider and all synced services?"
    )) {
        return;
    }

    try {

        await api.delete(`/admin/providers/${id}`);

        alert("Provider deleted successfully");

        fetchProviders();

    } catch (err) {

        alert(
            err.response?.data ||
            "Delete failed"
        );
    }
};
  const fetchProviders = async () => {

    const res = await api.get("/admin/providers");

    setProviders(res.data);
};
  useEffect(() => {
    fetchProviders();
}, []);

  const toggleProvider = async (id) => {
  try {

    await api.put(
      `/auth/admin/providers/${id}/toggle`
    );

    const res =
      await api.get("/admin/providers");

    setProviders(res.data);

  } catch (err) {

    console.error(err);

    alert("Failed to update provider");
  }
};

  return (
    <div className="text-white space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Providers
        </h1>

        <p className="text-slate-400 mt-1">
          Manage and sync provider services
        </p>
      </div>

      {/* PROVIDERS LIST */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">

        <div className="space-y-3">

          {providers.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between bg-slate-700 p-4 rounded-xl"
            >
              <div>
                <h2 className="font-semibold">
                  {p.name}
                </h2>

                <p className="text-sm text-slate-400">
                  Provider ID: {p.id}
                </p>
              </div>

              <div className="flex gap-2">

  <button
    onClick={() => sync(p.id)}
    className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition"
  >
    Sync
  </button>

  <button
  onClick={() => deleteProvider(p.id)}
  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
>
  Delete
</button>

  <button
    onClick={() => toggleProvider(p.id)}
    className={`px-4 py-2 rounded-lg transition ${
      p.status
        ? "bg-green-600 hover:bg-green-500"
        : "bg-red-600 hover:bg-red-500"
    }`}
  >
    {p.status ? "Active" : "Inactive"}
  </button>

</div>
<p
  className={`text-sm ${
    p.status
      ? "text-green-400"
      : "text-red-400"
  }`}
>
  {p.status ? "Active" : "Inactive"}
</p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
