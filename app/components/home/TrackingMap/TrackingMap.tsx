"use client";

import { ProductionDashboard } from "@/app/page";
import { devmap } from "@/app/utils/utils";
import pakistanGeo from "@/public/data/gadm41_PAK/gadm41_PAK_0.json";
import { Button, Flex } from "@radix-ui/themes";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { MdFullscreen } from "react-icons/md";
import { RiFullscreenExitFill } from "react-icons/ri";
import MapWrapper from "../GoogleMap/PakistanMap/MapWrapper";
import { GeoJSONPakistan } from "../GoogleMap/PakistanMap/PakistanArea";
import TrackingArea from "../GoogleMap/PakistanMap/TrackingArea";
import PakistanArea from "./PakistanArea";

const TrackingMap = ({
  productionDashboardData,
}: {
  productionDashboardData: ProductionDashboard;
}) => {
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // Cleanup listener on unmount
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    const wrapper = document.getElementById("tracking-wrapper");
    if (!document.fullscreenElement) {
      wrapper?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="relative w-full h-full">
      <div id="tracking-wrapper" className="relative w-full h-full mb-3">
        <div className="absolute mb-3 right-14 bottom-0 z-10 w-[95%]">
          <Flex justify="end">
            <Button
              onClick={() => setShowGraph(!showGraph)}
              className="!bg-white !text-[#101828] !border-[#D0D5DD] !border-[1px] !mb-2"
            >
              {showGraph ? "Hide" : "Show Graph"}
            </Button>
          </Flex>
        </div>
        <button
          className="absolute top-3 right-3 z-20 bg-white p-1 rounded shadow"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? (
            <RiFullscreenExitFill size={24} />
          ) : (
            <MdFullscreen size={24} />
          )}
        </button>
        <APIProvider
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}
          libraries={["routes", "geometry", "marker"]}
        >
          {devmap && (
            <Map
              mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
              defaultZoom={10}
              defaultCenter={{ lat: 31.17, lng: 72.7097 }}
              gestureHandling="greedy"
              style={{
                width: "100%",
                height: `${isFullscreen ? "100vh" : "130px"}`,
                transition: "all .3s",
              }}
              zoomControl={true}
              fullscreenControl={false}
            >
              <MapWrapper />
              <PakistanArea geoData={pakistanGeo as GeoJSONPakistan} />
              <TrackingArea data={productionDashboardData.tracking} />
            </Map>
          )}
        </APIProvider>
      </div>
    </div>
  );
};

export default TrackingMap;
