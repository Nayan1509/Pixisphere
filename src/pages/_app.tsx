import { FilterProvider } from "@/context/FilterContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FilterProvider>
      <Component {...pageProps} />
    </FilterProvider>
  );
}
