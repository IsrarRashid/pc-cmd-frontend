import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

const MapWrapper = () => {
  const map = useMap();
  useEffect(() => {
    if (!map) return;

    map.addListener("fullscreenchange", () => {
      console.log("Fullscreen changed");
    });

    // Get the fullscreen control button
    const fullscreenControl = document.querySelector(
      ".gm-fullscreen-control"
    ) as HTMLElement;

    if (fullscreenControl) {
      fullscreenControl.addEventListener("click", () => {
        const wrapper = document.getElementById("map-wrapper");
        if (!document.fullscreenElement) {
          wrapper?.requestFullscreen(); // fullscreen the wrapper (includes UI)
        } else {
          document.exitFullscreen();
        }
      });
    }
  }, [map]);

  return null;
};

export default MapWrapper;
