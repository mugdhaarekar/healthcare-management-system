import { TextField, SelectField } from "@/components/ui/form-field";

const departments = ["Cardiology", "Respiratory", "Neurology", "Oncology", "Emergency", "Orthopedics", "General"];
const wards = ["ICU-1", "ICU-2", "Ward 1", "Ward 2", "Ward 3", "OPD", "Emergency"];
const statuses = ["Critical", "Stable", "Observation", "Discharged"];

interface Props {
  form: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function ClinicalInfoStep({ form, onChange }: Props) {
  return (
    <>
      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
        Clinical information
      </p>
      <div className="grid grid-cols-2 gap-3">
        <TextField name="diagnosis" label="Diagnosis *" placeholder="e.g. NSTEMI with respiratory distress" colSpan value={form.diagnosis} onChange={onChange} />
        <SelectField name="department" label="Department" value={form.department} options={departments} onChange={onChange} />
        <SelectField name="status" label="Status" value={form.status} options={statuses} onChange={onChange} />
        <SelectField name="ward" label="Ward *" value={form.ward} options={wards} onChange={onChange} />
        <TextField name="bed" label="Bed *" placeholder="e.g. Bed 4" value={form.bed} onChange={onChange} />
      </div>
    </>
  );
}