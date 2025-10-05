"use client";

import { useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { Polygon } from "../polygon";

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
}

const PakistanArea = ({ geoData }: PakistanAreaProps) => {
  const map = useMap();
  const [pakistanCoords, setPakistanCoords] = useState<
    google.maps.LatLngLiteral[][]
  >([]);

  useEffect(() => {
    if (!geoData || !map) return;

    // Convert MultiPolygon GeoJSON to array of paths
    const coords: google.maps.LatLngLiteral[][] = geoData.features.flatMap(
      (feature: any) =>
        feature.geometry.coordinates.map((polygon: number[][][]) =>
          polygon[0].map(([lng, lat]) => ({ lat, lng }))
        )
    );

    setPakistanCoords(coords);

    // Fit bounds automatically to all coordinates
    const bounds = new google.maps.LatLngBounds();
    coords.forEach((polygon) =>
      polygon.forEach((point) => bounds.extend(point))
    );
    // Fit with minimal padding
    map.fitBounds(bounds, { top: 20, bottom: 20, left: 20, right: 20 });
    map.setZoom(5.5);
  }, [geoData, map]);

  return (
    <>
      {pakistanCoords.map((path, i) => (
        <Polygon
          key={i}
          paths={path}
          strokeColor="#000"
          strokeOpacity={0.8}
          strokeWeight={5}
          fillColor="#01411C"
          fillOpacity={0.05}
        />
      ))}
    </>
  );
};

export default PakistanArea;
