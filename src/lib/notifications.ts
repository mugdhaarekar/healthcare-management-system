export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;
  try {
    const registration = await navigator.serviceWorker.register("/sw.js");
    return registration;
  } catch (error) {
    console.error("Service Worker registration failed:", error);
    return null;
  }
}

export async function requestNotificationPermission(): Promise<boolean> {  
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const permission = await Notification.requestPermission();
  return permission === "granted";
}

export async function sendLocalNotification(
  title: string,
  body: string,
  tag?: string
) {
  const granted = await requestNotificationPermission();
  if (!granted) return;

  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) {
    await registration.showNotification(title, {
      body,
      icon: "/vite.svg",
      badge: "/vite.svg",
      tag: tag ?? title,
      renotify: true,
      vibrate: [200, 100, 200],
    });
  } else {
    new Notification(title, { body, icon: "/vite.svg" });
  }
}

export const sendCriticalAlert = (patientName: string, message: string) =>
  sendLocalNotification(
    `🚨 Critical — ${patientName}`,
    message,
    `critical-${patientName}`
  );

export const sendAppointmentReminder = (patientName: string, time: string) =>
  sendLocalNotification(
    `📅 Appointment Reminder`,
    `${patientName} at ${time}`,
    `appointment-${patientName}`
  );

export const sendMedicationReminder = (patientName: string) =>
  sendLocalNotification(
    `💊 Medication Reminder`,
    `${patientName} missed a dose`,
    `medication-${patientName}`
  );

export const sendLabResultNotification = (patientName: string) =>
  sendLocalNotification(
    `🔬 Lab Results Ready`,
    `Results available for ${patientName}`,
    `lab-${patientName}`
  );

export const sendAdmissionNotification = (patientName: string, ward: string) =>
  sendLocalNotification(
    `🏥 New Admission`,
    `${patientName} admitted to ${ward}`,
    `admission-${patientName}`
  );