import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  CalendarDays,
  Bell,
  UserCheck,
  Settings,
  LogOut,
} from "lucide-react";
import { logoutThunk } from "../../store/authSlice";
import { useAppSelector } from "../../hooks/useAuth";
import type { AppDispatch } from "../../store/store";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Patients", path: "/patients", icon: Users, badge: "248" },
  { label: "Analytics", path: "/analytics", icon: BarChart3 },
  { label: "Appointments", path: "/appointments", icon: CalendarDays, badge: "18" },
  { label: "Notifications", path: "/notifications", icon: Bell, badge: "5" },
];

const manageItems = [
  { label: "Team", path: "/team", icon: UserCheck },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/login");
  };

  const initials = user?.displayName
    ? user.displayName.split(" ").map((n) => n[0]).join("").toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() ?? "DR";

  const isActive = (path: string) =>
    location.pathname === path ||
    (path === "/patients" && location.pathname.startsWith("/patients"));

  return (
    <div className="no-print w-56 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col shrink-0 h-full">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-slate-100 dark:border-slate-800">
        <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center shrink-0">
          <svg viewBox="0 0 18 18" fill="none" className="w-4 h-4">
            <path d="M9 2L15 6V12L9 16L3 12V6L9 2Z" fill="currentColor" opacity=".9" className="text-white dark:text-slate-900" />
            <circle cx="9" cy="9" r="2.5" fill="currentColor" className="text-slate-900 dark:text-white" />
          </svg>
        </div>
        <span
          className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Medi<span className="text-blue-500">Nexus</span>
        </span>
      </div>

      <div className="flex flex-col flex-1 py-4 overflow-y-auto">
        <p className="px-4 pb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Main
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 mx-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all mb-0.5 ${
                active
                  ? "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] bg-red-500 rounded-full text-[10px] font-bold text-white px-1">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <p className="px-4 pb-2 pt-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Manage
        </p>

        {manageItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 mx-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all mb-0.5 ${
                active
                  ? "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`} />
              <span className="flex-1 text-left">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800 p-3">
        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-300 shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
              {user?.displayName ?? user?.email ?? "Doctor"}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">Senior Physician</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-500 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}