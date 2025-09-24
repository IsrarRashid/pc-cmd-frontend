"use client";
import { usePathname } from "next/navigation";
import useBackground from "./useBackground";

const BgChanger = () => {
  const currentPath = usePathname();

  const pagePathsForBgImage = ["login", "sign-up"];

  const pathSegment = currentPath.split("/")[1]; // e.g., "sectors"
  const isImagePath = pagePathsForBgImage.includes(pathSegment);
  // #CFE6F8
  useBackground(
    isImagePath ? "/images/login-bg.jpg" : "#fff",
    isImagePath // true if it's an image, false if it's a color
  );

  return <></>; // empty component just to trigger hook
};

export default BgChanger;
