import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAuth";
import { setSelectedPatient } from "../../store/patientSlice";
import type { AppDispatch } from "../../store/store";
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Heart,
  Activity,
  Thermometer,
  Wind,
  Droplets,
  Pill,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  Printer,
  CalendarDays,
  FileEdit,
} from "lucide-react";
import type { TimelineEvent } from "../../types";
import { useTopbar } from "@/hooks/useTopbar";

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

const timelineIcons: Record<string, React.ReactNode> = {
  critical: <XCircle className="w-4 h-4 text-red-500" />,
  warning: <AlertTriangle className="w-4 h-4 text-amber-500" />,
  info: <Info className="w-4 h-4 text-blue-500" />,
  success: <CheckCircle className="w-4 h-4 text-green-500" />,
};

const timelineDotColors: Record<string, string> = {
  critical: "bg-red-500",
  warning: "bg-amber-500",
  info: "bg-blue-500",
  success: "bg-green-500",
};

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase();
}

function TimelineItem({ event, isLast }: { event: TimelineEvent; isLast: boolean }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${timelineDotColors[event.type]}`} />
        {!isLast && <div className="w-px flex-1 bg-slate-100 mt-1" />}
      </div>
      <div className="pb-4 flex-1">
        <div className="flex items-center gap-2 mb-1">
          {timelineIcons[event.type]}
          <span className="text-xs font-mono text-slate-400">{event.timestamp}</span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{event.description}</p>
      </div>
    </div>
  );
}

export default function PatientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { patients, selectedPatient } = useAppSelector((state) => state.patients);
  const { setActions } = useTopbar();
  const printRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (!selectedPatient) return;
    setActions(
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
          className="h-8 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs"
        >
          <Printer className="w-3.5 h-3.5 mr-1" />
          Print
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs"
        >
          <CalendarDays className="w-3.5 h-3.5 mr-1" />
          Schedule
        </Button>
        <Button
          size="sm"
          className="h-8 bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
        >
          <FileEdit className="w-3.5 h-3.5 mr-1" />
          Update Record
        </Button>
      </div>
    );
    return () => setActions(null);
  }, [selectedPatient, setActions]);

  useEffect(() => {
    const patient = patients.find((p) => p.id === id);
    if (patient) {
      dispatch(setSelectedPatient(patient));
    }
  }, [id, patients, dispatch]);

  if (!selectedPatient) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <User className="w-10 h-10 text-slate-300" />
        <p className="text-sm font-semibold text-slate-400">Patient not found</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/patients")}
        >
          Back to patients
        </Button>
      </div>
    );
  }

  const p = selectedPatient;

  return (
    <div className="flex flex-col h-full overflow-hidden" ref={printRef}>
      <div className="flex items-center gap-3 px-6 py-4 bg-white border-b border-slate-200 shrink-0 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/patients")}
          className="h-8 border-slate-200 text-slate-600 text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back
        </Button>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span
            className="cursor-pointer hover:text-blue-500 transition-colors"
            onClick={() => navigate("/patients")}
          >
            Patients
          </span>
          <span>›</span>
          <span className="text-slate-900 font-semibold">{p.name}</span>
        </div>
      </div>

      <div className="print-main print-compact flex-1 overflow-y-auto p-6 flex flex-col gap-4">
        <Card className="border-slate-200 overflow-visible">
          <CardContent className="p-5">
            <div className="flex items-center gap-4 flex-wrap">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-extrabold shrink-0 border-2 ${avatarColors[p.status]} border-current`}>
                {getInitials(p.name)}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{p.name}</h2>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  {p.id} · {p.gender} · {p.age} years · DOB: {p.dob} · Blood: {p.bloodGroup}
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <Badge className={`text-[11px] font-bold ${statusStyles[p.status]}`}>
                    {p.status}
                  </Badge>
                  <Badge className="text-[11px] font-bold bg-blue-50 text-blue-700 border-blue-200">
                    {p.department}
                  </Badge>
                  <Badge className="text-[11px] font-bold bg-green-50 text-green-700 border-green-200">
                    HIPAA Verified
                  </Badge>
                  <Badge className="text-[11px] font-bold bg-slate-100 text-slate-500 border-slate-200">
                    {p.ward} · {p.bed}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-6 shrink-0">
                {[
                  { label: "SpO₂", value: `${p.vitals.spo2}%`, alert: p.vitals.spo2 < 90 },
                  { label: "BP mmHg", value: p.vitals.bloodPressure, alert: false },
                  { label: "HR bpm", value: String(p.vitals.heartRate), alert: false },
                  { label: "Temp °F", value: String(p.vitals.temperature), alert: false },
                ].map((v) => (
                  <div key={v.label} className="text-center">
                    <div className={`text-xl font-extrabold font-mono tracking-tight ${v.alert ? "text-red-500" : "text-slate-900"}`}>
                      {v.value}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                      {v.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 flex flex-col gap-4">
            <Card className="border-slate-200">
              <CardHeader className="pt-5 px-5 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold text-slate-900">Live vitals</CardTitle>
                  <span className="text-xs text-blue-500 font-semibold cursor-pointer">View history</span>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "Heart rate", value: p.vitals.heartRate, unit: "bpm", icon: Heart, color: "text-blue-500", alert: false },
                    { label: "Respiratory", value: p.vitals.respiratoryRate, unit: "br/min", icon: Wind, color: "text-amber-500", alert: p.vitals.respiratoryRate > 20 },
                    { label: "Blood glucose", value: p.vitals.glucose, unit: "mg/dL", icon: Droplets, color: "text-purple-500", alert: p.vitals.glucose > 180 },
                    { label: "Temperature", value: p.vitals.temperature, unit: "°F", icon: Thermometer, color: "text-red-500", alert: p.vitals.temperature > 100 },
                    { label: "SpO₂", value: p.vitals.spo2, unit: "%", icon: Activity, color: "text-green-500", alert: p.vitals.spo2 < 90 },
                    { label: "Blood pressure", value: p.vitals.bloodPressure, unit: "mmHg", icon: Activity, color: "text-slate-500", alert: false },
                  ].map((vital) => {
                    const Icon = vital.icon;
                    return (
                      <div key={vital.label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                        <div className="flex items-center gap-1.5 mb-2 vitals-row">
                          <Icon className={`w-3.5 h-3.5 ${vital.color}`} />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {vital.label}
                          </span>
                        </div>
                        <div className={`text-lg font-extrabold font-mono ${vital.alert ? "text-red-500" : "text-slate-900"}`}>
                          {vital.value}
                          <span className="text-xs text-slate-400 font-normal ml-1">{vital.unit}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 vitals-row">
              <CardHeader className="pt-5 px-5 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-blue-500" />
                    <CardTitle className="text-sm font-bold text-slate-900">Current medications</CardTitle>
                  </div>
                  <span className="text-xs text-blue-500 font-semibold cursor-pointer">Edit</span>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="flex flex-col gap-2">
                  {p.medications.map((med) => (
                    <div
                      key={med.id}
                      className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl"
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-900">{med.name}</p>
                        <p className="text-xs font-mono text-slate-400 mt-0.5">
                          {med.dosage} · {med.route}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-[11px] font-bold">
                        {med.frequency}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pt-5 px-5 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <CardTitle className="text-sm font-bold text-slate-900">Clinical timeline</CardTitle>
                  </div>
                  <span className="text-xs text-blue-500 font-semibold cursor-pointer">View all</span>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-3">
                {p.timeline.map((event, i) => (
                  <TimelineItem
                    key={event.id}
                    event={event}
                    isLast={i === p.timeline.length - 1}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <Card className="border-slate-200">
              <CardHeader className="pt-5 px-5 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold text-slate-900">Patient information</CardTitle>
                  <span className="text-xs text-blue-500 font-semibold cursor-pointer">Edit</span>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-4">
                <div className="flex flex-col gap-0">
                  {[
                    { label: "Full name", value: p.name, icon: User },
                    { label: "Date of birth", value: p.dob, icon: CalendarDays },
                    { label: "Blood group", value: p.bloodGroup, icon: Droplets },
                    { label: "Phone", value: p.phone, icon: Phone },
                    { label: "Email", value: p.email, icon: Mail },
                    { label: "Address", value: p.address, icon: MapPin },
                    { label: "Emergency", value: p.emergencyContact, icon: AlertTriangle },
                    { label: "Insurance", value: p.insurance, icon: Shield },
                  ].map((item, i, arr) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className={`flex items-start gap-2 py-2.5 ${i !== arr.length - 1 ? "border-b border-slate-50" : ""}`}
                      >
                        <Icon className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                            {item.label}
                          </p>
                          <p className="text-xs font-semibold text-slate-700 leading-snug">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {p.allergies.length > 0 && (
                    <div className="flex items-start gap-2 pt-2.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Allergies
                        </p>
                        <div className="flex gap-1 flex-wrap">
                          {p.allergies.map((a) => (
                            <Badge
                              key={a}
                              className="bg-red-50 text-red-600 border-red-200 text-[10px] font-bold"
                            >
                              {a}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pt-5 px-5 pb-2">
                <CardTitle className="text-sm font-bold text-slate-900">Attending team</CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="flex flex-col gap-3">
                  {[
                    { initials: "SR", name: "Dr. S. Raina", role: "Senior Physician · Lead", color: "bg-blue-100 text-blue-700" },
                    { initials: "PK", name: "Dr. P. Kumar", role: "Cardiologist", color: "bg-green-100 text-green-700" },
                    { initials: "NG", name: "Nurse Gita", role: "ICU Nurse · Primary", color: "bg-amber-100 text-amber-700" },
                  ].map((member) => (
                    <div key={member.name} className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${member.color}`}>
                        {member.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{member.name}</p>
                        <p className="text-xs text-slate-400">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}