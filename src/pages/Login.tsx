import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Shield, Lock, Mail } from "lucide-react";
import { loginWithEmailThunk, loginWithGoogleThunk } from "../store/authSlice";
import { useAppSelector } from "../hooks/useAuth";
import type { AppDispatch } from "../store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginWithEmailThunk({ email, password }));
    if (loginWithEmailThunk.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  const handleGoogleLogin = async () => {
    const result = await dispatch(loginWithGoogleThunk());
    if (loginWithGoogleThunk.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <div className="hidden lg:flex w-[420px] bg-slate-900 flex-col justify-between p-10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center shrink-0">
            <svg viewBox="0 0 18 18" fill="none" className="w-5 h-5">
              <path d="M9 2L15 6V12L9 16L3 12V6L9 2Z" fill="white" opacity=".9" />
              <circle cx="9" cy="9" r="2.5" fill="#3B82F6" />
            </svg>
          </div>
          <span className="text-lg font-extrabold text-white tracking-tight">
            Medi<span className="text-blue-400">Nexus</span>
          </span>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Healthcare management
            <span className="text-blue-400"> reimagined.</span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            A unified platform for clinical teams — track patients, manage
            records, and act on real-time data with confidence.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { val: "12K+", lbl: "Active patients" },
            { val: "99.9%", lbl: "Uptime SLA" },
            { val: "HIPAA", lbl: "Compliant" },
            { val: "HL7/FHIR", lbl: "Integrated" },
          ].map((item) => (
            <div
              key={item.lbl}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <div className="text-blue-400 font-mono font-semibold text-lg mb-1">
                {item.val}
              </div>
              <div className="text-slate-500 text-xs uppercase tracking-wider">
                {item.lbl}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
              Sign in to your account
            </h2>
            <p className="text-sm text-slate-500">
              New here?{" "}
              <span className="text-blue-500 font-semibold cursor-pointer hover:underline">
                Request access
              </span>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Work email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="dr.sharma@hospital.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-11 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password" className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10 h-11 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-blue-500 rounded"
                />
                <span className="text-sm text-slate-500">Keep me signed in</span>
              </label>
              <span className="text-sm text-blue-500 font-semibold cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">or continue with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-11 border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          <div className="flex gap-2 mt-6 flex-wrap">
            {["SOC 2 Type II", "256-bit encryption", "2FA enabled"].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-md"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-xs font-semibold text-slate-500">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}