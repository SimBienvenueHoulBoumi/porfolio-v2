"use client";

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

type TutorialLoadingContextValue = {
  isReady: boolean;
  markReady: () => void;
};

const TutorialLoadingContext = createContext<TutorialLoadingContextValue | null>(null);

export function TutorialLoadingProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  const markReady = useCallback(() => {
    setIsReady(true);
  }, []);

  const value = useMemo(
    () => ({
      isReady,
      markReady
    }),
    [isReady, markReady]
  );

  return <TutorialLoadingContext.Provider value={value}>{children}</TutorialLoadingContext.Provider>;
}

export function useTutorialLoading() {
  const context = useContext(TutorialLoadingContext);
  if (!context) {
    throw new Error("useTutorialLoading must be used within a TutorialLoadingProvider");
  }
  return context;
}
