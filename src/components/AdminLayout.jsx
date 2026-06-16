import {
  Home,
  Layers,
  List,
  ShoppingCart,
  Bell,
  Search,
  ChevronDown,
  Settings,
  MessageSquare,
  Wallet
} from "lucide-react";

import { Menu, X } from "lucide-react";

import { useEffect, useState } from "react";
import api from "../axios";

import {
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";

export default function AdminLayout() {

  const navigate = useNavigate();
  const location = useLocation();

  const [settings, setSettings] =
    useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const primary =
    settings?.primaryColor ||
    "#6366f1";

  const secondary =
    settings?.secondaryColor ||
    "#8b5cf6";

  useEffect(() => {

    api
      .get("/admin/settings")
      .then((res) => {
        setSettings(res.data);
      })
      .catch(console.error);

  }, []);

  const menu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: Home,
    },
    {
      name: "Providers",
      path: "/admin/providers",
      icon: Layers,
    },
    {
      name: "Services",
      path: "/admin/services",
      icon: List,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      name: "Tickets",
      path: "/admin/tickets",
      icon: MessageSquare,
    },
    {
      name: "Wallet Requests",
      path: "/admin/wallet-requests",
      icon: Wallet
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <>
  {sidebarOpen && (
    <div
      className="fixed inset-0 bg-black/70 z-40 md:hidden"
      onClick={() => setSidebarOpen(false)}
    />
  )}

  <div className="flex h-screen bg-[#020617] text-white overflow-hidden"></div>
    <div className="flex h-screen bg-[#020617] text-white overflow-hidden">

      {/* SIDEBAR */}
     <aside className="hidden md:flex w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex-col"> bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col">

        {/* LOGO */}
        <div className="h-20 flex items-center px-6 border-b border-white/10">

          {settings?.logoUrl ? (

            <img
              src={settings.logoUrl}
              alt="logo"
              className="w-11 h-11 rounded-2xl object-cover"
            />

          ) : (

            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${primary}, ${secondary})`,
              }}
            >
              S
            </div>

          )}

          <div className="ml-3">

            <h1 className="font-bold text-lg">
              {settings?.panelName || "SMM Admin"}
            </h1>

            <p className="text-xs text-slate-400">
              Premium Panel
            </p>

          </div>

          <div className="ml-auto md:hidden">
  <button
    onClick={() => setSidebarOpen(false)}
  >
    <X size={24} />
  </button>
</div>

        </div>

        {/* MENU */}
        <div className="flex-1 p-4 space-y-2">

          {menu.map((item, i) => {

            const isActive =
              location.pathname === item.path;

            const Icon = item.icon;

            return (
              <button
                key={i}
                onClick={() => {
  navigate(item.path);
  setSidebarOpen(false);
}}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group"
                style={
                  isActive
                    ? {
                        background:
                          `linear-gradient(90deg, ${primary}, ${secondary})`,
                        boxShadow:
                          `0 8px 25px ${primary}55`,
                      }
                    : {}
                }
              >

                <Icon
                  size={20}
                  className={`transition ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-white"
                  }`}
                />

                <span
                  className={`font-medium ${
                    isActive
                      ? "text-white"
                      : "text-slate-300"
                  }`}
                >
                  {item.name}
                </span>

              </button>
            );

          })}

        </div>

        {/* USER PROFILE */}
        <div className="p-4 border-t border-white/10">

          <div className="bg-white/5 rounded-2xl p-4 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-bold"
                style={{
                  background:
                    `linear-gradient(135deg, ${primary}, ${secondary})`,
                }}
              >
                A
              </div>

              <div>

                <p className="font-medium">
                  Admin
                </p>

                <p className="text-xs text-slate-400">
                  Super Admin
                </p>

              </div>

            </div>

            <ChevronDown
              size={18}
              className="text-slate-400"
            />

          </div>

        </div>

      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* NAVBAR */}
       <header className="h-20 bg-white/5 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 flex items-center justify-between">

       <button
  className="md:hidden"
  onClick={() => setSidebarOpen(true)}
>
  <Menu size={26} />
</button>

          {/* SEARCH */}
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 w-[350px]">

            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent outline-none px-3 py-3 text-sm w-full"
            />

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* BALANCE */}
            <div
              className="px-5 py-2 rounded-2xl"
              style={{
                background:
                  `linear-gradient(135deg, ${primary}, ${secondary})`,
                boxShadow:
                  `0 8px 25px ${primary}55`,
              }}
            >

            </div>

            {/* NOTIFICATIONS */}
            <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">

              <Bell size={20} />

            </button>

            {/* PROFILE */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2">

              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-bold"
                style={{
                  background:
                    `linear-gradient(135deg, ${primary}, ${secondary})`,
                }}
              >
                A
              </div>

              <div>

                <p className="font-medium text-sm">
                  Admin
                </p>

                <p className="text-xs text-slate-400">
  {localStorage.getItem("username")}
</p>

              </div>

            </div>

          </div>

        </header>

        {/* CONTENT */}
       <main className="flex-1 overflow-y-auto p-4 md:p-8">

          <Outlet />

        </main>

      </div>

    </div>
    </>
  );
}
