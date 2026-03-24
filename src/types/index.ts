export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  }
  
  export interface Vital {
    spo2: number;
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    respiratoryRate: number;
    glucose: number;
  }
  
  export interface Medication {
    id: string;
    name: string;
    dosage: string;
    route: string;
    frequency: string;
  }
  
  export interface TimelineEvent {
    id: string;
    timestamp: string;
    description: string;
    type: "critical" | "warning" | "info" | "success";
  }
  
  export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: "Male" | "Female" | "Other";
    dob: string;
    bloodGroup: string;
    phone: string;
    email: string;
    address: string;
    emergencyContact: string;
    insurance: string;
    allergies: string[];
    ward: string;
    bed: string;
    admissionDate: string;
    diagnosis: string;
    department: string;
    status: "Critical" | "Stable" | "Observation" | "Discharged";
    vitals: Vital;
    medications: Medication[];
    timeline: TimelineEvent[];
    attendingDoctor: string;
  }
  
  export interface Alert {
    id: string;
    patientId: string;
    patientName: string;
    message: string;
    type: "critical" | "warning" | "info";
    timestamp: string;
    ward: string;
    read: boolean;
  }
  
  export interface Appointment {
    id: string;
    patientId: string;
    patientName: string;
    type: string;
    department: string;
    time: string;
    status: "Confirmed" | "Pending" | "Urgent" | "Cancelled";
  }
  
  export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface PatientState {
    patients: Patient[];
    selectedPatient: Patient | null;
    loading: boolean;
    error: string | null;
    viewMode: "grid" | "list";
  }