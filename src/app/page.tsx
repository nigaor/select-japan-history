"use client";

import { useState } from "react";
import { HistoricalEvent, historicalEventsSchema } from "@/types/event";
import historicalEventsData from "@/data/historical-events.json";
import dynamic from "next/dynamic";
import EventCard from "./components/EventCard";
import Timeline from "./components/Timeline";
import EraList from "./components/EraList";

const DynamicJapanMap = dynamic(() => import("@/app/components/JapanMap"), {
  ssr: false,
  loading: () => (
    <div className="w-[600px] h-full bg-white flex items-center justify-center">
      <p>日本地図を読み込み中...</p>
    </div>
  ),
});

let parseEvents: HistoricalEvent[] = [];

try {
  parseEvents = historicalEventsSchema.parse(historicalEventsData);
} catch (error) {
  console.error("スキーマと一致しません：", error);
}

const eras = [...new Set(parseEvents.map((event) => event.era))]

export default function Home() {
  const [activeEvents,setActiveEvents] = useState<HistoricalEvent | null>(null);
  const [selectedEra,setSelectedEra] = useState<string>("鎌倉時代");

  const handleYearClick = (event:HistoricalEvent | null) =>  {
    setActiveEvents(event);
  }

  const handleSelectedEra = (era:string) => {
    setSelectedEra(era);
    setActiveEvents(null);
  }

  const filteredEvetnts = parseEvents.filter((event) => event.era === selectedEra);

  return(
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 ">
      <h1 className="text-4xl font-bold mb-8">インタラクティブ日本史</h1>
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="w-full h-auto border shadow-sm rounded-lg bg-white overflow-hidden lg:col-span-5">
          <DynamicJapanMap
            highlightedLocationId={activeEvents?.locationId ?? null}
          />
        </div>
        <div className="w-full h-full lg:col-span-5">
          <EventCard event={activeEvents} />
        </div>
        <div className="w-full h-full lg:col-span-2">
          <EraList 
            eras={eras}
            selectedEra={selectedEra}
            onSelectEra={handleSelectedEra}
          />
        </div>
      </div>
      <div className="w-full max-w-7xl mt-8">
        <Timeline
          events={filteredEvetnts}
          onYearClick={handleYearClick}
        />
      </div>
    </main>
  )
}
