import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import api from "../axios";
import toast from "react-hot-toast";

export default function NewOrder() {
  const [services, setServices] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  const [form, setForm] = useState({
    serviceId: "",
    quantity: "",
    link: "",
    comments: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [serviceRes, balRes] = await Promise.all([
          api.get("/services"),
          api.get("/wallet/balance"),
        ]);

        setServices(serviceRes.data);
        setBalance(balRes.data);
      } catch {
        toast.error("Failed to load services");
      }
    };

    load();
  }, []);

  const extractCategory = (category) => {
    if (!category) return "Other";
    return category.split("-")[0].trim();
  };

  const categories = [
    "All",
    ...new Set(services.map((s) => extractCategory(s.category))),
  ];

  const filteredServices = services.filter((s) => {
    const categoryMatch =
      selectedCategory === "All"
        ? true
        : extractCategory(s.category) === selectedCategory;

    const searchMatch = s.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const totalPrice =
    selectedService && form.quantity
      ? (Number(form.quantity) / 1000) * selectedService.sellPrice
      : 0;

  const handleCreate = async () => {
    if (!selectedService) {
      return toast.error("Select a service");
    }

    try {
      setLoading(true);

      await api.post("/orders", {
        ...form,
        quantity: Number(form.quantity),
      });

      toast.success("Order placed successfully");

      setSelectedService(null);

      setForm({
        serviceId: "",
        quantity: "",
        link: "",
        comments: "",
      });
    } catch {
      toast.error("Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto p-4"
    >
      <div className="mb-6">
        <h1 className="text-4xl font-black text-white">
          New Order
        </h1>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">

        <div className="lg:col-span-3 bg-slate-900 rounded-3xl p-4 border border-white/10">
          <h3 className="text-white font-bold mb-4">
            Categories
          </h3>

          <div className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-4 py-3 rounded-xl transition ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-white/5 text-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-6 border border-white/10">
          <h3 className="text-white font-bold text-xl mb-5">
            Order Form
          </h3>

          <div className="relative mb-4">
            <Search
              size={18}
              className="absolute left-3 top-4 text-slate-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Service"
              className="w-full pl-10 p-3 rounded-xl bg-slate-800 text-white"
            />
          </div>

          <select
            value={form.serviceId}
            onChange={(e) => {
              const service = services.find(
                (s) => s.id === Number(e.target.value)
              );

              setSelectedService(service);

              setForm({
                ...form,
                serviceId: service.id,
              });
            }}
            className="w-full p-3 rounded-xl bg-slate-800 text-white mb-4"
          >
            <option value="">Select Service</option>

            {filteredServices.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Target Link"
            value={form.link}
            onChange={(e) =>
              setForm({ ...form, link: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-slate-800 text-white mb-4"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({
                ...form,
                quantity: e.target.value,
              })
            }
            className="w-full p-3 rounded-xl bg-slate-800 text-white mb-4"
          />

          <textarea
            rows="5"
            placeholder="Comments"
            value={form.comments}
            onChange={(e) =>
              setForm({
                ...form,
                comments: e.target.value,
              })
            }
            className="w-full p-3 rounded-xl bg-slate-800 text-white"
          />
        </div>

        <div className="lg:col-span-3">
          <div className="sticky top-6 bg-slate-900 rounded-3xl p-6 border border-white/10">
            <h3 className="text-white font-bold mb-5">
              Order Summary
            </h3>

            <Summary label="Balance" value={`₹${balance}`} />
            <Summary
              label="Rate"
              value={selectedService ? `₹${selectedService.sellPrice}` : "-"}
            />
            <Summary
              label="Min"
              value={selectedService?.min || "-"}
            />
            <Summary
              label="Max"
              value={selectedService?.max || "-"}
            />

            <div className="border-t border-white/10 mt-4 pt-4 flex justify-between">
              <span className="text-slate-400">Total</span>
              <span className="text-green-400 font-black text-2xl">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCreate}
              disabled={loading}
              className="w-full mt-5 h-12 rounded-xl bg-indigo-600 text-white font-bold"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function Summary({ label, value }) {
  return (
    <div className="flex justify-between mb-3">
      <span className="text-slate-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}
