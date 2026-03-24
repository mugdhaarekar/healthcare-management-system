import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StepProgress } from "@/components/ui/step-progress";
import PersonalInfoStep from "@/pages/patients/PersonalInfoStep";
import ClinicalInfoStep from "@/pages/patients/ClinicalInfoStep";
import VitalsStep from "@/pages/patients/VitalsStep";
import type { AppDispatch } from "../../store/store";
import type { Patient } from "../../types";
import { addPatient } from "../../store/patientSlice";

interface AddModalProps {
  open: boolean;
  onClose: () => void;
}

const initialForm = {
  name: "",
  age: "",
  gender: "Male",
  dob: "",
  bloodGroup: "A+",
  phone: "",
  email: "",
  address: "",
  emergencyContact: "",
  insurance: "",
  allergies: "",
  ward: "Ward 1",
  bed: "",
  department: "Cardiology",
  status: "Stable",
  diagnosis: "",
  spo2: "",
  bloodPressure: "",
  heartRate: "",
  temperature: "",
  respiratoryRate: "",
  glucose: "",
};

const TOTAL_STEPS = 3;

export default function AddModal({ open, onClose }: AddModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setForm(initialForm);
    setStep(1);
    onClose();
  };

  const handleSubmit = () => {
    const newPatient: Patient = {
      id: `MPI-${Math.floor(10000 + Math.random() * 90000)}`,
      name: form.name,
      age: Number(form.age),
      gender: form.gender as Patient["gender"],
      dob: form.dob,
      bloodGroup: form.bloodGroup,
      phone: form.phone,
      email: form.email,
      address: form.address,
      emergencyContact: form.emergencyContact,
      insurance: form.insurance,
      allergies: form.allergies
        ? form.allergies.split(",").map((a) => a.trim())
        : [],
      ward: form.ward,
      bed: form.bed,
      admissionDate: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      diagnosis: form.diagnosis,
      department: form.department,
      status: form.status as Patient["status"],
      vitals: {
        spo2: Number(form.spo2) || 98,
        bloodPressure: form.bloodPressure || "120/80",
        heartRate: Number(form.heartRate) || 72,
        temperature: Number(form.temperature) || 98.6,
        respiratoryRate: Number(form.respiratoryRate) || 16,
        glucose: Number(form.glucose) || 100,
      },
      medications: [],
      timeline: [
        {
          id: "t1",
          timestamp: new Date().toLocaleString("en-IN"),
          description: `Patient admitted. Diagnosis: ${form.diagnosis}`,
          type: "info",
        },
      ],
      attendingDoctor: "Dr. S. Raina",
    };

    dispatch(addPatient(newPatient));
    handleClose();
  };

  const isStepValid = () => {
    if (step === 1) {
      const digits = form.phone.replace(/\D/g, "");
      const tenDigit = digits.length === 12 ? digits.slice(2) : digits;
      const validPhone = (digits.length === 10 || digits.length === 12) && /^[6-9]/.test(tenDigit);
      return !!(form.name && form.dob && validPhone);
    }
    if (step === 2) return !!(form.diagnosis && form.ward && form.bed);
    return true;
  };

  const steps = [
    <PersonalInfoStep
      key="personal"
      form={form}
      onChange={handleChange}
      onDateChange={handleDateChange}
    />,
    <ClinicalInfoStep
      key="clinical"
      form={form}
      onChange={handleChange}
    />,
    <VitalsStep
      key="vitals"
      form={form}
      onChange={handleChange}
    />,
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-base font-extrabold text-slate-900 dark:text-slate-100">
            Add New Patient
          </DialogTitle>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Step {step} of {TOTAL_STEPS}
          </p>
        </DialogHeader>

        <StepProgress currentStep={step} totalSteps={TOTAL_STEPS} />

        <div className="flex flex-col gap-4 max-h-[55vh] overflow-y-auto pr-1">
          {steps[step - 1]}
        </div>

        <DialogFooter className="flex items-center justify-between mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              step === 1 ? handleClose() : setStep((s) => s - 1)
            }
            className="h-9 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <Button
            size="sm"
            onClick={() =>
              step === TOTAL_STEPS ? handleSubmit() : setStep((s) => s + 1)
            }
            disabled={!isStepValid()}
            className="h-9 bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 text-white font-bold"
          >
            {step === TOTAL_STEPS ? "Add patient" : "Next →"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}