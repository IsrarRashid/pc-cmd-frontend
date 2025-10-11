"use client";

import { InfoWindow, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useMemo, useState } from "react";
import ProvinceCard from "../Cards/ProvinceCard";
import { Province } from "@/app/page";
import { ECONOMIC_BALANCE_ENUM } from "../../types/types";

// --- Interfaces ---
export interface ProvinceFeature {
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
  features: ProvinceFeature[];
}

interface Props {
  geoData: GeoJSONProvinces;
  selectedProvince?: ProvinceFeature | null;
  onProvinceClick?: (province: ProvinceFeature) => void;
  data: Province[];
  selectedEconomicBalance: ECONOMIC_BALANCE_ENUM | undefined;
}

// const colors = [
//   "#1E90FF",
//   "#32CD32",
//   "#FFD700",
//   "#FF6347",
//   "#9370DB",
//   "#20B2AA",
//   "#FF8C00",
// ];

export default function ProvincesArea({
  geoData,
  onProvinceClick,
  selectedProvince,
  data,
  selectedEconomicBalance,
}: Props) {
  const [hoveredProvince, setHoveredProvince] = useState<{
    coords: google.maps.LatLngLiteral;
    feature: ProvinceFeature;
  } | null>(null);

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

  // Color pool
  const colorPool = [
    "#609052",
    "#BF092F",
    "#3BA2F1",
    "#FF6347",
    "#9370DB",
    "#20B2AA",
    "#FF8C00",
    "#FF69B4",
    "#8B4513",
    "#00CED1",
  ];

  // Assign color to each province from backend data
  const provinceColors = data.map((province, index) => ({
    provinceName: province.provinceName,
    color: colorPool[index % colorPool.length], // cycle through pool
  }));

  // Map to quickly lookup color by province name
  const provinceColorMap = Object.fromEntries(
    provinceColors.map((p) => [p.provinceName.toLowerCase(), p.color])
  );

  useEffect(() => {
    if (!map) return;

    const polygons: google.maps.Polygon[] = [];

    provinceCoords.forEach((multiPoly, i) => {
      const feature = geoData.features[i];
      const isSelected =
        selectedProvince?.properties.GID_1 === feature.properties.GID_1;

      // Match province by name
      const provinceData = data.find(
        (p) =>
          p.provinceName.toLowerCase() ===
          feature.properties.NAME_1.toLowerCase()
      );

      const fillColor = provinceData?.provinceName
        ? provinceColorMap[provinceData.provinceName.toLowerCase()]
        : "#ccc"; // fallback

      const polygon = new google.maps.Polygon({
        paths: multiPoly,
        strokeColor: "#000",
        strokeOpacity: 0.7,
        strokeWeight: 3,
        fillColor,
        fillOpacity: isSelected ? 0 : 0.35,
        clickable: !isSelected,
        map,
      });

      if (!isSelected) {
        polygon.addListener("mousemove", (e: google.maps.MapMouseEvent) => {
          if (e.latLng) {
            setHoveredProvince({
              feature,
              coords: { lat: e.latLng.lat(), lng: e.latLng.lng() },
            });
          }
        });

        polygon.addListener("mouseout", () => {
          setHoveredProvince(null);
        });

        polygon.addListener("click", () => {
          if (onProvinceClick) onProvinceClick(feature);
          const bounds = new google.maps.LatLngBounds();
          multiPoly.forEach((poly) =>
            poly.forEach((point) => bounds.extend(point))
          );
          map.fitBounds(bounds, { top: 20, bottom: 20, left: 20, right: 20 });
        });
      }

      polygons.push(polygon);
    });

    return () => {
      polygons.forEach((p) => p.setMap(null));
    };
  }, [
    map,
    provinceCoords,
    geoData.features,
    selectedProvince,
    onProvinceClick,
    data,
    provinceColorMap,
  ]);

  return (
    <>
      {hoveredProvince && (
        <InfoWindow position={hoveredProvince.coords} pixelOffset={[0, -30]}>
          <ProvinceCard Province={hoveredProvince.feature} data={data} />
        </InfoWindow>
      )}
    </>
  );
}
