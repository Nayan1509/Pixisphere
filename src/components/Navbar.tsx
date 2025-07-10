import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow fixed top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <span className="text-2xl font-bold tracking-wide text-blue-600">
            Pixisphere
          </span>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/category" className="text-gray-700 hover:text-blue-600">
            Browse
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 hover:text-blue-600"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-white shadow">
          <Link
            href="/category"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Browse
          </Link>
          <Link
            href="/about"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
