"use client";

import { Theme } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const ThemeSwitcher = ({ children }: PropsWithChildren) => {
  const currentPath = usePathname();
  return (
    <Theme
      panelBackground="translucent"
      accentColor="blue"
      radius="large"
      appearance="light"
      hasBackground={
        currentPath === "/login" || currentPath === "/sign-up" ? false : true
      }
    >
      {children}
    </Theme>
  );
};

export default ThemeSwitcher;
