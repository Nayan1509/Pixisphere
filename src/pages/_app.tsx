import { FilterProvider } from "@/context/FilterContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FilterProvider>
      <Navbar />
      <div className="pt-16 bg-[#F0F0F0]">
        <Component {...pageProps} />
      </div>
    </FilterProvider>
  );
}
