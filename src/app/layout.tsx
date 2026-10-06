import type { Metadata } from "next";
import "./globals.css";
import "./live.css";
export const metadata: Metadata={title:"Rosewill Loving Arms",description:"A safe place to heal. A future to grow into."};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>;}
