"use client";
import { ThemeProvider } from "@gravity-ui/uikit";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useSelector((state: RootState) => state.theme);

  return <ThemeProvider theme={theme as string}>{children}</ThemeProvider>;
}
