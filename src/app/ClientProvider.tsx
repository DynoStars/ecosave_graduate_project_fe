// components/ClientProvider.tsx
"use client"; // This directive marks the component as client-side only

import { Provider } from "react-redux";
import { store } from "@/redux/store"; // Import store

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ClientProvider;
