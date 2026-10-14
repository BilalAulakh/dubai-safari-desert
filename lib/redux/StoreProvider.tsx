"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";

interface StoreProviderProps {
  children: React.ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  // Lazy initializer creates the store once per client
  const [store] = useState<AppStore>(makeStore);

  return <Provider store={store}>{children}</Provider>;
}
