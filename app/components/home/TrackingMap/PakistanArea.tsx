"use client";

import { useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { Polygon } from "../GoogleMap/polygon";

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
      (feature) =>
        feature.geometry.coordinates.map((polygon: number[][][]) =>
          polygon[0].map(([lng, lat]) => ({ lat, lng }))
        )
    );

    setPakistanCoords(coords);
  }, [geoData, map]);

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
