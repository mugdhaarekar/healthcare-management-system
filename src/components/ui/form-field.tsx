import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  colSpan?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextField({
  name,
  label,
  placeholder,
  type = "text",
  colSpan = false,
  value,
  onChange,
}: TextFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${colSpan ? "col-span-2" : ""}`}>
      <Label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
        {label}
      </Label>
      <Input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-9 text-sm border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
      />
    </div>
  );
}

interface SelectFieldProps {
  name: string;
  label: string;
  value: string;
  options: string[];
  colSpan?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectField({
  name,
  label,
  value,
  options,
  colSpan = false,
  onChange,
}: SelectFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${colSpan ? "col-span-2" : ""}`}>
      <Label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
        {label}
      </Label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="h-9 text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:border-blue-500"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}