import { useNavigate, useLocation } from "react-router-dom";
import { Home, Layers, List, ShoppingCart, Wallet } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin", icon: Home },
    { name: "Providers", path: "/admin/providers", icon: Layers },
    { name: "Services", path: "/admin/services", icon: List },
    { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
    { name:"Wallet Request", path: "admin/wallet-requests", icon: Wallet}
  ];

  return (
    <div className="w-64 bg-slate-800 text-white p-5 flex flex-col">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-8 tracking-wide">
        SMM Panel
      </h1>

      {/* Menu */}
      <div className="flex flex-col gap-2">
        {menu.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md"
                    : "hover:bg-slate-700"
                }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom section (optional but pro feel) */}
      <div className="mt-auto pt-6 text-xs text-slate-400">
        © 2026 SMM Panel
      </div>
    </div>
  );
}