import {
  Bell,
  LogOut,
  Search,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import api from "../axios";

export default function Navbar() {

  const navigate = useNavigate();

  const [balance, setBalance] =
    useState(0);

  const [settings, setSettings] =
    useState(null);

  const primary =
    settings?.primaryColor ||
    "#6366f1";

  const secondary =
    settings?.secondaryColor ||
    "#8b5cf6";

  const isLight =
    settings?.themeMode === "light";

  // ===============================
  // LOAD DATA
  // ===============================
  useEffect(() => {

    const loadData =
      async () => {

        try {

          const [
            balanceRes,
            settingsRes,
          ] = await Promise.all([

            api.get(
              "/wallet/balance"
            ),

            api.get(
              "/admin/settings/public"
            ),

          ]);

          setBalance(
            balanceRes.data
          );

          setSettings(
            settingsRes.data
          );

        } catch (err) {

          console.error(err);
        }
      };

    loadData();

  }, []);

  // ===============================
  // LOGOUT
  // ===============================
  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    navigate("/login");
  };

  return (

    <header
      className={
        isLight
          ? `
              h-20
              border-b
              border-slate-200
              bg-white
              px-8
              flex
              items-center
              justify-between
              relative
              z-10
            `
          : `
              h-20
              border-b
              border-white/10
              bg-[#0f172a]/70
              backdrop-blur-xl
              px-8
              flex
              items-center
              justify-between
              relative
              z-10
            `
      }
    >

      {/* LEFT */}
      <div>

        <h1
          className={`
            text-2xl
            font-bold
            tracking-tight
            ${
              isLight
                ? "text-slate-900"
                : "text-white"
            }
          `}
        >
          {settings?.panelName ||
            "Dashboard"}
        </h1>

        <p
          className={`
            text-sm
            mt-1
            ${
              isLight
                ? "text-slate-500"
                : "text-slate-400"
            }
          `}
        >
          Welcome back to your panel
        </p>

      </div>

      {/* RIGHT */}
      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        {/* SEARCH */}
        <div
          className={`
            hidden
            lg:flex
            items-center
            gap-3
            border
            rounded-2xl
            px-4
            h-12
            w-72
            ${
              isLight
                ? "bg-slate-100 border-slate-200"
                : "bg-white/5 border-white/10"
            }
          `}
        >

          <Search
            size={18}
            className={
              isLight
                ? "text-slate-500"
                : "text-slate-400"
            }
          />

          <input
            type="text"
            placeholder="Search..."
            className={`
              bg-transparent
              outline-none
              text-sm
              w-full
              ${
                isLight
                  ? "text-slate-900 placeholder:text-slate-400"
                  : "text-white placeholder:text-slate-500"
              }
            `}
          />

        </div>

        {/* NOTIFICATIONS */}
        <motion.div
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className={`
            relative
            w-12
            h-12
            rounded-2xl
            border
            flex
            items-center
            justify-center
            cursor-pointer
            transition
            ${
              isLight
                ? "bg-white border-slate-200 hover:bg-slate-50"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }
          `}
        >

          <Bell
            size={20}
            className={
              isLight
                ? "text-slate-700"
                : "text-slate-300"
            }
          />

          <div
            className="
              absolute
              top-3
              right-3
              w-2
              h-2
              rounded-full
              bg-red-500
            "
          />

        </motion.div>

        {/* BALANCE */}
        <div
          className={`
            hidden
            md:flex
            flex-col
            items-end
            border
            px-5
            py-2
            rounded-2xl
            min-w-[160px]
            ${
              isLight
                ? "bg-white border-slate-200"
                : "bg-white/5 border-white/10"
            }
          `}
        >

          <span
            className={`
              text-xs
              ${
                isLight
                  ? "text-slate-500"
                  : "text-slate-400"
              }
            `}
          >
            Wallet Balance
          </span>

          <h3
            className="
              text-lg
              font-bold
              text-green-500
            "
          >
            ₹{Number(balance).toFixed(2)}
          </h3>

        </div>

        {/* USER */}
        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className={`
            flex
            items-center
            gap-3
            border
            px-4
            py-2
            rounded-2xl
            cursor-pointer
            transition
            ${
              isLight
                ? "bg-white border-slate-200 hover:bg-slate-50"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }
          `}
        >

          {/* AVATAR */}
          <div
            className="
              w-11
              h-11
              rounded-full
              flex
              items-center
              justify-center
              text-sm
              font-bold
            "
            style={{
              background:
                `linear-gradient(
                  135deg,
                  ${primary},
                  ${secondary}
                )`
            }}
          >
            U
          </div>

          {/* INFO */}
          <div className="hidden md:block">

            <h4
              className={`
                text-sm
                font-semibold
                ${
                  isLight
                    ? "text-slate-900"
                    : "text-white"
                }
              `}
            >
              User
            </h4>

            <p
              className={`
                text-xs
                ${
                  isLight
                    ? "text-slate-500"
                    : "text-slate-400"
                }
              `}
            >
              Active Account
            </p>

          </div>

        </motion.div>

        {/* LOGOUT */}
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={logout}
          className="
            w-12
            h-12
            rounded-2xl
            bg-red-500/10
            border
            border-red-500/20
            flex
            items-center
            justify-center
            text-red-400
            hover:bg-red-500/20
            transition
          "
        >
          <LogOut size={20} />
        </motion.button>

      </div>

    </header>
  );
}