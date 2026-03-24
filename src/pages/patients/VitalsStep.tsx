import { TextField } from "@/components/ui/form-field";

interface Props {
  form: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function VitalsStep({ form, onChange }: Props) {
  return (
    <>
      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
        Initial vitals
      </p>
      <div className="grid grid-cols-2 gap-3">
        <TextField name="spo2" label="SpO₂ (%)" placeholder="e.g. 98" type="number" value={form.spo2} onChange={onChange} />
        <TextField name="bloodPressure" label="Blood pressure" placeholder="e.g. 120/80" value={form.bloodPressure} onChange={onChange} />
        <TextField name="heartRate" label="Heart rate (bpm)" placeholder="e.g. 72" type="number" value={form.heartRate} onChange={onChange} />
        <TextField name="temperature" label="Temperature (°F)" placeholder="e.g. 98.6" type="number" value={form.temperature} onChange={onChange} />
        <TextField name="respiratoryRate" label="Respiratory rate" placeholder="e.g. 16" type="number" value={form.respiratoryRate} onChange={onChange} />
        <TextField name="glucose" label="Blood glucose" placeholder="e.g. 100" type="number" value={form.glucose} onChange={onChange} />
      </div>
    </>
  );
}