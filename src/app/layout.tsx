import type { Metadata } from "next";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./globals.css";
import "./live.css";
import "./port.css";

let DevelopmentTools: () => React.ReactNode = () => null;

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- This guarded import is removed from production builds.
  DevelopmentTools = require("@/components/DevelopmentTools").DevelopmentTools;
}

export const metadata: Metadata={title:"Rosewill Loving Arms",description:"A safe place to heal. A future to grow into."};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}<ScrollToTop /><DevelopmentTools /></body></html>;}
