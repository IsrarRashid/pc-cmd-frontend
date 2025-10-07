"use client";

import { useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { Polygon } from "../polygon";
import { ProvinceFeature } from "./ProvincesArea";

export interface GeoJSONPakistan {
  type: "FeatureCollection";
  name: string;
  crs: CRS;
  features: Feature[];
}

export interface CRS {
  type: string;
  properties: {
    name: string;
  };
}

export interface Feature {
  type: "Feature";
  properties: {
    GID_0: string; // e.g., "PAK"
    COUNTRY: string; // e.g., "Pakistan"
  };
  geometry: Geometry;
}

export interface Geometry {
  type: "MultiPolygon";
  coordinates: number[][][][]; // [[[ [lng, lat], [lng, lat], ... ]]]
}

interface PakistanAreaProps {
  geoData: GeoJSONPakistan;
  selectedProvince: ProvinceFeature | null;
}

const PakistanArea = ({ geoData, selectedProvince }: PakistanAreaProps) => {
  const map = useMap();
  const [pakistanCoords, setPakistanCoords] = useState<
    google.maps.LatLngLiteral[][]
  >([]);

  useEffect(() => {
    if (!geoData || !map) return;

    // Convert MultiPolygon GeoJSON to array of paths
    const coords: google.maps.LatLngLiteral[][] = geoData.features.flatMap(
      (feature) =>
        feature.geometry.coordinates.map((polygon: number[][][]) =>
          polygon[0].map(([lng, lat]) => ({ lat, lng }))
        )
    );

    setPakistanCoords(coords);

    // Fit bounds automatically to all coordinates
    if (!selectedProvince) {
      const bounds = new google.maps.LatLngBounds();
      coords.forEach((polygon) =>
        polygon.forEach((point) => bounds.extend(point))
      );
      map.fitBounds(bounds, { top: 20, bottom: 20, left: 20, right: 20 });
      map.setZoom(5.5);
    }
  }, [geoData, map, selectedProvince]);

  return (
    <>
      {pakistanCoords.map((path, i) => (
        <Polygon
          key={i}
          paths={path}
          strokeColor="#000"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#01411C"
          fillOpacity={0}
          clickable={false}
        />
      ))}
    </>
  );
};

export default PakistanArea;
