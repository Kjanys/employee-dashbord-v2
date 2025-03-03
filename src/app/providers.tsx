"use client";
import { Toaster, ToasterProvider } from "@gravity-ui/uikit";
import { Provider } from "react-redux";
import ClientThemeProvider from "./components/ClientThemeProvider";
import { store } from "./store/store";

export const toaster = new Toaster();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ClientThemeProvider>
        <ToasterProvider toaster={toaster}>{children}</ToasterProvider>
      </ClientThemeProvider>
    </Provider>
  );
}
