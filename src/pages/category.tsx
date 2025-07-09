// pages/category.tsx
import Head from "next/head";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import PhotographerCard from "@/components/PhotographerCard";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSideBar";

export interface Photographer {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  styles: string[];
  tags: string[];
  bio: string;
  profilePic: string;
  portfolio: string[];
  reviews: {
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export default function CategoryPage() {
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [filtered, setFiltered] = useState<Photographer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    price: [0, 20000],
    rating: 0,
    styles: [] as string[],
    city: "",
    sortBy: "",
  });

  useEffect(() => {
    axios.get("http://localhost:3001/photographers").then((res) => {
      setPhotographers(res.data);
      setFiltered(res.data);
    });
  }, []);

  // Debounced search & filters
  useEffect(() => {
    const timer = setTimeout(() => {
      let result = [...photographers];

      // 🔍 Search logic
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        result = result.filter((p) =>
          [p.name, p.location, ...(p.tags || [])]
            .join(" ")
            .toLowerCase()
            .includes(q)
        );
      }

      // 🧠 Filters
      result = result.filter((p) => {
        const matchesPrice =
          p.price >= filters.price[0] && p.price <= filters.price[1];
        const matchesRating = p.rating >= filters.rating;
        const matchesStyle =
          filters.styles.length === 0 ||
          filters.styles.some((style) => p.styles.includes(style));
        const matchesCity = !filters.city || p.location === filters.city;
        return matchesPrice && matchesRating && matchesStyle && matchesCity;
      });

      // 🔃 Sorting
      if (filters.sortBy === "price") result.sort((a, b) => a.price - b.price);
      if (filters.sortBy === "rating")
        result.sort((a, b) => b.rating - a.rating);
      if (filters.sortBy === "recent") result.sort((a, b) => b.id - a.id);

      setFiltered(result);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, filters, photographers]);

  return (
    <>
      <Head>
        <title>Photographers in Bengaluru | Pixisphere</title>
      </Head>

      <main className="p-4 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          Maternity Photographers in Bengaluru
        </h1>

        {/* 🔍 Search */}
        <SearchBar query={searchQuery} setQuery={setSearchQuery} />

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          {/* 🎛️ Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            photographers={photographers}
          />

          {/* 🧱 Photographer Grid */}
          <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.length === 0 ? (
              <p>No photographers found.</p>
            ) : (
              filtered.map((p) => (
                <PhotographerCard key={p.id} photographer={p} />
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
