import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeSwitcher from "./components/ThemeSwitcher";
import ToastContainers from "./components/ToastContainers";
import "./globals.css";
import NavbarToggle from "./components/Navbar/NavbarToggle";
import QueryClientProvider from "./QueryClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PC & CMD",
  description: "Access Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeSwitcher>
          <QueryClientProvider>
            <NavbarToggle />
            <main className="p-0">{children}</main>
          </QueryClientProvider>
        </ThemeSwitcher>
        <ToastContainers />
      </body>
    </html>
  );
}
