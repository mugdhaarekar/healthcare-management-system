import { useState } from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useTopbar } from "@/hooks/useTopbar";
import { analyticsMonths, analyticsTabs, departments, diagnoses, donutSegments, monthlyAnalyticData, stats } from "@/data/mockData";

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
        <span className="text-lg font-extrabold text-slate-900 dark:text-slate-100">248</span>
        <span className="text-[10px] text-slate-400">patients</span>
      </div>
    </div>
  );
}

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("This month");
  const maxBar = Math.max(...monthlyAnalyticData);
  
  const { setActions } = useTopbar();

  useEffect(() => {
    setActions(
      <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 gap-1">
        {analyticsTabs.map((tab) => (
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
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-slate-200 dark:border-slate-700 dark:bg-slate-900">
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
          <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-900">
            <CardHeader className="pt-5 px-5 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-100">Diagnosis distribution</CardTitle>
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

          <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-900">
            <CardHeader className="pt-5 px-5 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-100">Department capacity</CardTitle>
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

        <div className="grid">
          <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-900">
            <CardHeader className="pt-5 px-5 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Monthly Admission Trends
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex items-end gap-2 h-28">
                {monthlyAnalyticData.map((val, i) => {
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
                {analyticsMonths.map((m) => (
                  <div
                    key={m}
                    className="flex-1 text-center text-[10px] text-slate-400 dark:text-slate-500 font-mono"
                  >
                    {m}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}