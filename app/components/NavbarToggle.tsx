"use client";

import { usePathname } from "next/navigation";
import Navbar from "../Navbar";

const NavbarToggle = () => {
  const currentPath = usePathname();

  if (
    currentPath !== "/login" &&
    currentPath !== "/privacy-policy" &&
    currentPath !== "/sign-up"
  ) {
    return <Navbar />;
  }
  // else {
  //   return <div style={{ height: "68px" }}></div>;
  // }
};

export default NavbarToggle;
