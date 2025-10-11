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
  const [mousePos, setMousePos] = useState<google.maps.LatLngLiteral | null>(
    null
  );

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
  //   useEffect(() => {
  //     if (!map || !provinceCoords.length) return;

  //     const bounds = new google.maps.LatLngBounds();
  //     provinceCoords.forEach((multiPoly) =>
  //       multiPoly.forEach((poly) => poly.forEach((point) => bounds.extend(point)))
  //     );

  //     map.fitBounds(bounds, { top: 30, bottom: 30, left: 30, right: 30 });

  //     google.maps.event.addListenerOnce(map, "idle", () => {
  //       map.setZoom(map.getZoom()! + 1);
  //     });
  //   }, [provinceCoords, map]);

  // Function to fit map to a province when clicked
  const fitProvinceBounds = useCallback(
    (multiPoly: google.maps.LatLngLiteral[][]) => {
      if (!map) return;
      const bounds = new google.maps.LatLngBounds();
      multiPoly.forEach((poly) =>
        poly.forEach((point) => bounds.extend(point))
      );
      map.fitBounds(bounds, { top: 20, bottom: 20, left: 20, right: 20 });
    },
    [map]
  );
  // const fitProvinceBounds = (multiPoly: google.maps.LatLngLiteral[][]) => {
  //   if (!map) return;
  //   const bounds = new google.maps.LatLngBounds();
  //   multiPoly.forEach((poly) => poly.forEach((point) => bounds.extend(point)));
  //   map.fitBounds(bounds, { top: 20, bottom: 20, left: 20, right: 20 });
  // };

  // Define a pool of colors to assign
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

  console.log("province data", data);

  // Generate mapping from backend data
  const provinceColors: { provinceName: string; color: string }[] = data.map(
    (province, index) => ({
      provinceName: province.provinceName,
      color: colorPool[index % colorPool.length], // cycle if more provinces than colors
    })
  );

  console.log("provinceColors", provinceColors);

  // const getProvinceColor = (
  //   provinceData: Province,
  //   selectedEconomicBalance?: ECONOMIC_BALANCE_ENUM
  // ): string => {
  //   const provinceColorObj = provinceColors.find(
  //     (p) =>
  //       p.provinceName.toLowerCase() === provinceData.provinceName.toLowerCase()
  //   );
  //   const baseColor = provinceColorObj?.color || "#ccc"; // fallback if not found

  //   if (!selectedEconomicBalance) return baseColor;

  //   switch (selectedEconomicBalance) {
  //     case "PRODUCTION":
  //       return provinceData.totalProduction > 0 ? "#609052" : baseColor;
  //     case "CONSUMPTION":
  //       return provinceData.totalConsumption > 0 ? "#f0f036" : baseColor;
  //     case "DEFICIT":
  //       return provinceData.balance > 0 ? "#e61313" : baseColor;
  //     default:
  //       return baseColor;
  //   }
  // };

  useEffect(() => {
    if (!map) return;

    const polygons: google.maps.Polygon[] = [];

    provinceCoords.forEach((multiPoly, i) => {
      const feature = geoData.features[i];
      const isSelected =
        selectedProvince?.properties.GID_1 === feature.properties.GID_1;

      // Match province by name or ID
      const provinceData = data.find(
        (p) =>
          p.provinceName.toLowerCase() ===
          feature.properties.NAME_1.toLowerCase()
      );
      // Determine color based on totalProduction
      let fillColor = "rgba(0,0,0,0)"; // default gray if no data #ccc

      if (provinceData && selectedEconomicBalance) {
        fillColor = selectedEconomicBalance;
      }
      const polygon = new google.maps.Polygon({
        paths: multiPoly,
        // strokeColor: colors[i % colors.length],
        strokeColor: "#000",
        strokeOpacity: 0.7,
        strokeWeight: 3,
        // fillColor: colors[i % colors.length],
        fillColor,
        fillOpacity: isSelected ? 0 : 0.35, // hide fill if selected
        clickable: !isSelected, // disable further clicks if selected
        map,
      });

      if (!isSelected) {
        // Mouse move event to track cursor
        polygon.addListener("mousemove", (e: google.maps.MapMouseEvent) => {
          if (e.latLng) {
            setHoveredProvince({
              feature,
              coords: { lat: e.latLng.lat(), lng: e.latLng.lng() },
            });
          }
        });

        // Mouse out event
        polygon.addListener("mouseout", () => {
          setHoveredProvince(null);
          setMousePos(null);
        });

        // Click event to zoom to province bounds and mark as selected
        polygon.addListener("click", () => {
          if (onProvinceClick) onProvinceClick(feature);
          fitProvinceBounds(multiPoly);
        });
      }

      polygons.push(polygon);
    });

    return () => {
      polygons.forEach((p) => p.setMap(null)); // Cleanup
    };
  }, [
    map,
    provinceCoords,
    geoData.features,
    selectedProvince,
    onProvinceClick,
    fitProvinceBounds,
    data,
  ]);

  return (
    <>
      {hoveredProvince && (
        <InfoWindow
          position={mousePos || hoveredProvince.coords}
          pixelOffset={[0, -30]}
        >
          <ProvinceCard Province={hoveredProvince.feature} data={data} />
        </InfoWindow>
      )}
    </>
  );
}
