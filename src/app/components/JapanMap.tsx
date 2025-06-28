"use client";

import React from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import JapanGeoJson from "@/data/japan.json";
import type { GeoJsonObject } from 'geojson';
import type { PathOptions, StyleFunction } from 'leaflet';


interface JapanMapProps {
  highlightedLocationId: number | null;
}

const JapanMap: React.FC<JapanMapProps> = ({ highlightedLocationId }) => {

  const style: StyleFunction = (feature) => {
    const isHighlighted = highlightedLocationId === feature?.properties.id;
    return {
      fillColor: isHighlighted ? "#F56565" : "#E2E8F0",
      weight: 0.5,
      opacity: 1,
      color: 'white',
      fillOpacity: 1
    };
  };

  return (
    <MapContainer
      center={[36, 135.5]}
      zoom={5}
      style={{ height: "500px", width: "100%", backgroundColor: 'white' }}
      zoomControl={false}
      attributionControl={false}
    >
      {/* 背景のタイルレイヤーは指定しないことで、白地図にする。
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> 
      */}
      <GeoJSON data={JapanGeoJson as GeoJsonObject} style={style} />
    </MapContainer>
  );
};

export default JapanMap;