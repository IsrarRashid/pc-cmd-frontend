// "use client";

// import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
// import { Polygon } from "./polygon";
// import provinces from "@/public/data/gadm41_PAK/gadm41_PAK_1.json";
// import divisions from "@/public/data/gadm41_PAK/gadm41_PAK_2.json";
// import districts from "@/public/data/gadm41_PAK/gadm41_PAK_3.json";

// import { useEffect, useState } from "react";

// interface PolygonFeature {
//   coords: google.maps.LatLngLiteral[][];
//   props: {
//     NAME_1: string; // Province
//     NAME_2?: string; // Division
//     NAME_3?: string; // District
//     [key: string]: any;
//   };
// }

// const punjab = provinces.features.find((f) => f.properties.NAME_1 === "Punjab");

// const punjabDivisions = (divisions as any).features.filter(
//   (f: any) => f.properties.NAME_1 === "Punjab"
// );

// const punjabDistricts = (districts as any).features.filter(
//   (f: any) => f.properties.NAME_1 === "Punjab"
// );

// const extraDivisions = punjabDistricts
//   .filter(
//     (d: any) =>
//       d.properties.NAME_3 === "Gujrat" || d.properties.NAME_3 === "Sahiwal"
//   )
//   .map((d: any) => ({
//     ...d,
//     properties: {
//       ...d.properties,
//       NAME_2: d.properties.NAME_3,
//       TYPE_2: "Division",
//     },
//   }));

// const punjabDivisionsFixed = [...punjabDivisions, ...extraDivisions];

// const PunjabMap = () => {
//   const [punjabCoords, setPunjabCoords] =
//     useState<google.maps.LatLngLiteral[][]>();

//   const [divisionPolys, setDivisionPolys] = useState<PolygonFeature[]>([]);
//   const [districtPolys, setDistrictPolys] = useState<PolygonFeature[]>([]);

//   const [activeDivision, setActiveDivision] = useState<PolygonFeature | null>(
//     null
//   );

//   useEffect(() => {
//     if (punjab) {
//       const punjabCoords: google.maps.LatLngLiteral[][] =
//         punjab.geometry.coordinates.map((polygon: number[][][]) =>
//           polygon[0].map(([lng, lat]) => ({ lat, lng }))
//         );
//       setPunjabCoords(punjabCoords);
//     }

//     // division polygons with props
//     const divisionFeatures: PolygonFeature[] = punjabDivisionsFixed.map(
//       (division: any) => ({
//         coords: division.geometry.coordinates.map((polygon: number[][][]) =>
//           polygon[0].map(([lng, lat]) => ({ lat, lng }))
//         ),
//         props: division.properties,
//       })
//     );
//     setDivisionPolys(divisionFeatures);

//     // district polygons with props
//     const districtFeatures: PolygonFeature[] = punjabDistricts.map(
//       (district: any) => ({
//         coords: district.geometry.coordinates.map((polygon: number[][][]) =>
//           polygon[0].map(([lng, lat]) => ({ lat, lng }))
//         ),
//         props: district.properties,
//       })
//     );
//     setDistrictPolys(districtFeatures);
//   }, []);

//   return (
//     <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}>
//       <Map
//         defaultZoom={7}
//         defaultCenter={{ lat: 31.17, lng: 72.7097 }}
//         gestureHandling="greedy"
//         style={{ width: "100%", height: "100vh" }}
//       >
//         {/* Province outline */}
//         {punjabCoords && (
//           <Polygon
//             paths={punjabCoords}
//             strokeColor="#0c4cb3"
//             strokeOpacity={1}
//             strokeWeight={2}
//             fillColor="#3b82f6"
//             fillOpacity={0}
//           />
//         )}

//         {/* Divisions */}
//         {divisionPolys.map((d, i) => (
//           <Polygon
//             key={i}
//             paths={d.coords}
//             strokeColor="#16a34a"
//             strokeOpacity={0.9}
//             strokeWeight={1}
//             fillColor="#22c55e"
//             fillOpacity={0.25}
//             onClick={() => setActiveDivision(d)}
//           />
//         ))}

//         {/* Districts (only inside active division) */}
//         {activeDivision &&
//           districtPolys
//             .filter((dist) => dist.props.NAME_2 === activeDivision.props.NAME_2)
//             .map((d, i) => (
//               <Polygon
//                 key={i}
//                 paths={d.coords}
//                 strokeColor="#cfa015"
//                 strokeOpacity={0.9}
//                 strokeWeight={1}
//                 fillColor="#e3ed1c"
//                 fillOpacity={0.25}
//               />
//             ))}

//         <MapUpdater activeDivision={activeDivision} />
//       </Map>
//     </APIProvider>
//   );
// };

// export default PunjabMap;

// const MapUpdater = ({
//   activeDivision,
// }: {
//   activeDivision: PolygonFeature | null;
// }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!map) return;

//     if (activeDivision) {
//       const bounds = new google.maps.LatLngBounds();
//       activeDivision.coords.forEach((polygon) =>
//         polygon.forEach((point) => bounds.extend(point))
//       );
//       map.fitBounds(bounds);
//     } else {
//       map.panTo({ lat: 31.1704, lng: 72.7097 });
//       map.setZoom(10);
//     }
//   }, [map, activeDivision]);

//   return null;
// };
