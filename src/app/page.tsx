"use client";
import { settings } from "@gravity-ui/date-utils";
import { configure } from "@gravity-ui/uikit";
import AddIncidentButton from "./components/AddIncidentButton";
import Calendar from "./components/calendar/Calendar";
import AppFooter from "./components/Footer";
import Header from "./components/header/Header";

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
    </div>
  );
}
