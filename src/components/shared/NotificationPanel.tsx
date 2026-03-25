import { useEffect, useState } from "react";
import { Bell, X, AlertCircle, Calendar, Pill, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notifications } from "@/data/mockData";
import type { ActivityType } from "@/data/mockData";
import { toast } from "sonner";
import {
  requestNotificationPermission,
} from "../../lib/notifications";
import { useNavigate } from "react-router-dom";

const iconMap: Record<string, React.ReactNode> = {
  critical: <AlertCircle className="w-4 h-4 text-red-500" />,
  warning: <Pill className="w-4 h-4 text-amber-500" />,
  info: <Info className="w-4 h-4 text-blue-500" />,
  appointment: <Calendar className="w-4 h-4 text-purple-500" />,
};

export default function NotificationPanel() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [permitted, setPermitted] = useState(
    typeof Notification !== "undefined" &&
      Notification.permission === "granted"
  );
  const [items, setItems] = useState<ActivityType[]>(() => {
    if (typeof window === "undefined") return notifications;
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : notifications;
  });
  const unreadCount = items.filter((n) => !n.read).length;
  const handleEnable = async () => {
    const granted = await requestNotificationPermission();
    setPermitted(granted);
  };

  const markAllRead = () => {
    setItems([])
  };

  const markRead = (id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-14 z-50 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 text-[10px] font-bold rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
              {notifications.length > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-blue-500 font-semibold hover:underline"
                >
                  Mark all read
                </button>
              )}
                <button
                  onClick={() => setOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="max-h-56 overflow-y-auto">
              {items.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    markRead(n.id);
                    if (n.redirectUrl) navigate(n.redirectUrl);
                  }}                  
                  className={`flex items-start gap-3 px-4 py-3 border-b border-slate-50 dark:border-slate-800 cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 ${
                    !n.read ? "bg-slate-50 dark:bg-slate-800/50" : ""
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{iconMap[n.type]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {n.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {n.message}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">
                      {n.time}
                    </p>
                  </div>
                  {!n.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                  )}
                </div>
              ))}
            </div>

            <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800">
              {!permitted && (
                <div className="mb-3 p-2.5 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-medium mb-2">
                    Enable notifications for real-time alerts
                  </p>
                  <Button
                    size="sm"
                    onClick={handleEnable}
                    className="h-7 text-xs bg-amber-500 hover:bg-amber-600 text-white border-none w-full"
                  >
                    Enable notifications
                  </Button>
                </div>
              )}

              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Test push notifications
              </p>
              <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => {
                        const newItem: ActivityType = {
                          id: Date.now().toString(),
                          type: "info",
                          category: "notification",
                          title: "Test Alert",
                          message: "Triggered manually",
                          time: new Date().toLocaleTimeString(),
                          read: false,
                        };
                        toast.info("Test Alert sent");
                        setItems((prev) => [newItem, ...prev]);
                        setOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg border text-xs font-semibold transition-all hover:opacity-80`}
                  >
                    Test Notification
                  </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}