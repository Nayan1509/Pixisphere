import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Add a navbar here if needed */}
      <Component {...pageProps} />
      {/* Add a footer here if needed */}
    </>
  );
}
