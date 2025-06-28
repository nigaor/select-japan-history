"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { historicalEventsSchema, HistoricalEvent } from "@/types/event";
import historicalEventsData from "@/data/historical-events.json";
import EventCard from "./components/EventCard";
import Timeline from "./components/Timeline";

const DynamicJapanMap = dynamic(() => import("@/app/components/JapanMap"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "500px", width: "100%" }}>
      <p>地図を読み込み中...</p>
    </div>
  ),
});

let parsedEvents: HistoricalEvent[] = [];

try {
  parsedEvents = historicalEventsSchema.parse(historicalEventsData);
} catch (error) {
  console.error(
    "historical-events.jsonのデータ形式がスキーマと一致しません:",
    error
  );
}

export default function Home() {
  const [activeEvent, setActiveEvent] = useState<HistoricalEvent | null>(null);

  const handleYearHover = (event: HistoricalEvent | null) => {
    setActiveEvent(event);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">インタラクティブ日本史マップ</h1>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="w-full h-auto border rounded-lg shadow-sm bg-white overflow-hidden">
          <DynamicJapanMap
            highlightedLocationId={activeEvent?.locationId ?? null}
          />
        </div>

        <div className="w-full h-full">
          <EventCard event={activeEvent} />
        </div>
      </div>

      <div className="w-full max-w-7xl mt-8">
        <Timeline events={parsedEvents} onYearHover={handleYearHover} />
      </div>
    </main>
  );
}
