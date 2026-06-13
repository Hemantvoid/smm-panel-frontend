import { useEffect, useState } from "react";
import api from "../axios";
import { Copy, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function ApiDocumentation() {

  const [apiKey, setApiKey] = useState("");

  const loadApiKey = async () => {
  try {

    const res =
      await api.get("/auth/api-key");

    if (!res.data.apiKey) {

      const newKey =
        await api.post(
          "/auth/generate-api-key"
        );

      setApiKey(
        newKey.data.apiKey
      );

    } else {

      setApiKey(
        res.data.apiKey
      );

    }

  } catch (err) {
    console.error(err);
  }
};

  const generateApiKey = async () => {
    try {
      const res = await api.post("/auth/generate-api-key");

      setApiKey(res.data.apiKey);

      toast.success("New API Key Generated");
    } catch (err) {
      toast.error("Failed");
    }
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  useEffect(() => {
    loadApiKey();
  }, []);

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Reseller API
      </h1>

      {/* API KEY */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          API Key
        </h2>

        <div className="flex gap-3">

          <input
            value={apiKey}
            readOnly
            className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-3"
          />

          <button
            onClick={() => copy(apiKey)}
            className="bg-indigo-600 px-4 rounded-lg"
          >
            <Copy size={18} />
          </button>

          <button
            onClick={generateApiKey}
            className="bg-green-600 px-4 rounded-lg"
          >
            <RefreshCw size={18} />
          </button>

        </div>

      </div>

      {/* BASE URL */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          API URL
        </h2>

        <code>
          https://yourdomain.com/api/v1
        </code>

      </div>

      {/* SERVICES */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Get Services
        </h2>

        <pre>
{`POST /api/v1

key=YOUR_API_KEY
action=services`}
        </pre>

      </div>

      {/* BALANCE */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Balance
        </h2>

        <pre>
{`POST /api/v1

key=YOUR_API_KEY
action=balance`}
        </pre>

      </div>

      {/* ADD ORDER */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Add Order
        </h2>

        <pre>
{`POST /api/v1

key=YOUR_API_KEY
action=add
service=1
link=https://instagram.com/test
quantity=1000`}
        </pre>

      </div>

      {/* STATUS */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Order Status
        </h2>

        <pre>
{`POST /api/v1

key=YOUR_API_KEY
action=status
orders=123`}
        </pre>

      </div>

    </div>
  );
}