import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { BRAND } from "@/lib/utils";

export const metadata: Metadata = {
  title: "SissyOS v2 PRO — sissyjaelynn",
  description: "Her personal irreversible feminization operating system. Bambi training, exposure roulette, empire building. PWA installable.",
  icons: { icon: "/icon-192.jpg" },
  manifest: "/manifest.webmanifest",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a0a] text-[#fce7f3] selection:bg-[#ff1493] selection:text-black">
        {children}
        <Toaster position="top-center" richColors closeButton className="font-sans" />
      </body>
    </html>
  );
}