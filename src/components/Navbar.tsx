import Link from "next/link";
import { useState } from "react";

export default function Navbar() {

  return (
    <nav className="w-full bg-[#DCC5B2] shadow fixed top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <span className="text-2xl font-bold tracking-wide text-[#954C2E]">
            Pixisphere
          </span>
        </Link>
      </div>
    </nav>
  );
}
