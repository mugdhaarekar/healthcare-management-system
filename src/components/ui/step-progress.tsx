interface StepProgressProps {
    currentStep: number;
    totalSteps: number;
  }
  
  export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
    return (
      <div className="flex gap-1.5">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full transition-all ${
              i + 1 <= currentStep
                ? "bg-blue-500"
                : "bg-slate-100 dark:bg-slate-800"
            }`}
          />
        ))}
      </div>
    );
  }