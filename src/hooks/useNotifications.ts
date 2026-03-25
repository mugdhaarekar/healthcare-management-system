import { useEffect, useRef } from "react";
import { useAppSelector } from "./useAuth";
import {
  registerServiceWorker,
  requestNotificationPermission,
  sendCriticalAlert,
  sendMedicationReminder,
  sendLabResultNotification,
} from "../lib/notifications";

export function useNotifications() {
  const { patients } = useAppSelector((state) => state.patients);
  const notifiedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    registerServiceWorker().then(() => {
      requestNotificationPermission();
    });
  }, []);

  useEffect(() => {
    if (!patients.length) return;

    patients.forEach((patient) => {
      const criticalKey = `critical-spo2-${patient.id}`;
      if (
        patient.vitals.spo2 < 90 &&
        !notifiedRef.current.has(criticalKey)
      ) {
        notifiedRef.current.add(criticalKey);
        sendCriticalAlert(
          patient.name,
          `SpO₂ dropped to ${patient.vitals.spo2}%. Immediate attention required.`
        );
      }

      const bpKey = `critical-bp-${patient.id}`;
      const [systolic] = patient.vitals.bloodPressure.split("/").map(Number);
      if (systolic > 150 && !notifiedRef.current.has(bpKey)) {
        notifiedRef.current.add(bpKey);
        sendCriticalAlert(
          patient.name,
          `Blood pressure elevated at ${patient.vitals.bloodPressure} mmHg.`
        );
      }

      const medKey = `medication-${patient.id}`;
      const hasMissedMed = patient.timeline.some(
        (t) =>
          t.type === "warning" &&
          t.description.toLowerCase().includes("medication") &&
          !notifiedRef.current.has(medKey)
      );
      if (hasMissedMed) {
        notifiedRef.current.add(medKey);
        sendMedicationReminder(patient.name);
      }

      const labKey = `lab-${patient.id}`;
      const hasLabResults = patient.timeline.some(
        (t) =>
          t.type === "info" &&
          t.description.toLowerCase().includes("lab") &&
          !notifiedRef.current.has(labKey)
      );
      if (hasLabResults) {
        notifiedRef.current.add(labKey);
        sendLabResultNotification(patient.name);
      }
    });
  }, [patients]);
}