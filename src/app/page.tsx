"use client"

import { useState } from 'react';
import {historicalEventsSchema,HistoricalEvent} from '@/types/event';
import dynamic from 'next/dynamic';
import historicalEventsData from '@/data/historical-events.json';
import EventCard from './components/EventCard';
import Timeline from './components/Timeline';
import EraList from './components/EraList';

const DynamicJapanMap = dynamic(() => import("@/app/components/JapanMap"),{
  ssr: false,
  loading: (() => (
    <div className='w-[600px] h-auto bg-white flex items-center justyfy-center'>
      <p>日本史マップ</p>
    </div>
  ))
}
)

let parseEvents:HistoricalEvent[] = [];

try {
  parseEvents = historicalEventsSchema.parse(historicalEventsData)
} catch (error) {
  console.error(
    "スキーマの定義と一致しません",
    error
  )
}

const eras = [...new Set(parseEvents.map((event) => event.era))];

export default function Home() {
  const [activeEvents,setActiveEvents] = useState<HistoricalEvent | null>(null);
  const [selectedEra,setSelectedEra] = useState<string>("鎌倉時代");

  const handleSelectedEra = (era:string) => {
    setSelectedEra(era);
    setActiveEvents(null);
  }

  const handleYearClick = ( event:HistoricalEvent | null ) => {
    setActiveEvents(event);
  }

  const filteredEvents = parseEvents.filter((events) => events.era === selectedEra);

  return(
    <main className='flex min-h-screen flex-col items-center justyfy-center p-8 bg-gray-50'>
      <h1 className='text-4xl font-bold mb-8'>インタラクティブ日本史マップ</h1>

      <div className='w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8'>
        <div className='w-full h-auto border shadow-sm rounded-lg bg-white overflow-hidden lg:col-span-5'>
          <DynamicJapanMap
            highlightedLocationId={activeEvents?.locationId ?? null}
          />
        </div>
        <div className='w-full h-outo lg:col-span-5'>
          <EventCard event={activeEvents}/>
        </div>
        <div className='w-full h-auto lg:col-span-2'>
          <EraList
            eras={eras}
            selectedEra={selectedEra}
            onSelectEra={handleSelectedEra}
          />
        </div>
      </div>

      <div className='w-full max-w-7xl mt-8'>
        <Timeline 
          events={filteredEvents}
          onYearClick={handleYearClick}
        />

      </div>

    </main>
  )
}