import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";
import AddModal from "@/components/shared/AddModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useTopbar } from "@/hooks/useTopbar";
import { Button } from "@/components/ui/button";
import { notifications,appointments, weeklyData, weekDays, kpis } from "../data/mockData";

const statusStyles: Record<string, string> = {
  Critical: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400",
  Pending: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400",
  Confirmed: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400",
  Urgent: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400",
};

const notificationStyles: Record<string, string> = {
  critical: "bg-red-50 dark:bg-red-950/40 border-red-100 dark:border-red-900",
  warning: "bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900",
  info: "bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900",
};

const notificationDotStyles: Record<string, string> = {
  critical: "bg-red-500",
  warning: "bg-amber-500",
  info: "bg-blue-500",
};

export default function Dashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();
  const maxBar = Math.max(...weeklyData);  
  const { setActions } = useTopbar();
  useEffect(() => {
    setActions(
      <Button
      onClick={() => setShowAddModal(true)}
      className="bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 text-white text-sm font-bold h-9"
      >
        + Add Patient
      </Button>
    );
    return () => setActions(null);
  }, [navigate, setActions]);
  

  return (
    <>
        <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.label} className="border-slate-200 dark:border-slate-700 dark:bg-slate-900">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-9 h-9 rounded-lg ${kpi.iconBg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${kpi.iconColor}`} />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-semibold ${kpi.trend === "up" ? "text-green-600" : "text-red-500"}`}>
                      {kpi.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {kpi.change}
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">
                    {kpi.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">{kpi.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-5 gap-4">
          <Card className="col-span-3 border-slate-200 dark:border-slate-700 dark:bg-slate-900">
            <CardHeader className="pb-2 pt-5 px-5">
              <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Weekly Admissions
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex items-end gap-2 h-full">
                {weeklyData.map((val, i) => {
                  const height = Math.round((val / maxBar) * 100);
                  const isHigh = val >= 80;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                          className={`w-full rounded-t-md transition-all ${
                            isHigh ? "bg-blue-500" : "bg-blue-100 dark:bg-blue-900"
                          }`}
                        style={{ height: `${height}px` }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-2 mt-2">
                {weekDays.map((day,i) => (
                  <div key={i} className="flex-1 text-center text-[10px] text-slate-400 font-mono">
                    {day}
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm bg-blue-500" />
                  <span className="text-xs text-slate-400 dark:text-slate-500">High volume</span>
                </div>
                <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-sm bg-blue-100 dark:bg-blue-900" />
                <span className="text-xs text-slate-400 dark:text-slate-500">Normal</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2 border-slate-200 dark:border-slate-700 dark:bg-slate-900">
            <CardHeader className="pb-2 pt-5 px-5">
              <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Today's Appointments
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-3">
              <div className="flex flex-col">
                {appointments.map((appt, i) => (
                  <div
                    key={appt.id}
                    className={`flex items-center gap-3 py-2.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg px-1 transition-colors ${i !== appointments.length - 1 ? "border-b border-slate-50 dark:border-slate-800": ""}`}
                    onClick={() => navigate(`/patients/${appt.id}`)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${appt.color}`}>
                      {appt.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{appt.patientName}</p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">{appt.message}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{appt.time}</p>
                      <Badge className={`text-[10px] font-bold px-1.5 py-0 mt-0.5 ${appt.status && statusStyles[appt.status]}`}>
                        {appt.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4">
          <Card className="border border-slate-200 dark:border-slate-700 dark:bg-slate-900">
            <CardHeader className="pb-2 pt-5 px-5">
              <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-100">Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex flex-col gap-2">
                {notifications?.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${notificationStyles[alert.type]}`}
                  >
                    <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${notificationDotStyles[alert.type]}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{alert.message}</p>                      <p className="text-xs text-slate-400 font-mono mt-1">{alert.time}</p>
                    </div>
                    <button className="text-slate-300 hover:text-blue-500 transition-colors shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <AddModal
      open={showAddModal}
      onClose={() => setShowAddModal(false)}
    />
    </>
  );
}