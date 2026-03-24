import { createContext, useState } from "react";

interface TopbarContextType {
  actions: React.ReactNode;
  setActions: (actions: React.ReactNode) => void;
}

export const TopbarContext = createContext<TopbarContextType>({
  actions: null,
  setActions: () => {},
});

export function TopbarProvider({ children }: { children: React.ReactNode }) {
  const [actions, setActions] = useState<React.ReactNode>(null);
  return (
    <TopbarContext.Provider value={{ actions, setActions }}>
      {children}
    </TopbarContext.Provider>
  );
}