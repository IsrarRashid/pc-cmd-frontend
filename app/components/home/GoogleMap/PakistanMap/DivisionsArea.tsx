"use client";

import { useEffect, useMemo } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { Polygon } from "../polygon";

// --- Interfaces ---
interface DivisionFeature {
  type: "Feature";
  properties: {
    GID_2: string;
    GID_1: string;
    GID_0: string;
    COUNTRY: string;
    NAME_1: string;
    NAME_2: string;
    VARNAME_2: string;
    NL_NAME_2: string;
    TYPE_2: string;
    ENGTYPE_2: string;
    CC_2: string;
    HASC_2: string;
  };
  geometry: {
    type: "MultiPolygon";
    coordinates: number[][][][];
  };
}

export interface GeoJSONDivisions {
  type: "FeatureCollection";
  name: string;
  crs: {
    type: string;
    properties: { name: string };
  };
  features: DivisionFeature[];
}

interface DivisionsAreaProps {
  geoData: GeoJSONDivisions;
}

// --- Component ---
export default function DivisionsArea({ geoData }: DivisionsAreaProps) {
  const map = useMap();

  const colors = useMemo(
    () => [
      "#f94144",
      "#f3722c",
      "#f8961e",
      "#f9844a",
      "#f9c74f",
      "#90be6d",
      "#43aa8b",
      "#577590",
      "#277da1",
      "#7209b7",
      "#560bad",
      "#4361ee",
      "#4895ef",
      "#4cc9f0",
      "#b5179e",
      "#ff6f61",
      "#7b2cbf",
      "#e85d04",
      "#9d0208",
      "#ffba08",
    ],
    []
  );

  // Convert geometry to Google Maps paths
  const divisionCoords = useMemo(
    () =>
      geoData.features.map((feature) =>
        feature.geometry.coordinates.map((polygon) =>
          polygon[0].map(([lng, lat]) => ({ lat, lng }))
        )
      ),
    [geoData]
  );

  // Fit map bounds to all divisions
  useEffect(() => {
    if (!map || !divisionCoords.length) return;

    const bounds = new google.maps.LatLngBounds();
    divisionCoords.forEach((multiPoly) =>
      multiPoly.forEach((poly) => poly.forEach((point) => bounds.extend(point)))
    );

    map.fitBounds(bounds, { top: 30, bottom: 30, left: 30, right: 30 });

    google.maps.event.addListenerOnce(map, "idle", () => {
      map.setZoom(map.getZoom()! + 1);
    });
  }, [divisionCoords, map]);

  return (
    <>
      {divisionCoords.map((multiPoly, i) => (
        <Polygon
          key={i}
          paths={multiPoly}
          strokeColor="#000"
          strokeOpacity={0.5}
          strokeWeight={1}
          fillColor={colors[i % colors.length]}
          fillOpacity={0.25}
        />
      ))}
    </>
  );
}
