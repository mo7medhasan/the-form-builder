import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import {  FormsProvider } from "@/context/FormContext";

// Font files can be colocated inside of `app`
const Natashawalke = localFont({
  src: [
    { path: "./fonts/NatashaWalker-Bold.woff", weight: "bold" },
    { path: "./fonts/NatashaWalker-Regular.woff", weight: "normal" },
  ],
  variable: "--font-Natashawalke",
  display: "swap",
});
const PetitCochon = localFont({
  src: [
    { path: "./fonts/Petit Cochon.otf" },
    { path: "./fonts/Petit Cochon.ttf" },
  ],
  display: "swap",
  variable: "--font-PetitCochon",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});
export const metadata = {
  title: "FormBuilder",
  description: "Form Builder",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${montserrat.variable}  ${Natashawalke.variable}  ${PetitCochon.variable} `}
        > <FormsProvider>
          {children}
          <Toaster />
          </FormsProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
