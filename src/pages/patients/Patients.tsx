import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setViewMode } from "../../store/patientSlice";
import type { AppDispatch } from "../../store/store";
import type { Patient } from "../../types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LayoutGrid,
  List,
  Search,
  Filter,
  Plus,
  Heart,
  Thermometer,
  Activity,
} from "lucide-react";
import { useEffect } from "react";
import { useTopbar } from "@/hooks/useTopbar";
import AddModal from "@/components/shared/AddModal";

const statusStyles: Record<string, string> = {
  Critical: "bg-red-100 text-red-700 border-red-200",
  Stable: "bg-green-100 text-green-700 border-green-200",
  Observation: "bg-amber-100 text-amber-700 border-amber-200",
  Discharged: "bg-slate-100 text-slate-500 border-slate-200",
};

const avatarColors: Record<string, string> = {
  Critical: "bg-red-100 text-red-700",
  Stable: "bg-green-100 text-green-700",
  Observation: "bg-amber-100 text-amber-700",
  Discharged: "bg-slate-100 text-slate-500",
};

const filters = ["All", "Critical", "Stable", "Observation", "Discharged"];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase();
}

function GridCard({ patient, onClick }: { patient: Patient; onClick: () => void }) {
  return (
    <Card
      className="border-slate-200 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${avatarColors[patient.status]}`}>
            {getInitials(patient.name)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">{patient.name}</p>
            <p className="text-xs text-slate-400 font-mono">{patient.id} · {patient.gender} · {patient.age}yr</p>
          </div>
        </div>

        <Badge className={`text-[11px] font-bold mb-4 ${statusStyles[patient.status]}`}>
          {patient.status}
        </Badge>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 rounded-lg p-2.5">
            <div className="flex items-center gap-1 mb-1">
              <Activity className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SpO₂</span>
            </div>
            <p className={`text-base font-bold font-mono ${patient.vitals.spo2 < 90 ? "text-red-500" : "text-slate-900"}`}>
              {patient.vitals.spo2}%
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-2.5">
            <div className="flex items-center gap-1 mb-1">
              <Heart className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">BP</span>
            </div>
            <p className="text-base font-bold font-mono text-slate-900">
              {patient.vitals.bloodPressure}
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-2.5">
            <div className="flex items-center gap-1 mb-1">
              <Activity className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">HR</span>
            </div>
            <p className="text-base font-bold font-mono text-slate-900">
              {patient.vitals.heartRate}
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-2.5">
            <div className="flex items-center gap-1 mb-1">
              <Thermometer className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ward</span>
            </div>
            <p className="text-sm font-bold text-slate-900 truncate">{patient.ward}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ListRow({ patient, onClick }: { patient: Patient; onClick: () => void }) {
  return (
    <div
      className="grid items-center gap-4 px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-100 last:border-0"
      style={{ gridTemplateColumns: "2fr 1.5fr 1fr 1fr 0.8fr 0.8fr 0.8fr" }}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${avatarColors[patient.status]}`}>
          {getInitials(patient.name)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900 truncate">{patient.name}</p>
          <p className="text-xs text-slate-400 font-mono">{patient.id}</p>
        </div>
      </div>
      <div className="text-sm text-slate-600 font-medium truncate">{patient.diagnosis}</div>
      <div>
        <Badge className={`text-[10px] font-bold ${statusStyles[patient.status]}`}>
          {patient.status}
        </Badge>
      </div>
      <div className="text-sm font-mono text-slate-600">{patient.ward}</div>
      <div className={`text-sm font-bold font-mono ${patient.vitals.spo2 < 90 ? "text-red-500" : "text-slate-700"}`}>
        {patient.vitals.spo2}%
      </div>
      <div className="text-sm font-mono text-slate-600">{patient.vitals.bloodPressure}</div>
      <div className="text-sm font-mono text-slate-600">{patient.vitals.heartRate}</div>
    </div>
  );
}

export default function Patients() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { patients, viewMode } = useAppSelector((state) => state.patients);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const { setActions } = useTopbar();

  useEffect(() => {
    setActions(
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 w-48 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
          />
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 gap-1">
          <button
            onClick={() => dispatch(setViewMode("grid"))}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === "grid"
                ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-slate-100"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => dispatch(setViewMode("list"))}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === "list"
                ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-slate-100"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
        <Button
          size="sm"
          className="h-9 bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 text-white font-bold"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add patient
        </Button>
      </div>
    );
    return () => setActions(null);
  }, [search, viewMode, dispatch, setActions]);

  const filtered = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.department.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || p.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const counts = {
    All: patients.length,
    Critical: patients.filter((p) => p.status === "Critical").length,
    Stable: patients.filter((p) => p.status === "Stable").length,
    Observation: patients.filter((p) => p.status === "Observation").length,
    Discharged: patients.filter((p) => p.status === "Discharged").length,
  };

  return (
    <>
        <div className="flex flex-col h-full overflow-hidden">
      <div className="px-6 py-3 bg-white border-b border-slate-100 flex gap-2 shrink-0 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              activeFilter === f
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
            }`}
          >
            {f}
            <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeFilter === f ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-400"}`}>
              {counts[f as keyof typeof counts]}
            </span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-2">
            <Search className="w-8 h-8 text-slate-300" />
            <p className="text-sm font-semibold text-slate-400">No patients found</p>
            <p className="text-xs text-slate-300">Try adjusting your search or filter</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-3 gap-4">
            {filtered.map((patient) => (
              <GridCard
                key={patient.id}
                patient={patient}
                onClick={() => navigate(`/patients/${patient.id}`)}
              />
            ))}
          </div>
        ) : (
          <Card className="border-slate-200">
            <div
              className="grid px-4 py-2.5 border-b border-slate-100 bg-slate-50 rounded-t-lg"
              style={{ gridTemplateColumns: "2fr 1.5fr 1fr 1fr 0.8fr 0.8fr 0.8fr" }}
            >
              {["Patient", "Diagnosis", "Status", "Ward", "SpO₂", "BP", "HR"].map((h) => (
                <div key={h} className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {h}
                </div>
              ))}
            </div>
            {filtered.map((patient) => (
              <ListRow
                key={patient.id}
                patient={patient}
                onClick={() => navigate(`/patients/${patient.id}`)}
              />
            ))}
          </Card>
        )}
      </div>
    </div>
    <AddModal
      open={showAddModal}
      onClose={() => setShowAddModal(false)}
    />
    </>
  );
}