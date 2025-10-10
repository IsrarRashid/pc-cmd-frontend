"use client";

import { useEffect, useMemo, useState } from "react";
import { InfoWindow, useMap } from "@vis.gl/react-google-maps";
import { ProvinceFeature } from "./ProvincesArea";
import DivisionCard from "../Cards/New/DivisionCard";
import { DivisionProduction } from "@/app/page";

// --- Interfaces ---
export interface DivisionFeature {
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

interface Props {
  geoData: GeoJSONDivisions;
  selectedProvince?: ProvinceFeature | null;
  selectedDivision?: DivisionFeature | null;
  onDivisionClick?: (division: DivisionFeature | null) => void; // allow null for "Back"
  data: DivisionProduction[] | undefined;
}

// --- Component ---
export default function DivisionsArea({
  geoData,
  selectedProvince,
  selectedDivision,
  onDivisionClick,
  data,
}: Props) {
  const [hoveredDivision, setHoveredDivision] = useState<{
    coords: google.maps.LatLngLiteral;
    feature: DivisionFeature;
  } | null>(null);
  const [mousePos, setMousePos] = useState<google.maps.LatLngLiteral | null>(
    null
  );

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

  // Always compute filteredDivisions, even if empty
  const filteredDivisions = useMemo(() => {
    if (!selectedProvince) return [];
    return geoData.features.filter(
      (div) => div.properties.NAME_1 === selectedProvince.properties.NAME_1
    );
  }, [geoData.features, selectedProvince]);

  // Convert to polygons and render
  const divisionCoords = useMemo(() => {
    return filteredDivisions.map((feature) =>
      feature.geometry.coordinates.map((poly) =>
        poly[0].map(([lng, lat]) => ({ lat, lng }))
      )
    );
  }, [filteredDivisions]);

  // Fit bounds to the province whenever filteredDivisions change
  useEffect(() => {
    if (!map || !filteredDivisions.length) return;

    const bounds = new google.maps.LatLngBounds();
    filteredDivisions.forEach((div) => {
      div.geometry.coordinates.forEach((poly) =>
        poly[0].forEach(([lng, lat]) => bounds.extend({ lat, lng }))
      );
    });

    map.fitBounds(bounds, { top: 20, bottom: 20, left: 20, right: 20 });
  }, [map, filteredDivisions, selectedDivision]);

  // Render polygons with hover info
  useEffect(() => {
    if (!map) return;

    const polygons: google.maps.Polygon[] = [];

    divisionCoords.forEach((multiPoly, i) => {
      const divFeature = filteredDivisions[i];

      // Match division by name or ID
      const divisionData = data?.find(
        (p) =>
          p.divisionName.toLowerCase() ===
          divFeature.properties.NAME_2.toLowerCase()
      );
      // Determine color based on totalProduction
      let fillColor = "rgba(0,0,0,0)"; // default gray if no data #ccc

      if (divisionData) {
        fillColor =
          divisionData.totalProduction > 0
            ? "#32CD32" // bright green
            : "#FF6347"; // red for zero or negative
      }

      const polygon = new google.maps.Polygon({
        paths: multiPoly,
        strokeColor: "#000",
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor,
        fillOpacity:
          selectedDivision?.properties.NAME_2 === divFeature.properties.NAME_2
            ? 0 // transparent if selected for districts
            : 0.25,
        clickable:
          selectedDivision?.properties.NAME_2 !== divFeature.properties.NAME_2, // disable click if selected
        map,
      });

      // Hover info
      polygon.addListener("mousemove", (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          setHoveredDivision({
            feature: divFeature,
            coords: { lat: e.latLng.lat(), lng: e.latLng.lng() },
          });
          setMousePos({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        }
      });

      polygon.addListener("mouseout", () => {
        setHoveredDivision(null);
        setMousePos(null);
      });

      // Click
      polygon.addListener("click", () => {
        if (onDivisionClick && polygon.get("clickable"))
          onDivisionClick(divFeature);
      });

      polygons.push(polygon);
    });

    return () => polygons.forEach((p) => p.setMap(null));
  }, [
    map,
    divisionCoords,
    filteredDivisions,
    colors,
    selectedDivision,
    onDivisionClick,
    data,
  ]);

  return (
    <>
      {hoveredDivision && (
        <InfoWindow
          position={mousePos || hoveredDivision.coords}
          pixelOffset={[0, -30]}
        >
          <DivisionCard Division={hoveredDivision.feature} data={data} />
        </InfoWindow>
      )}
    </>
  );
}
