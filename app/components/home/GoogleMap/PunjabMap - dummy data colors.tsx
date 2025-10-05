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

// // dummy data
// const divisionData: Record<
//   string,
//   { total: number; districts: Record<string, number> }
// > = {
//   Lahore: {
//     total: 20,
//     districts: {
//       Lahore: 10,
//       Kasur: 5,
//       Sheikhupura: 3,
//       NankanaSahib: 2,
//     },
//   },
//   Faisalabad: {
//     total: 10,
//     districts: {
//       Faisalabad: 5,
//       Jhang: 2,
//       TobaTekSingh: 2,
//       Chiniot: 1,
//     },
//   },
//   Multan: {
//     total: 4,
//     districts: {
//       Multan: 2,
//       Khanewal: 1,
//       Lodhran: 1,
//     },
//   },
//   Gujranwala: {
//     total: 15,
//     districts: {
//       Gujranwala: 4,
//       Sialkot: 4,
//       Narowal: 2,
//       Hafizabad: 2,
//       MandiBahauddin: 3,
//     },
//   },
//   Sargodha: {
//     total: 6,
//     districts: {
//       Sargodha: 2,
//       Khushab: 1,
//       Mianwali: 2,
//       Bhakkar: 1,
//     },
//   },
//   Rawalpindi: {
//     total: 3,
//     districts: {
//       Rawalpindi: 1,
//       Attock: 1,
//       Chakwal: 1,
//     },
//   },
//   Bahawalpur: {
//     total: 40,
//     districts: {
//       Bahawalpur: 25,
//       Bahawalnagar: 11,
//       RahimYarKhan: 4,
//     },
//   },
//   DeraGhaziKhan: {
//     total: 7,
//     districts: {
//       DeraGhaziKhan: 2,
//       Rajanpur: 2,
//       Muzaffargarh: 2,
//       Layyah: 1,
//     },
//   },
//   Sahiwal: {
//     total: 9,
//     districts: {
//       Sahiwal: 3,
//       Okara: 3,
//       Pakpattan: 3,
//     },
//   },
//   Gujrat: {
//     total: 13,
//     districts: {
//       Gujrat: 5,
//       MandiBahauddin: 3,
//       Hafizabad: 2,
//       Narowal: 3,
//     },
//   },
// };

// // --- Helper for colors ---
// const getColor = (price: number) => {
//   if (price < 5) return "red";
//   if (price <= 10) return "yellow";
//   return "green";
// };

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
//         {divisionPolys.map((d, i) => {
//           const divisionName = d.props.NAME_2;
//           const price = divisionData[divisionName!]?.total ?? 0;
//           return (
//             <Polygon
//               key={i}
//               paths={d.coords}
//               strokeColor="#16a34a"
//               strokeOpacity={0.9}
//               strokeWeight={1}
//               fillColor={getColor(price)}
//               fillOpacity={0.4}
//               onClick={() => setActiveDivision(d)}
//             />
//           );
//         })}

//         {/* Districts (only inside active division) */}
//         {activeDivision &&
//           districtPolys
//             .filter((dist) => dist.props.NAME_2 === activeDivision.props.NAME_2)
//             .map((d, i) => {
//               const districtName = d.props.NAME_3;
//               const price =
//                 divisionData[activeDivision.props.NAME_2!]?.districts[
//                   districtName!
//                 ] ?? 0;
//               return (
//                 <Polygon
//                   key={i}
//                   paths={d.coords}
//                   strokeColor="#cfa015"
//                   strokeOpacity={0.9}
//                   strokeWeight={1}
//                   fillColor={getColor(price)}
//                   fillOpacity={0.4}
//                 />
//               );
//             })}

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
//       map.setZoom(7);
//     }
//   }, [map, activeDivision]);

//   return null;
// };
