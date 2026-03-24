export type ActivityType = {
    id: string;
    category: "notification" | "appointment";
    type: "critical" | "warning" | "info" | "appointment";
    title: string;
    message: string;
    time: string;
    read?: boolean;
    // appointment-specific
    patientId?: string;
    patientName?: string;
    status?: "Critical" | "Pending" | "Confirmed" | "Urgent";
    initials?: string;
    color?: string;
    redirectUrl?: string;
  };
  export const activities: ActivityType[] = [
    {
      id: "1",
      category: "notification",
      type: "critical",
      title: "Critical Alert",
      message: "Rahul Mehta — SpO₂ dropped to 88%",
      time: "08:14 AM",
      read: false,
      redirectUrl: "/patients/MPI-00142",
    },
    {
      id: "2",
      category: "notification",
      type: "warning",
      title: "Missed Medication",
      message: "Ayesha Khan missed morning dose",
      time: "08:00 AM",
      read: false,
      redirectUrl: "/patients/MPI-00189",
    },  
    {
      id: "MPI-00142",
      category: "appointment",
      type: "appointment",
      title: "Appointment",
      message: "Follow-up · Cardiology",
      time: "09:00",
      patientId: "MPI-00142",
      patientName: "Rahul Mehta",
      status: "Critical",
      initials: "RM",
      color: "bg-blue-100 text-blue-700",
      redirectUrl: "/patients/MPI-00142",
    },
    {
      id: "MPI-00189",
      category: "appointment",
      type: "appointment",
      title: "Appointment",
      message: "Consultation · General",
      time: "10:30",
      patientId: "MPI-00189",
      patientName: "Ayesha Khan",
      status: "Pending",
      initials: "AK",
      color: "bg-green-100 text-green-700",
      redirectUrl: "/patients/MPI-00189",
    },
    {
        id: "3",
        type: "info",
        category: "notification",
        title: "Lab Results Ready",
        message: "Sunita Iyer — CBC available",
        time: "07:45 AM",
        read: true,
        redirectUrl: "/reports/sunita-iyer",
      },
  ];
  
//   export const mockNotifications: ActivityType[] = [
//     {
//       id: "1",
//       type: "critical",
//       title: "Critical Alert",
//       message: "Rahul Mehta — SpO₂ dropped to 88%",
//       time: "08:14 AM",
//       read: false,
//     },
//     {
//       id: "2",
//       type: "warning",
//       title: "Missed Medication",
//       message: "Ayesha Khan missed morning dose",
//       time: "08:00 AM",
//       read: false,
//       redirectUrl: "/patients/ayesha-khan",
//     },
//     {
//       id: "3",
//       type: "info",
//       title: "Lab Results Ready",
//       message: "Sunita Iyer — CBC available",
//       time: "07:45 AM",
//       read: true,
//       redirectUrl: "/reports/sunita-iyer",
//     },
//     {
//       id: "4",
//       type: "appointment",
//       title: "Appointment Reminder",
//       message: "Vijay Sharma at 12:00 PM",
//       time: "07:30 AM",
//       read: true,
//       redirectUrl: "/appointments",
//     },
//   ];