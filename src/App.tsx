import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthChange } from "./lib/firebase";
import { setUser, setLoading } from "./store/authSlice";
import { useAppSelector } from "./hooks/useAuth";
import type { AppDispatch } from "./store/store";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Patients from "./pages/patients/Patients";
import PatientDetail from "./pages/patients/PatientDetail";
import Sidebar from "./components/shared/Sidebar";
import Topbar from "./components/shared/Topbar";
import { useNotifications } from "./hooks/useNotifications";
import { useAppointmentNotifications } from "./hooks/useAppointmentNotifications";
import { Toaster } from "sonner";

const routeMeta: Record<string, { title: string; subtitle?: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Ward 3 Overview" },
  "/analytics": { title: "Analytics", subtitle: "Clinical performance · Mar 2026" },
  "/patients": { title: "Patients", subtitle: "Manage patient records" },
};

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const isPatientDetail = location.pathname.startsWith("/patients/") &&
    location.pathname !== "/patients";

  const meta = isPatientDetail
    ? { title: "Patient Detail", subtitle: "Full clinical record" }
    : routeMeta[location.pathname] ?? { title: "MediNexus" };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const name = user?.displayName?.split(" ")[0] ?? "Doctor";

  const finalTitle = location.pathname === "/dashboard"
    ? `${greeting()}, ${name}`
    : meta.title;

  const finalSubtitle = location.pathname === "/dashboard"
    ? new Date().toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : meta.subtitle;

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title={finalTitle} subtitle={finalSubtitle} />
        <Toaster position="top-right" richColors closeButton />
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthChange((firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName
          })
        );
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading(false)); 
    });
    return () => unsubscribe();
  }, [dispatch]);
  useNotifications();
  useAppointmentNotifications();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Loading MediNexus...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/dashboard"
        element={
          user ? (
            <ProtectedLayout><Dashboard /></ProtectedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/analytics"
        element={
          user ? (
            <ProtectedLayout><Analytics /></ProtectedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/patients"
        element={
          user ? (
            <ProtectedLayout><Patients /></ProtectedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/patients/:id"
        element={
          user ? (
            <ProtectedLayout><PatientDetail /></ProtectedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;