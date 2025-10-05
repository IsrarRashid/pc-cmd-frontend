"use client";

import { useEffect, useMemo } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { Polygon } from "../polygon";

// --- Interfaces ---
interface GeoFeature {
  type: "Feature";
  properties: {
    GID_1: string;
    GID_0: string;
    COUNTRY: string;
    NAME_1: string;
    VARNAME_1: string;
    TYPE_1: string;
    ENGTYPE_1: string;
    HASC_1: string;
    ISO_1: string;
  };
  geometry: {
    type: "MultiPolygon";
    coordinates: number[][][][];
  };
}

export interface GeoJSONProvinces {
  type: "FeatureCollection";
  name: string;
  crs: {
    type: string;
    properties: { name: string };
  };
  features: GeoFeature[];
}

interface ProvincesAreaProps {
  geoData: GeoJSONProvinces;
}

const colors = [
  "#1E90FF",
  "#32CD32",
  "#FFD700",
  "#FF6347",
  "#9370DB",
  "#20B2AA",
  "#FF8C00",
];

export default function ProvincesArea({ geoData }: ProvincesAreaProps) {
  const map = useMap();

  // Convert MultiPolygon → LatLngLiteral[][][]
  const provinceCoords = useMemo(
    () =>
      geoData.features.map((feature) =>
        feature.geometry.coordinates.map((poly) =>
          poly[0].map(([lng, lat]) => ({ lat, lng }))
        )
      ),
    [geoData]
  );

  // Fit map to Pakistan’s bounds
  useEffect(() => {
    if (!map || !provinceCoords.length) return;

    const bounds = new google.maps.LatLngBounds();
    provinceCoords.forEach((multiPoly) =>
      multiPoly.forEach((poly) => poly.forEach((point) => bounds.extend(point)))
    );

    map.fitBounds(bounds, { top: 30, bottom: 30, left: 30, right: 30 });

    google.maps.event.addListenerOnce(map, "idle", () => {
      map.setZoom(map.getZoom()! + 1);
    });
  }, [provinceCoords, map]);

  return (
    <>
      {provinceCoords.map((multiPoly, i) => (
        <Polygon
          key={i}
          paths={multiPoly}
          strokeColor="#000"
          strokeOpacity={0.7}
          strokeWeight={2}
          fillColor={colors[i % colors.length]}
          fillOpacity={0.35}
        />
      ))}
    </>
  );
}
