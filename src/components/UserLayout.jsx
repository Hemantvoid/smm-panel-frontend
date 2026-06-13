  import {
    useNavigate,
    useLocation,
    Outlet,
  } from "react-router-dom";

  import {
    Home,
    ShoppingCart,
    List,
    Wallet,
    LifeBuoy,
    LogOut,
    Menu,
    X,
    User,
    Code2
  } from "lucide-react";

  import { motion, AnimatePresence } from "framer-motion";

  import { useState, useEffect } from "react";

  import api from "../axios";

  export default function UserLayout() {

    const navigate = useNavigate();

    const location = useLocation();

    const [settings, setSettings] =
    useState(null);

  const primary =
    settings?.primaryColor ||
    "#6366f1";

  const secondary =
    settings?.secondaryColor ||
    "#8b5cf6";
    const style =
  settings?.themeStyle ||
  "midnight";
  const themes = {

  midnight: {
    bg:
      "bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#111827]",
  },

  purple: {
    bg:
      "bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-950",
  },

  neon: {
    bg:
      "bg-gradient-to-br from-black via-cyan-950 to-purple-950",
  },

  ocean: {
    bg:
      "bg-gradient-to-br from-sky-950 via-cyan-900 to-blue-950",
  },

  matrix: {
    bg:
      "bg-gradient-to-br from-black via-green-950 to-emerald-950",
  },

};

    const [sidebarOpen, setSidebarOpen] =
      useState(false);

      const [balance, setBalance] =
    useState(0);

  useEffect(() => {

    const loadData =
      async () => {

        try {

          const [balRes, settingsRes] =
            await Promise.all([

              api.get(
                "/wallet/balance"
              ),

              api.get(
                "/admin/settings/public"
              ),
            ]);

          setBalance(
            balRes.data
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
    // MENU
    // ===============================
    const menu = [

      {
        name: "Dashboard",
        path: "/dashboard",
        icon: Home,
      },

      {
        name: "New Order",
        path: "/dashboard/order",
        icon: ShoppingCart,
      },

      {
        name: "Orders",
        path: "/dashboard/orders",
        icon: List,
      },

      {
        name: "Add Funds",
        path: "/dashboard/funds",
        icon: Wallet,
      },

      {
        name: "Support",
        path: "/dashboard/support",
        icon: LifeBuoy,
      },
      {
        name: "Account",
        path: "/dashboard/account",
        icon: User,
      },
      {
        name: "API Documentation",
        path: "/dashboard/api-docs",
        icon: Code2,
      },

    ];

    // ===============================
    // LOGOUT
    // ===============================
    const logout = () => {

      localStorage.removeItem("token");

      localStorage.removeItem("role");

      navigate("/login");
    };

    console.log("Settings:", settings);

    return (

      <div
  className={`
    flex
    h-screen
    overflow-hidden
    text-white
    ${themes[style].bg}
  `}
>

        {/* ========================================= */}
        {/* MOBILE OVERLAY */}
        {/* ========================================= */}
        <AnimatePresence>

          {sidebarOpen && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="
  fixed
  inset-y-0
  left-0
  w-80
  overflow-y-auto
  bg-black/60
  backdrop-blur-2xl
  z-50
  p-6
" 
            />

          )}

        </AnimatePresence>

  {/* ========================================= */}
  {/* DESKTOP SIDEBAR */}
  {/* ========================================= */}
<aside
  className="
    hidden
    lg:flex
    w-80
    h-screen
    overflow-y-auto
    border-r
    border-white/10
    bg-black/30
    backdrop-blur-2xl
    flex-col
    px-6
    py-8
    scrollbar-thin
    scrollbar-thumb-white/10
  "
>

  <div className="mb-12 flex flex-col items-center text-center">

  {/* LOGO */}
  {settings?.logoUrl && (

    <div
      className="
        relative
        mb-5
      "
    >

      {/* Glow */}
      <div
        className="
          absolute
          inset-0
          rounded-3xl
          blur-2xl
          opacity-40
        "
        style={{
          background:
            `linear-gradient(
              135deg,
              ${primary},
              ${secondary}
            )`
        }}
      />

      {/* Logo */}
      <img
        src={settings.logoUrl}
        alt="Logo"
        className="
          relative
          w-24
          h-24
          rounded-3xl
          object-cover
          border
          border-white/10
          shadow-2xl
        "
      />

    </div>

  )}

  {/* PANEL NAME */}
  <h1
    className="
      text-4xl
      font-black
      tracking-tight
      leading-none
      mb-3
    "
  >
    {settings?.panelName || "SMM Panel"}
  </h1>

  {/* SUBTITLE */}
  <p
    className="
      text-slate-400
      text-sm
      leading-relaxed
      max-w-[180px]
    "
  >
    Premium User Dashboard
  </p>

</div>
    {/* MENU */}
    <div className="flex flex-col gap-3">

      {menu.map((item, i) => {

        const isActive =
  location.pathname === item.path;

        const Icon = item.icon;

        return (

          <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    key={i}
    onClick={() => navigate(item.path)}
    className={`
      group
      flex items-center gap-4
      px-5 py-4
      rounded-2xl
      cursor-pointer
      transition-all duration-300
      border
      ${
        isActive
          ? "border-transparent"
          : "border-white/5 hover:bg-white/5 hover:border-white/10"
      }
    `}
    style={
      isActive
        ? {
            background: `linear-gradient(
              90deg,
              ${primary},
              ${secondary}
            )`,
          }
        : {}
    }
    >

            <Icon
              size={20}
              className={
                isActive
                  ? "text-white"
                  : "text-slate-400 group-hover:text-white"
              }
            />

            <span className="font-medium">

              {item.name}

            </span>

          </motion.div>
        );
      })}

    </div>

    {/* BOTTOM */}
    <div className="mt-auto">

      <div className="border border-white/10 bg-white/5 rounded-2xl p-4 mb-4">

        <div className="flex items-center gap-3">

          <div
    className="
      w-12 h-12
      rounded-full
      flex
      items-center
      justify-center
      font-bold
      text-lg
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

          <div>

            <h3 className="font-semibold">

              User

            </h3>

            <p className="text-slate-400 text-sm">

              Active Account

            </p>

          </div>

        </div>

      </div>

      <button
        onClick={logout}
        className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 py-3 rounded-2xl transition-all"
      >

        <LogOut size={18} />

        Logout

      </button>

    </div>

  </aside>

  {/* ========================================= */}
  {/* MOBILE SIDEBAR */}
  {/* ========================================= */}
  <AnimatePresence>

    {sidebarOpen && (

      <motion.aside

        initial={{ x: -320 }}
        animate={{ x: 0 }}
        exit={{ x: -320 }}

        transition={{
          type: "spring",
          damping: 25,
          stiffness: 250,
        }}

        className="
          fixed
          top-0 left-0
          z-50
          h-screen
          w-80
          border-r border-white/10
          bg-black/60
          backdrop-blur-xl
          flex flex-col
          p-6 py-8
          lg:hidden
        "
      >

        {/* TOP */}
        <div className="flex items-center justify-between mb-8">

          <h2 className="text-xl font-bold">
            Menu
          </h2>

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
            className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"
          >

            <X size={20} />

          </button>

        </div>

        {/* MENU */}
        <div className="flex flex-col gap-3">

          {menu.map((item, i) => {

            const Icon = item.icon;

            const isActive =
  location.pathname === item.path;

            return (

              <div
                key={i}
                onClick={() => {

                  navigate(item.path);

                  setSidebarOpen(false);

                }}
                className={`
    group
    flex items-center gap-4
    px-5 py-4
    rounded-2xl
    cursor-pointer
    transition-all duration-300
    border
    ${
      isActive
        ? "border-transparent"
        : "border-white/5 hover:bg-white/10 hover:border-white/10"
    }
  `}
style={
  isActive
    ? {
        background: `linear-gradient(
          90deg,
          ${primary},
          ${secondary}
        )`,
        boxShadow:
          `0 0 30px ${primary}55`
      }
    : {}
}
              >

                <Icon size={20} />

                <span>
                  {item.name}
                </span>

              </div>
            );
          })}

        </div>

      </motion.aside>

    )}

  </AnimatePresence>

        {/* ========================================= */}
        {/* MAIN */}
        {/* ========================================= */}
        <div className="flex-1 flex flex-col overflow-y-auto relative lg:ml-0">

          {/* BACKGROUND GLOW */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.25),transparent_35%)] pointer-events-none" />

          {/* NAVBAR */}
          <header className="h-20 border-b border-white/10 bg-black/30 backdrop-blur-xl px-6 lg:px-8 flex items-center justify-between relative z-10">

            {/* LEFT */}
  <div className="flex items-center gap-4">

    {/* MOBILE MENU */}
    <button
      onClick={() => setSidebarOpen(true)}
      className="
        lg:hidden
        w-11 h-11
        rounded-2xl
        bg-white/20
        border border-white/10
        flex items-center justify-center
      "
    >
      <Menu size={20} />
    </button>

    <div>

      <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">

        Welcome Back 👋

      </h2>

      <p className="text-slate-400 text-sm mt-1 hidden sm:block">

        Manage your orders and services

      </p>

    </div>

  </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

              {/* BALANCE */}
  <div className="hidden md:flex flex-col items-end">

    <span className="text-slate-400 text-xs">
      Wallet Balance
    </span>

    <h3 className="text-lg font-bold text-green-400">

      ₹{Number(balance).toFixed(2)}

    </h3>

  </div>

              {/* AVATAR */}
              <div
    className="
      w-11 h-11
      rounded-full
      flex
      items-center
      justify-center
      font-bold
    "
    style={{
      background: `linear-gradient(
        135deg,
        ${primary},
        ${secondary}
      )`
    }}
  >

                U

              </div>

            </div>

          </header>

          {/* CONTENT */}
          <main className="flex-1 overflow-y-auto p-5 lg:p-8 relative z-10">

            <Outlet />

          </main>

        </div>

      </div>
    );
  }