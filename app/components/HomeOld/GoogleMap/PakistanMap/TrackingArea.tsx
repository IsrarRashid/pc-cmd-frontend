import { Tracking } from "@/app/page";
import {
  AdvancedMarker,
  InfoWindow,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useEffect, useState } from "react";

const TrackingArea = ({ data }: { data: Tracking[] }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [markers, setMarkers] = useState<
    {
      id: number;
      position: google.maps.LatLngLiteral;
      track: Tracking;
      type: "vehicle" | "start" | "end";
    }[]
  >([]);

  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  useEffect(() => {
    if (!map || !routesLibrary || !data.length) return;

    const promises = data.map(async (track) => {
      const directionsService = new routesLibrary.DirectionsService();
      const response = await directionsService.route({
        origin: { lat: track.start_lat, lng: track.start_long },
        destination: { lat: track.end_lat, lng: track.end_long },
        travelMode: google.maps.TravelMode.DRIVING,
      });

      // We don’t use DirectionsRenderer now — we’ll manually draw two polylines
      const route = response.routes[0];
      const path = route.overview_path;

      const totalDistance = track.distanceKm;
      const covered = track.coveredDistance;
      const ratio = Math.min(covered / totalDistance, 1);

      // --- Split the path ---
      const distances: number[] = [0];
      for (let i = 1; i < path.length; i++) {
        const segmentDist =
          google.maps.geometry.spherical.computeDistanceBetween(
            path[i - 1],
            path[i]
          ) / 1000;
        distances.push(distances[i - 1] + segmentDist);
      }

      const targetDistance = totalDistance * ratio;
      let i = 1;
      while (i < distances.length && distances[i] < targetDistance) i++;

      const segmentStart = path[i - 1];
      const segmentEnd = path[i];
      const segmentRatio =
        (targetDistance - distances[i - 1]) / (distances[i] - distances[i - 1]);

      const lat =
        segmentStart.lat() +
        (segmentEnd.lat() - segmentStart.lat()) * segmentRatio;
      const lng =
        segmentStart.lng() +
        (segmentEnd.lng() - segmentStart.lng()) * segmentRatio;

      // Split the polyline into two segments
      const coveredPath = path.slice(0, i);
      coveredPath.push(new google.maps.LatLng(lat, lng));
      const remainingPath = [
        new google.maps.LatLng(lat, lng),
        ...path.slice(i),
      ];

      // Draw covered (red)
      new google.maps.Polyline({
        path: coveredPath,
        map,
        strokeColor: "red",
        strokeOpacity: 0.9,
        strokeWeight: 5,
      });

      // Draw remaining (green)
      new google.maps.Polyline({
        path: remainingPath,
        map,
        strokeColor: "green",
        strokeOpacity: 0.9,
        strokeWeight: 5,
      });

      for (let i = 1; i < path.length; i++) {
        const segmentDist =
          google.maps.geometry.spherical.computeDistanceBetween(
            path[i - 1],
            path[i]
          ) / 1000;
        distances.push(distances[i - 1] + segmentDist);
      }

      while (i < distances.length && distances[i] < targetDistance) i++;
      // return all three markers
      return [
        {
          id: track.id,
          position: { lat, lng },
          track,
          type: "vehicle" as const,
        },
        {
          id: track.id * 1000 + 1,
          position: { lat: track.start_lat, lng: track.start_long },
          track,
          type: "start" as const,
        },
        {
          id: track.id * 1000 + 2,
          position: { lat: track.end_lat, lng: track.end_long },
          track,
          type: "end" as const,
        },
      ];
    });

    Promise.all(promises)
      .then((resolvedArrays) => {
        // flatten the array of arrays
        const flattened = resolvedArrays.flat();
        setMarkers(flattened);
      })
      .catch((err) => console.error("Error computing routes:", err));
  }, [map, routesLibrary, data]);

  // hide info window on map click
  useEffect(() => {
    if (!map) return;
    const listener = map.addListener("click", () => setActiveMarker(null));

    return () => google.maps.event.removeListener(listener);
  }, [map]);

  //   const bounds = new google.maps.LatLngBounds();
  // resolvedMarkers.forEach((m) => bounds.extend(m.position));
  // map.fitBounds(bounds);

  return (
    <>
      {markers.map((m) => {
        if (m.type === "vehicle")
          return (
            <AdvancedMarker
              key={m.id}
              position={m.position}
              onClick={() =>
                setActiveMarker((prev) => (prev === m.id ? null : m.id))
              }
            >
              <div
                title={`${m.track.vehicleNumber} (${(
                  (m.track.coveredDistance / m.track.distanceKm) *
                  100
                ).toFixed(1)}% covered)`}
                className="relative flex items-center justify-center"
              >
                <Image
                  src="/icons/vehicle.png"
                  alt="vehicle"
                  width={30}
                  height={33}
                  className="drop-shadow-lg"
                />
                {/* Info window toggle */}
                {activeMarker === m.id && (
                  <InfoWindow
                    position={m.position}
                    onCloseClick={() => setActiveMarker(null)}
                    pixelOffset={[0, -40]}
                  >
                    <div className="text-sm bg-white p-3">
                      <div className="font-semibold">
                        Vehicle #{m.track.vehicleNumber}
                      </div>
                      <div>Driver: {m.track.driverName}</div>
                      <div>Contact: {m.track.driverContact}</div>
                      <div>
                        Distance: {m.track.coveredDistance.toFixed(1)} km /{" "}
                        {m.track.distanceKm.toFixed(1)} km
                      </div>
                      <div>Quantity: {m.track.quantity}</div>
                      <div>
                        Progress:{" "}
                        {(
                          (m.track.coveredDistance / m.track.distanceKm) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                      <div>
                        Start Date: {new Date(m.track.startDate).toDateString()}
                      </div>
                      <div>
                        End Date: {new Date(m.track.endDate).toDateString()}
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </div>
            </AdvancedMarker>
          );

        if (m.type === "start")
          return (
            <AdvancedMarker key={m.id} position={m.position}>
              <div className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-sm font-bold rounded-full shadow-md">
                A
              </div>
            </AdvancedMarker>
          );

        if (m.type === "end")
          return (
            <AdvancedMarker key={m.id} position={m.position}>
              <div className="flex items-center justify-center w-6 h-6 bg-green-600 text-white text-sm font-bold rounded-full shadow-md">
                B
              </div>
            </AdvancedMarker>
          );

        return null;
      })}
    </>
  );
};

export default TrackingArea;
