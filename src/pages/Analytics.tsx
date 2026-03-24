import { useState } from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useTopbar } from "@/hooks/useTopbar";
import { Button } from "@/components/ui/button";
const stats = [
  {
    label: "Avg. recovery time",
    value: "4.2",
    unit: "days",
    change: "↓ 0.8 days vs last month",
    trend: "up",
    color: "text-blue-500",
  },
  {
    label: "Patient satisfaction",
    value: "91",
    unit: "%",
    change: "↑ 3% improvement",
    trend: "up",
    color: "text-green-500",
  },
  {
    label: "Readmission rate",
    value: "7.4",
    unit: "%",
    change: "↑ Above 6% target",
    trend: "down",
    color: "text-amber-500",
  },
  {
    label: "Beds occupied",
    value: "84",
    unit: "%",
    change: "↑ High capacity",
    trend: "down",
    color: "text-red-500",
  },
];

const diagnoses = [
  { label: "Cardiovascular", pct: 40, color: "bg-blue-500" },
  { label: "Respiratory", pct: 26, color: "bg-green-500" },
  { label: "Neurological", pct: 19, color: "bg-purple-500" },
  { label: "Oncology", pct: 15, color: "bg-amber-500" },
];

const departments = [
  { label: "Emergency", pct: 93, color: "bg-red-500", textColor: "text-red-500" },
  { label: "Cardiology", pct: 87, color: "bg-blue-500", textColor: "text-blue-500" },
  { label: "Oncology", pct: 72, color: "bg-amber-500", textColor: "text-amber-500" },
  { label: "Neurology", pct: 64, color: "bg-purple-500", textColor: "text-purple-500" },
  { label: "Orthopedics", pct: 45, color: "bg-slate-300", textColor: "text-slate-400" },
];

const monthlyData = [42, 55, 38, 72, 60, 68, 50, 85, 62, 48, 78, 91];
const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
const tabs = ["This month", "Quarter", "Year"];

const donutSegments = [
  { pct: 40, color: "#3B82F6" },
  { pct: 26, color: "#22C55E" },
  { pct: 19, color: "#A855F7" },
  { pct: 15, color: "#F59E0B" },
];

function DonutChart() {
  const size = 120;
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F1F5F9"
          strokeWidth="14"
        />
        {donutSegments.map((seg, i) => {
          const dash = (seg.pct / 100) * circumference;
          const gap = circumference - dash;
          const currentOffset = offset;
          offset += dash;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="14"
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-currentOffset + circumference / 4}
              strokeLinecap="round"
              style={{ transform: `rotate(-90deg)`, transformOrigin: "center" }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-extrabold text-slate-900">248</span>
        <span className="text-[10px] text-slate-400">patients</span>
      </div>
    </div>
  );
}

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("This month");
  const maxBar = Math.max(...monthlyData);
  
  const { setActions } = useTopbar();

  useEffect(() => {
    setActions(
      <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === tab
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    );
    return () => setActions(null);
  }, [activeTab, setActions]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shrink-0">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">Analytics</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">Clinical performance · Mar 2026</p>
        </div>
        <div className="flex bg-slate-100 rounded-lg p-1 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === tab
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div> */}

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-slate-200">
              <CardContent className="p-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {stat.label}
                </p>
                <div className={`text-2xl font-extrabold tracking-tight leading-none ${stat.color}`}>
                  {stat.value}
                  <span className="text-sm text-slate-400 font-medium ml-1">{stat.unit}</span>
                </div>
                <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${stat.trend === "up" ? "text-green-600" : "text-red-500"}`}>
                  {stat.trend === "up"
                    ? <TrendingUp className="w-3 h-3" />
                    : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="border-slate-200">
            <CardHeader className="pt-5 px-5 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-900">Diagnosis distribution</CardTitle>
                <span className="text-xs text-blue-500 font-semibold cursor-pointer">Export</span>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex items-center gap-6">
                <DonutChart />
                <div className="flex flex-col gap-3 flex-1">
                  {diagnoses.map((d) => (
                    <div key={d.label} className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-sm shrink-0 ${d.color}`} />
                      <span className="text-sm text-slate-600 font-medium flex-1">{d.label}</span>
                      <span className="text-sm font-bold font-mono text-slate-500">{d.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="pt-5 px-5 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-900">Department capacity</CardTitle>
                <span className="text-xs text-blue-500 font-semibold cursor-pointer">View all</span>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex flex-col gap-4">
                {departments.map((dept) => (
                  <div key={dept.label} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">{dept.label}</span>
                      <span className={`text-sm font-bold font-mono ${dept.textColor}`}>
                        {dept.pct}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${dept.color}`}
                        style={{ width: `${dept.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-200">
          <CardHeader className="pt-5 px-5 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <CardTitle className="text-sm font-bold text-slate-900">
                  Monthly admission trends
                </CardTitle>
              </div>
              <span className="text-xs text-blue-500 font-semibold cursor-pointer">
                Download CSV
              </span>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="flex items-end gap-2 h-28">
              {monthlyData.map((val, i) => {
                const height = Math.round((val / maxBar) * 100);
                const isHigh = val >= 80;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-t-md transition-all ${
                        isHigh ? "bg-blue-500" : "bg-blue-100"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 mt-2">
              {months.map((m) => (
                <div
                  key={m}
                  className="flex-1 text-center text-[10px] text-slate-400 font-mono"
                >
                  {m}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}