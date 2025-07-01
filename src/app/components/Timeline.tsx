"use client";

import React from "react";
import { HistoricalEvent } from "@/types/event";

interface TimelineProps {
  events: HistoricalEvent[];
  onYearHover: (event: HistoricalEvent | null) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, onYearHover }) => {
  const sortedEvents = [...events].sort((a, b) => a.year - b.year);

  return (
    <div className="w-full bg-gray-200 p-4 rounded-lg">
      <div className="relative flex justify-between items-center h-8">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-400 transform -translate-y-1/2"></div>

        {sortedEvents.map((event) => (
          <div
            key={event.year}
            className="z-10"
            onMouseEnter={() => onYearHover(event)}
            onMouseLeave={() => onYearHover(null)}
          >
            <div className="relative group">
              <div className="w-4 h-4 bg-blue-500 rounded-full cursor-pointer"></div>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-gray-800 text-white text-sm rounded-md px-2 py-1 whitespace-nowrap">
                  {event.year}年
                </div>
                <div className="w-2 h-2 bg-gray-800 transform rotate-45 absolute bottom-[-4px] left-1/2 -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
