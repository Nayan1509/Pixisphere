import { FilterProvider } from "@/context/FilterContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FilterProvider>
      <Navbar />
      <div className="pt-16 bg-[#FAF7F3]">
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </div>
    </FilterProvider>
  );
}
