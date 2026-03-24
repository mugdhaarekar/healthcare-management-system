import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useTopbar } from "../../hooks/useTopbar";
import NotificationPanel from "./NotificationPanel";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { actions } = useTopbar();

  return (
    <div className="relative flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shrink-0 gap-4 flex-wrap">
      <div>
        <h1 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 ml-auto flex-wrap">
        {actions && (
          <div className="flex items-center gap-2">{actions}</div>
        )}

        <NotificationPanel />

        <button
          onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          title="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}