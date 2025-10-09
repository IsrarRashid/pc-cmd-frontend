"use client";

import { InfoWindow, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useMemo, useState } from "react";
import DistrictCard from "../Cards/New/DistrictCard";
import { DivisionFeature } from "./DivisionsArea";
import { DistrictProduction } from "@/app/page";

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

interface Props {
  geoData: GeoJSONDistricts;
  selectedDivision?: DivisionFeature | null;
  data: DistrictProduction[] | undefined;
}

// --- Component ---
export default function DistrictsArea({
  geoData,
  selectedDivision,
  data,
}: Props) {
  const [hoveredDistrict, setHoveredDistrict] = useState<{
    coords: google.maps.LatLngLiteral;
    feature: DistrictFeature;
  } | null>(null);
  const [mousePos, setMousePos] = useState<google.maps.LatLngLiteral | null>(
    null
  );

  const map = useMap();

  // const colors = useMemo(
  //   () => [
  //     "#e6194b",
  //     "#3cb44b",
  //     "#ffe119",
  //     "#4363d8",
  //     "#f58231",
  //     "#911eb4",
  //     "#46f0f0",
  //     "#f032e6",
  //     "#bcf60c",
  //     "#fabebe",
  //     "#008080",
  //     "#e6beff",
  //     "#9a6324",
  //     "#fffac8",
  //     "#800000",
  //     "#aaffc3",
  //     "#808000",
  //     "#ffd8b1",
  //     "#000075",
  //     "#808080",
  //   ],
  //   []
  // );

  // Always filter districts (hook always called)
  const filteredDistricts = useMemo(() => {
    if (!selectedDivision) return [];
    return geoData.features.filter(
      (dist) => dist.properties.NAME_2 === selectedDivision.properties.NAME_2
    );
  }, [geoData.features, selectedDivision]);

  const districtCoords = useMemo(() => {
    return filteredDistricts.map((feature) =>
      feature.geometry.coordinates.map((poly) =>
        poly[0].map(([lng, lat]) => ({ lat, lng }))
      )
    );
  }, [filteredDistricts]);

  // Fit map effect
  useEffect(() => {
    if (!map || districtCoords.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    districtCoords.forEach((multiPoly) =>
      multiPoly.forEach((poly) => poly.forEach((point) => bounds.extend(point)))
    );
    map.fitBounds(bounds, { top: 20, bottom: 20, left: 20, right: 20 });
  }, [map, districtCoords]);

  // Render polygons
  useEffect(() => {
    if (!map || districtCoords.length === 0) return;

    const polygons: google.maps.Polygon[] = [];

    districtCoords.forEach((multiPoly, i) => {
      // ✅ get the current GeoJSON district feature
      const feature = filteredDistricts[i];

      // ✅ match district name from API data with GeoJSON feature
      const districtData = data?.find(
        (d) =>
          d.districtName.toLowerCase() ===
          feature.properties.NAME_3.toLowerCase()
      );

      // Determine fill color
      let fillColor = "rgba(0,0,0,0)"; // default gray if no data #ccc
      if (districtData) {
        fillColor =
          districtData.totalProduction > 0
            ? "#32CD32" // green if production > 0
            : "#FF6347"; // red if 0 or missing
      }

      const polygon = new google.maps.Polygon({
        paths: multiPoly,
        strokeColor: "#000",
        strokeOpacity: 0.5,
        strokeWeight: 2,
        // fillColor: colors[i % colors.length],
        fillColor,
        fillOpacity: 0.25,
        map,
      });

      // Mouse hover
      polygon.addListener("mousemove", (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          setHoveredDistrict({
            feature: filteredDistricts[i],
            coords: { lat: e.latLng.lat(), lng: e.latLng.lng() },
          });
          setMousePos({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        }
      });

      polygon.addListener("mouseout", () => {
        setHoveredDistrict(null);
        setMousePos(null);
      });

      // Disable click if needed
      polygon.setOptions({
        clickable: true,
      });

      polygons.push(polygon);
    });

    return () => polygons.forEach((p) => p.setMap(null));
  }, [map, districtCoords, filteredDistricts, data]);

  return (
    <>
      {hoveredDistrict && (
        <InfoWindow
          position={mousePos || hoveredDistrict.coords}
          pixelOffset={[0, -30]}
        >
          <DistrictCard District={hoveredDistrict.feature} data={data} />
        </InfoWindow>
      )}
    </>
  );
}
