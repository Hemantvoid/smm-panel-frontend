import {
  useState,
  useEffect,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Wallet,
  BadgeIndianRupee,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../axios";

export default function AddFunds() {

  const [amount, setAmount] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [balance, setBalance] =
    useState(0);

  const [transactions, setTransactions] =
  useState([]);

  const [requests, setRequests] =
  useState([]);

  const presets = [
    100,
    500,
    1000,
    5000,
    10000,
  ];
  const [method, setMethod] =
  useState("UPI");

const [utr, setUtr] =
  useState("");

  // ===================================
  // LOAD BALANCE
  // ===================================
  useEffect(() => {

    const loadData =
  async () => {

    try {

      const [balRes, txRes, reqRes] =
  await Promise.all([
    api.get("/wallet/balance"),
    api.get("/transactions/user"),
    api.get("/wallet/request/my"),
  ]);

      setBalance(
        balRes.data
      );

      setTransactions(
        txRes.data
      );
      setRequests(
        reqRes.data
      );

    } catch(err) {

      toast.error(
  err?.response?.data?.message ||
  "Something went wrong"
);
    }
  };

    loadData();

  }, []);

  // ===================================
  // HANDLE PAYMENT
  // ===================================
  
const handleUpiRequest =
async () => {

  if (!amount || amount <= 0) {
    return toast.error(
      "Enter valid amount"
    );
  }

  if (!utr) {
    return toast.error(
      "Enter UTR Number"
    );
  }

  try {

    await api.post(
      "/wallet/request",
      {
        amount,
        utr
      }
    );

    toast.success(
      "Request Submitted"
    );

    setUtr("");

  } catch (err) {

    toast.error(
      err.response?.data?.message ||
      "Failed"
    );
  }
};

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

      className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-8
      "
    >

      {/* ========================================= */}
      {/* LEFT */}
      {/* ========================================= */}
      <div className="xl:col-span-2 space-y-8">

        {/* HEADER */}
        <div>

          <div className="space-y-4">

  QR

  UTR Input

  Submit Request

</div>

          <p className="text-slate-400 mt-2">

            Deposit balance into your wallet

          </p>

        </div>

        {/* WALLET CARD */}
        <div
          className="
            rounded-3xl
            overflow-hidden
            border border-white/10
            bg-gradient-to-br
            from-indigo-500/20
            to-purple-500/20
            backdrop-blur-xl
            p-8
            relative
          "
        >

          <div
            className="
              absolute
              top-0
              right-0
              w-40
              h-40
              bg-indigo-500/20
              blur-3xl
            "
          />

          <div className="relative z-10">

            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-white/10
                flex
                items-center
                justify-center
                mb-6
              "
            >

              <Wallet
                size={28}
                className="text-white"
              />

            </div>

            <p className="text-slate-300 mb-2">

              Current Wallet Balance

            </p>

            <h2
              className="
                text-5xl
                font-bold
                text-white
              "
            >

              ₹{(balance).toFixed(2)}

            </h2>

          </div>

        </div>

        {/* PAYMENT */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/5
            backdrop-blur-xl
            p-8
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-white
              mb-6
            "
          >

            Deposit Funds

          </h2>

          {/* INPUT */}
          <div className="mb-6">

            <label
              className="
                text-sm
                text-slate-400
                block
                mb-2
              "
            >

              Amount

            </label>

            <div className="relative">

              <BadgeIndianRupee
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input

                type="number"

                value={amount}

                onChange={(e) =>
                  setAmount(
                    e.target.value
                  )
                }

                placeholder="Enter amount"

                className="
                  w-full
                  h-14
                  pl-12
                  pr-4
                  rounded-2xl
                  bg-slate-900/80
                  border border-white/10
                  text-white
                  outline-none
                  focus:border-indigo-500
                "
              />

            </div>

          </div>

          {/* PRESETS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">

            {presets.map((p) => (

              <button

                key={p}

                onClick={() =>
                  setAmount(p)
                }

                className="
                  h-12
                  rounded-2xl
                  bg-white/5
                  border border-white/10
                  hover:border-indigo-500/30
                  hover:bg-indigo-500/10
                  transition-all
                "
              >

                ₹{p}

              </button>

            ))}

          </div>

          {/* PAYMENT METHODS */}
          <div className="space-y-4 mb-8">

<div onClick={() => setMethod("UPI")}>
  <PaymentMethod
    icon={Wallet}
    title="UPI QR (Manual Approval)"
  />
</div>

          </div>

          {/* BUTTON */}
          {method === "RAZORPAY" && (

<button

  onClick={handleAddFunds}

  disabled={loading}

  className="
    w-full
    h-14
    rounded-2xl
    font-semibold
    text-lg
    bg-gradient-to-r
    from-indigo-500
    to-purple-600
    hover:opacity-90
    transition-all
    disabled:opacity-50
    flex
    items-center
    justify-center
    gap-2
  "
>

  <Plus size={18} />

  {loading
    ? "Processing..."
    : "Add Funds"}

</button>
)}
{method === "UPI" && (

<div className="space-y-4">

  <div className="bg-white p-4 rounded-2xl flex justify-center">

    <img
      alt="UPI QR"
      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
        `upi://pay?pa=BHARATPE.9B0N0Q0B1Z314998@unitype&pn=SMM Panel&am=${amount}&cu=INR`
      )}`}
    />

  </div>

  <input
    value={utr}
    onChange={(e) =>
      setUtr(e.target.value)
    }
    placeholder="Enter UTR Number"
    className="
      w-full
      h-14
      px-4
      rounded-2xl
      bg-slate-900/80
      border border-white/10
      text-white
    "
  />

  <button
    onClick={handleUpiRequest}
    className="
      w-full
      h-14
      rounded-2xl
      bg-green-600
      text-white
      font-semibold
    "
  >
    Submit Request
  </button>

</div>

)}

        </div>

      </div>

      {/* ========================================= */}
      {/* RIGHT */}
      {/* ========================================= */}
      <div>

        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/5
            backdrop-blur-xl
            p-8
            sticky top-6
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-white
              mb-6
            "
          >

            Recent Transactions

          </h2>

          <div className="space-y-4">
          {transactions.length === 0 && (

  <p className="text-slate-400">

    No transactions found

  </p>

)}

{transactions
  .slice(0, 10)
  .map((tx) => (

    <div
      key={tx.id}
      className="
        p-4
        rounded-2xl
        bg-slate-900/60
        border border-white/5
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
          mb-2
        "
      >

        <h3 className="font-medium text-white">

          {tx.description}

        </h3>

        <span
          className={`font-semibold ${
            tx.type === "DEBIT"
              ? "text-red-400"
              : "text-green-400"
          }`}
        >

          {tx.type === "DEBIT"
            ? "-"
            : "+"}

          ₹{tx.amount}

        </span>

      </div>

      <p className="text-sm text-slate-400">

        {tx.type}

      </p>

    </div>

))}

          </div>

        </div>

      </div>

      <div
  className="
    rounded-3xl
    border border-white/10
    bg-white/5
    backdrop-blur-xl
    p-8
    mt-6
  "
>

  <h2
    className="
      text-2xl
      font-bold
      text-white
      mb-6
    "
  >
    My Wallet Requests
  </h2>

  {requests.length === 0 ? (

    <p className="text-slate-400">
      No requests found
    </p>

  ) : (

    <div className="space-y-3">

      {requests.map((r) => (

        <div
          key={r.id}
          className="
            p-4
            rounded-2xl
            bg-slate-900/60
            border border-white/5
          "
        >

          <div className="flex justify-between">

            <div>

              <p className="text-white font-medium">
                ₹{r.amount}
              </p>

              <p className="text-sm text-slate-400">
                UTR: {r.utr}
              </p>

            </div>

            <span
              className={`
                px-3
                py-1
                rounded-full
                text-xs
                h-fit
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

          </div>

        </div>

      ))}

    </div>

  )}

</div>

    </motion.div>
  );
}

// ===================================
// PAYMENT METHOD
// ===================================
function PaymentMethod({
  icon: Icon,
  title,
}) {

  return (

    <div
      className="
        h-16
        rounded-2xl
        border border-white/10
        bg-slate-900/60
        px-5
        flex
        items-center
        gap-4
        hover:border-indigo-500/30
        transition-all
        cursor-pointer
      "
    >

      <div
        className="
          w-10
          h-10
          rounded-xl
          bg-indigo-500/10
          flex
          items-center
          justify-center
        "
      >

        <Icon
          size={18}
          className="text-indigo-400"
        />

      </div>

      <span className="text-white font-medium">

        {title}

      </span>

    </div>
  );
}
