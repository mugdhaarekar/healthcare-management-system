import { useNavigate } from "react-router-dom";
import {
  Users,
  CalendarDays,
  AlertTriangle,
  BedDouble,
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
import { activities } from "@/data/mockData";

const kpis = [
  {
    label: "Total Patients",
    value: "248",
    change: "+12 this week",
    trend: "up",
    icon: Users,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "Appointments Today",
    value: "18",
    change: "+3 from yesterday",
    trend: "up",
    icon: CalendarDays,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    label: "Critical Alerts",
    value: "5",
    change: "Needs review",
    trend: "down",
    icon: AlertTriangle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    label: "ICU Admissions",
    value: "2",
    change: "Up from 0",
    trend: "down",
    icon: BedDouble,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
];

// const appointments = [
//   {
//     id: "MPI-00142",
//     name: "Rahul Mehta",
//     type: "Follow-up · Cardiology",
//     time: "09:00",
//     status: "Critical",
//     initials: "RM",
//     color: "bg-blue-100 text-blue-700",
//   },
//   {
//     id: "MPI-00189",
//     name: "Ayesha Khan",
//     type: "Consultation · General",
//     time: "10:30",
//     status: "Pending",
//     initials: "AK",
//     color: "bg-green-100 text-green-700",
//   },
//   {
//     id: "MPI-00217",
//     name: "Vijay Sharma",
//     type: "Review · Neurology",
//     time: "12:00",
//     status: "Confirmed",
//     initials: "VS",
//     color: "bg-purple-100 text-purple-700",
//   },
//   {
//     id: "MPI-00231",
//     name: "Priya Joshi",
//     type: "Admission · ICU",
//     time: "14:00",
//     status: "Urgent",
//     initials: "PJ",
//     color: "bg-red-100 text-red-700",
//   },
// ];
const appointments = activities.filter(
  (item) => item.category === "appointment"
);

const alerts = [
  {
    id: "1",
    message: "Rahul Mehta — SpO₂ dropped to 88%. Supplemental oxygen initiated.",
    time: "08:14 AM · ICU-2",
    type: "critical",
  },
  {
    id: "2",
    message: "Ayesha Khan — Missed morning medication dose. Nurse alert triggered.",
    time: "08:00 AM · Ward 3",
    type: "warning",
  },
  {
    id: "3",
    message: "Lab results ready for Sunita Iyer. CBC and lipid panel available.",
    time: "07:45 AM · Lab",
    type: "info",
  },
];

const weeklyData = [42, 58, 33, 82, 62, 70, 91];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const statusStyles: Record<string, string> = {
  Critical: "bg-red-100 text-red-700",
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-green-100 text-green-700",
  Urgent: "bg-red-100 text-red-700",
};

const alertStyles: Record<string, string> = {
  critical: "bg-red-50 border-red-100",
  warning: "bg-amber-50 border-amber-100",
  info: "bg-blue-50 border-blue-100",
};

const alertDotStyles: Record<string, string> = {
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
              <Card key={kpi.label} className="border-slate-200">
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
          <Card className="col-span-3 border-slate-200">
            <CardHeader className="pb-2 pt-5 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-900">Weekly admissions</CardTitle>
                <span className="text-xs text-blue-500 font-semibold cursor-pointer">View report</span>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex items-end gap-2 h-24">
                {weeklyData.map((val, i) => {
                  const height = Math.round((val / maxBar) * 100);
                  const isHigh = val >= 80;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className={`w-full rounded-t-md transition-all ${isHigh ? "bg-blue-500" : "bg-blue-100"}`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-2 mt-2">
                {weekDays.map((day) => (
                  <div key={day} className="flex-1 text-center text-[10px] text-slate-400 font-mono">
                    {day}
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm bg-blue-500" />
                  <span className="text-xs text-slate-400">High volume</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm bg-blue-100" />
                  <span className="text-xs text-slate-400">Normal</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2 border-slate-200">
            <CardHeader className="pb-2 pt-5 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-900">Today's appointments</CardTitle>
                <span className="text-xs text-blue-500 font-semibold cursor-pointer">View all</span>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-3">
              <div className="flex flex-col">
                {appointments.map((appt, i) => (
                  <div
                    key={appt.id}
                    className={`flex items-center gap-3 py-2.5 cursor-pointer hover:bg-slate-50 rounded-lg px-1 transition-colors ${i !== appointments.length - 1 ? "border-b border-slate-50" : ""}`}
                    onClick={() => navigate(`/patients/${appt.id}`)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${appt.color}`}>
                      {appt.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{appt.patientName}</p>
                      <p className="text-[11px] text-slate-400 truncate">{appt.type}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[11px] font-mono text-slate-500">{appt.time}</p>
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

        <Card className="border-slate-200">
          <CardHeader className="pb-2 pt-5 px-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-900">Recent alerts</CardTitle>
              <button className="text-xs text-blue-500 font-semibold hover:underline">
                Mark all read
              </button>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="flex flex-col gap-2">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${alertStyles[alert.type]}`}
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${alertDotStyles[alert.type]}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">{alert.message}</p>
                    <p className="text-xs text-slate-400 font-mono mt-1">{alert.time}</p>
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
    <AddModal
      open={showAddModal}
      onClose={() => setShowAddModal(false)}
    />
    </>
  );
}