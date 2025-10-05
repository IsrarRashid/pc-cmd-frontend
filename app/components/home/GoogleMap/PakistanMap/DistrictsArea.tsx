"use client";

import { useEffect, useMemo } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { Polygon } from "../polygon";

// --- Interfaces ---
interface DistrictFeature {
  type: "Feature";
  properties: {
    GID_3: string;
    GID_2: string;
    GID_1: string;
    GID_0: string;
    COUNTRY: string;
    NAME_1: string;
    NAME_2: string;
    NAME_3: string;
    VARNAME_3: string;
    NL_NAME_3: string;
    TYPE_3: string;
    ENGTYPE_3: string;
    CC_3: string;
    HASC_3: string;
  };
  geometry: {
    type: "MultiPolygon";
    coordinates: number[][][][];
  };
}

export interface GeoJSONDistricts {
  type: "FeatureCollection";
  name: string;
  crs: {
    type: string;
    properties: { name: string };
  };
  features: DistrictFeature[];
}

interface DistrictsAreaProps {
  geoData: GeoJSONDistricts;
}

// --- Component ---
export default function DistrictsArea({ geoData }: DistrictsAreaProps) {
  const map = useMap();

  const colors = useMemo(
    () => [
      "#e6194b",
      "#3cb44b",
      "#ffe119",
      "#4363d8",
      "#f58231",
      "#911eb4",
      "#46f0f0",
      "#f032e6",
      "#bcf60c",
      "#fabebe",
      "#008080",
      "#e6beff",
      "#9a6324",
      "#fffac8",
      "#800000",
      "#aaffc3",
      "#808000",
      "#ffd8b1",
      "#000075",
      "#808080",
    ],
    []
  );

  // Convert coordinates into Google Maps-friendly format
  const districtCoords = useMemo(
    () =>
      geoData.features.map((feature) =>
        feature.geometry.coordinates.map((poly) =>
          poly[0].map(([lng, lat]) => ({ lat, lng }))
        )
      ),
    [geoData]
  );

  // Fit map bounds to all districts
  useEffect(() => {
    if (!map || !districtCoords.length) return;

    const bounds = new google.maps.LatLngBounds();
    districtCoords.forEach((multiPoly) =>
      multiPoly.forEach((poly) => poly.forEach((point) => bounds.extend(point)))
    );

    map.fitBounds(bounds, { top: 30, bottom: 30, left: 30, right: 30 });

    google.maps.event.addListenerOnce(map, "idle", () => {
      map.setZoom(map.getZoom()! + 1);
    });
  }, [districtCoords, map]);

  return (
    <>
      {districtCoords.map((multiPoly, i) => (
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
