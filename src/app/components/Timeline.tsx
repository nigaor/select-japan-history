"use client";

import React,
{ useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HistoricalEvent } from "@/types/event";

interface TimelineProps {
  events: HistoricalEvent[];
  onYearClick: (event: HistoricalEvent | null) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, onYearClick }) => {
  const { minYear, maxYear } = useMemo(() => {
    if (events.length === 0) {
      return { minYear: 0, maxYear: 0 };
    }
    const years = events.map((e) => e.year);
    return {
      minYear: Math.min(...years),
      maxYear: Math.max(...years),
    };
  }, [events]);

  const totalSpan = maxYear - minYear;

  return (
    <div className="w-full bg-gray-200 p-4 rounded-lg ">
      <div className="relative h-8">
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-400 transform -translate-y-1/2"></div>

        <AnimatePresence>
          {events.map((event) => {
            // ★ 3. 各イベントの相対的な位置を計算
            const positionPercentage =
              totalSpan > 0 ? ((event.year - minYear) / totalSpan) * 100 : 50;

            return (
              <motion.div
                key={event.id}
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{
                  left: `calc(1rem + (100% - 2rem) * ${positionPercentage / 100} - 8px)`,
                }}
                onClick={() => onYearClick(event)}
                initial={{ opacity: 0, scale: 0.5 }} 
                animate={{ opacity: 1, scale: 1.5 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 2, zIndex: 10 }}
              >
                <div className="relative group">
                  <div className="w-4 h-4 bg-blue-500 rounded-full cursor-pointer border-2 border-white shadow"></div>
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-gray-800 text-white text-xs text-center font-bold rounded-md px-3 py-1 whitespace-nowrap shadow-lg">
                      {event.year}年<br/>{event.name}
                    </div>
                    <div className="w-2 h-2 bg-gray-800 transform rotate-45 absolute bottom-[-4px] left-1/2 -translate-x-1/2"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Timeline;