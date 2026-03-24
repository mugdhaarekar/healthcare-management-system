import { useState } from "react";
import { format, parse, isValid, differenceInYears } from "date-fns";
import { AlertCircle, CalendarIcon } from "lucide-react";
import { TextField, SelectField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genders = ["Male", "Female", "Other"];

interface Props {
  form: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onDateChange: (name: string, value: string) => void;
}


export default function PersonalInfoStep({ form, onChange, onDateChange }: Props) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(form.dob || "");
  const [dobError, setDobError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const parseDate = (val: string): Date | undefined => {
    if (!val) return undefined;
    const parsed = parse(val, "dd/MM/yyyy", new Date());
    if (isValid(parsed)) return parsed;
    const parsed2 = parse(val, "dd MMM yyyy", new Date());
    if (isValid(parsed2)) return parsed2;
    return undefined;
  };

  const calculateAge = (date: Date): string => {
    return String(differenceInYears(new Date(), date));
  };

  const selectedDate = parseDate(form.dob);
  const validateDate = (formatted: string): boolean => {
    const [day, month, year] = formatted.split("/").map(Number);
  
    if (month < 1 || month > 12) {
      setDobError("Invalid month. Must be between 01 and 12.");
      return false;
    }
  
    if (day < 1 || day > 31) {
      setDobError("Invalid day. Must be between 01 and 31.");
      return false;
    }
  
    const parsed = new Date(year, month - 1, day);
  
    if (
      parsed.getFullYear() !== year ||
      parsed.getMonth() !== month - 1 ||
      parsed.getDate() !== day
    ) {
      setDobError("Invalid date. Please enter a valid date.");
      return false;
    }
  
    if (parsed > new Date()) {
      setDobError("Date of birth cannot be in the future.");
      return false;
    }
  
    if (differenceInYears(new Date(), parsed) > 120) {
      setDobError("Age cannot exceed 120 years.");
      return false;
    }
  
    setDobError("");
    return true;
  };

  const validatePhone = (value: string): boolean => {
    const digits = value.replace(/\D/g, "");
    
    if (digits.length === 0) {
      setPhoneError("");
      return false;
    }
  
    if (digits.length !== 10 && digits.length !== 12) {
      setPhoneError("Enter a valid 10-digit Indian mobile number.");
      return false;
    }
  
    const tenDigit = digits.length === 12 ? digits.slice(2) : digits;
  
    if (!/^[6-9]/.test(tenDigit)) {
      setPhoneError("Number must start with 6, 7, 8, or 9.");
      return false;
    }
  
    setPhoneError("");
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
  
    let formatted = digits;
    if (digits.length > 4) {
      formatted = digits.slice(0, 2) + "/" + digits.slice(2, 4) + "/" + digits.slice(4);
    } else if (digits.length > 2) {
      formatted = digits.slice(0, 2) + "/" + digits.slice(2);
    }
  
    setInputValue(formatted);
  
    if (digits.length < 8) {
      setDobError("");
      return;
    }
  
    if (validateDate(formatted)) {
      const parsed = parse(formatted, "dd/MM/yyyy", new Date());
      onDateChange("dob", format(parsed, "dd MMM yyyy"));
      onDateChange("age", calculateAge(parsed));
    }
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (!date) return;
    const formatted = format(date, "dd MMM yyyy");
    setInputValue(format(date, "dd/MM/yyyy"));
    onDateChange("dob", formatted);
    setOpen(false);
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(e);
    if (e.target.name === "phone") {
      validatePhone(e.target.value);
    }
  };

  return (
    <>
      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
        Personal information
      </p>
      <div className="grid grid-cols-2 gap-3">
        <TextField name="name" label="Full name *" placeholder="e.g. Rahul Mehta" colSpan value={form.name} onChange={onChange} />
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Age
          </Label>
          <div className="h-9 text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-mono flex items-center cursor-not-allowed select-none">
            {form.age
              ? `${form.age} years`
              : <span className="text-slate-300 dark:text-slate-600">Enter DOB</span>
            }
          </div>
        </div>
        <SelectField name="gender" label="Gender" value={form.gender} options={genders} onChange={onChange} />

        <div className="col-span-2 flex flex-col gap-1.5">
          <Label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Date of birth *
          </Label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="dd/mm/yyyy"
              className={`w-full h-9 text-sm border rounded-lg px-3 pr-8 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none font-mono transition-colors ${
                dobError
                  ? "border-red-400 dark:border-red-500 focus:border-red-400"
                  : "border-slate-200 dark:border-slate-700 focus:border-blue-500"
              }`}
          />
                  {dobError && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="bg-red-500 text-white text-xs border-none"
                    >
                      {dobError}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-3 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700"
                >
                  <CalendarIcon className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleCalendarSelect}
                  defaultMonth={selectedDate ?? new Date(2000, 0)}
                  captionLayout="dropdown"
                  fromYear={1920}
                  toYear={new Date().getFullYear()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
          </div>
          {selectedDate && !dobError && (
            <p className="text-xs text-blue-500 font-mono">
              {format(selectedDate, "dd MMMM yyyy")}
            </p>
          )}
        </div>

        <SelectField name="bloodGroup" label="Blood group" value={form.bloodGroup} options={bloodGroups} onChange={onChange} />
        <div className="col-span-2 flex flex-col gap-1.5">
          <Label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Phone *
          </Label>
          <div className="relative">
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handlePhoneChange}
              placeholder="+91 98765 43210"
              className={`w-full h-9 text-sm border rounded-lg px-3 pr-8 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none font-mono transition-colors ${
                phoneError
                  ? "border-red-400 dark:border-red-500 focus:border-red-400"
                  : "border-slate-200 dark:border-slate-700 focus:border-blue-500"
              }`}
            />
            {phoneError && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-red-500 text-white text-xs border-none"
                  >
                    {phoneError}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        <TextField name="email" label="Email" placeholder="patient@email.com" type="email" colSpan value={form.email} onChange={onChange} />
        <TextField name="address" label="Address" placeholder="42, Shivaji Nagar, Pune" colSpan value={form.address} onChange={onChange} />
        <TextField name="emergencyContact" label="Emergency contact" placeholder="Name (Relation) - Phone" colSpan value={form.emergencyContact} onChange={onChange} />
        <TextField name="insurance" label="Insurance" placeholder="e.g. HDFC Health - Active" colSpan value={form.insurance} onChange={onChange} />
        <TextField name="allergies" label="Allergies" placeholder="Penicillin, NSAIDs (comma separated)" colSpan value={form.allergies} onChange={onChange} />
      </div>
    </>
  );
}