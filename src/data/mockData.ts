import { AlertTriangle, BedDouble, CalendarDays, Users } from "lucide-react";

export type ActivityType = {
  id: string;
  category: "notification" | "appointment";
  type: "critical" | "warning" | "info" | "appointment";
  title: string;
  message: string;
  time: string;
  read?: boolean;
  patientId?: string;
  patientName?: string;
  status?: "Critical" | "Pending" | "Confirmed" | "Urgent";
  initials?: string;
  color?: string;
  redirectUrl?: string;
};

export const activities: ActivityType[] = [
  {
    id: "1",
    category: "notification",
    type: "critical",
    title: "Critical Alert",
    message: "Rahul Mehta — SpO₂ dropped to 88%",
    time: "08:14 AM",
    read: false,
    redirectUrl: "/patients/MPI-00142",
  },
  {
    id: "2",
    category: "notification",
    type: "warning",
    title: "Missed Medication",
    message: "Ayesha Khan missed morning dose",
    time: "08:00 AM",
    read: false,
    redirectUrl: "/patients/MPI-00189",
  },
  {
    id: "3",
    category: "notification",
    type: "info",
    title: "Lab Results Ready",
    message: "Sunita Iyer — CBC available",
    time: "07:45 AM",
    read: true,
    redirectUrl: "/reports/sunita-iyer",
  },
  {
    id: "MPI-00142",
    category: "appointment",
    type: "appointment",
    title: "Appointment",
    message: "Follow-up · Cardiology",
    time: "09:00",
    patientId: "MPI-00142",
    patientName: "Rahul Mehta",
    status: "Critical",
    initials: "RM",
    color: "bg-blue-100 text-blue-700",
    redirectUrl: "/patients/MPI-00142",
  },
  {
    id: "MPI-00189",
    category: "appointment",
    type: "appointment",
    title: "Appointment",
    message: "Consultation · General",
    time: "10:30",
    patientId: "MPI-00189",
    patientName: "Ayesha Khan",
    status: "Pending",
    initials: "AK",
    color: "bg-green-100 text-green-700",
    redirectUrl: "/patients/MPI-00189",
  },
  {
    id: "MPI-00217",
    category: "appointment",
    type: "appointment",
    title: "Appointment",
    message: "Review · Neurology",
    time: "12:00",
    patientId: "MPI-00217",
    patientName: "Vijay Sharma",
    status: "Confirmed",
    initials: "VS",
    color: "bg-purple-100 text-purple-700",
    redirectUrl: "/patients/MPI-00217",
  },
  {
    id: "MPI-00231",
    category: "appointment",
    type: "appointment",
    title: "Appointment",
    message: "Admission · ICU",
    time: "14:00",
    patientId: "MPI-00231",
    patientName: "Priya Joshi",
    status: "Urgent",
    initials: "PJ",
    color: "bg-red-100 text-red-700",
    redirectUrl: "/patients/MPI-00231",
  },
];

export const notifications = activities.filter(
  (a) => a.category === "notification"
);

export const appointments = activities.filter(
  (a) => a.category === "appointment"
);

export const kpis = [
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
  
export const weeklyData = [42, 58, 33, 82, 62, 70, 91];
export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const monthlyAdmissions = [42, 55, 38, 72, 60, 68, 50, 85, 62, 48, 78, 91];
export const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

export const diagnosisData = [
  { label: "Cardiovascular", pct: 40, color: "bg-blue-500", hex: "#3B82F6" },
  { label: "Respiratory", pct: 26, color: "bg-green-500", hex: "#22C55E" },
  { label: "Neurological", pct: 19, color: "bg-purple-500", hex: "#A855F7" },
  { label: "Oncology", pct: 15, color: "bg-amber-500", hex: "#F59E0B" },
];

export const departmentData = [
  { label: "Emergency", pct: 93, color: "bg-red-500", textColor: "text-red-500" },
  { label: "Cardiology", pct: 87, color: "bg-blue-500", textColor: "text-blue-500" },
  { label: "Oncology", pct: 72, color: "bg-amber-500", textColor: "text-amber-500" },
  { label: "Neurology", pct: 64, color: "bg-purple-500", textColor: "text-purple-500" },
  { label: "Orthopedics", pct: 45, color: "bg-slate-300", textColor: "text-slate-400" },
];

export const analyticsStats = [
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
export const stats = [
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

export const diagnoses = [
  { label: "Cardiovascular", pct: 40, color: "bg-blue-500" },
  { label: "Respiratory", pct: 26, color: "bg-green-500" },
  { label: "Neurological", pct: 19, color: "bg-purple-500" },
  { label: "Oncology", pct: 15, color: "bg-amber-500" },
];

export const departments = [
  { label: "Emergency", pct: 93, color: "bg-red-500", textColor: "text-red-500" },
  { label: "Cardiology", pct: 87, color: "bg-blue-500", textColor: "text-blue-500" },
  { label: "Oncology", pct: 72, color: "bg-amber-500", textColor: "text-amber-500" },
  { label: "Neurology", pct: 64, color: "bg-purple-500", textColor: "text-purple-500" },
  { label: "Orthopedics", pct: 45, color: "bg-slate-300", textColor: "text-slate-400" },
];

export const monthlyAnalyticData = [42, 55, 38, 72, 60, 68, 50, 85, 62, 48, 78, 91];
export const analyticsMonths = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
export const analyticsTabs = ["This month", "Quarter", "Year"];
export const donutSegments = [
  { pct: 40, color: "#3B82F6" },
  { pct: 26, color: "#22C55E" },
  { pct: 19, color: "#A855F7" },
  { pct: 15, color: "#F59E0B" },
];