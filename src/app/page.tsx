/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { settings } from "@gravity-ui/date-utils";
import { configure, ToasterComponent } from "@gravity-ui/uikit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddIncidentButton from "./components/AddIncidentButton";
import Calendar from "./components/calendar/Calendar";
import AppFooter from "./components/Footer";
import Header from "./components/header/Header";
import { CALEDAR_STOK_VALUE } from "./consts/calendar";
import { useAutoLogin } from "./hooks/useAutoLogin";
import { useSocketHandlers } from "./hooks/useSocketHandlers";
import { fetchIncidents } from "./store/slices/calendarSlice";

settings.getLocale();
settings.loadLocale("ru").then(() => {
  settings.setLocale("ru");
  settings.getLocale();
});

configure({
  lang: "ru",
  fallbackLang: "ru",
});

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();

  useAutoLogin();

  useSocketHandlers();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchIncidents(CALEDAR_STOK_VALUE));
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col h-full overflow-hidden">
      {/* Шапка */}
      <Header />
      {/* Основной контент */}
      <div className="p-3 flex-1 h-full">
        <Calendar />
      </div>
      {/* Футер */}
      <AppFooter />
      {/* Кнопка добавления записи */}
      <AddIncidentButton />
      {/* Оповещения */}
      <ToasterComponent
        mobile={isMobile}
        className="optional additional classes"
      />
    </div>
  );
}
