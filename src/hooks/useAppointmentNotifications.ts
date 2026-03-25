import { useEffect, useRef } from "react";
import { appointments } from "../data/mockData";
import { sendAppointmentReminder } from "../lib/notifications";

export function useAppointmentNotifications() {
  const notifiedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const checkAppointments = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      appointments.forEach((appt) => {
        if (!appt.time || !appt.patientName) return;

        const [hour, minute] = appt.time.split(":").map(Number);
        const diffMinutes =
          hour * 60 + minute - (currentHour * 60 + currentMinute);

        const key = `appt-${appt.id}-reminded`;
        if (
          diffMinutes > 0 &&
          diffMinutes <= 15 &&
          !notifiedRef.current.has(key)
        ) {
          notifiedRef.current.add(key);
          sendAppointmentReminder(appt.patientName, appt.time);
        }
      });
    };

    checkAppointments();
    const interval = setInterval(checkAppointments, 60000);
    return () => clearInterval(interval);
  }, []);
}