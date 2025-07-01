"use client";

import React from "react";
import Image from "next/image";
import { HistoricalEvent } from "@/types/event";

interface EventCardProps {
  event: HistoricalEvent | null;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  if (!event) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">
          年表にカーソルを合わせると、出来事が表示されます。
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">
        {event.name} ({event.year}年)
      </h2>
      <p className="text-gray-600 mb-4">場所: {event.locationName}</p>

      {event.image && (
        <div className="relative w-full h-60 mb-4">
          <Image
            src={event.image}
            alt={event.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      )}

      <p className="text-gray-800">{event.description}</p>
    </div>
  );
};

export default EventCard;
