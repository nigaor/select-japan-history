"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { historicalEventsSchema, HistoricalEvent } from "@/types/event";
import historicalEventsData from "@/data/historical-events.json";
import EventCard from "./components/EventCard";
import Timeline from "./components/Timeline";
import EraList from "./components/EraList";

const DynamicJapanMap = dynamic(() => import("@/app/components/JapanMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full bg-white flex items-center justify-center">
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

const eras = [...new Set(parsedEvents.map((event) => event.era))];

export default function Home() {
  const [activeEvent, setActiveEvent] = useState<HistoricalEvent | null>(null);
  const [selectedEra,setSelectedEra] = useState<string>("鎌倉時代");

  const handleYearHover = (event: HistoricalEvent | null) => {
    setActiveEvent(event);
  };

  const handleSelectEra = (era:string) => {
    setSelectedEra(era);
    setActiveEvent(null);
  }
  
  const filteredEvents = parsedEvents.filter((event) => event.era === selectedEra);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">インタラクティブ日本史マップ</h1>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="w-full h-auto border rounded-lg shadow-sm bg-white overflow-hidden lg:col-span-5">
          <DynamicJapanMap
            highlightedLocationId={activeEvent?.locationId ?? null}
          />
        </div>

        <div className="w-full h-full lg:col-span-5">
          <EventCard event={activeEvent} />
        </div>
        <div className="w-full h-full lg:col-span-2">
          <EraList
            eras={eras}
            selectedEra={selectedEra}
            onSelectEra={handleSelectEra}
          />
        </div>
      </div>

      <div className="w-full max-w-7xl mt-8">
        <Timeline events={filteredEvents} onYearHover={handleYearHover} />
      </div>
    </main>
  );
}
