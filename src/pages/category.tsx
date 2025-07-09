import Head from "next/head";
import { useEffect, useState } from "react";
import { useFilterContext } from "@/context/FilterContext";
import PhotographerCard from "@/components/PhotographerCard";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import { getPhotographers } from "@/utils/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const { filters } = useFilterContext();

  useEffect(() => {
    setIsLoading(true);
    getPhotographers().then((res) => {
      setPhotographers(res.data);
      setFiltered(res.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      let result = [...photographers];
      const q = searchQuery.toLowerCase();
      if (q) {
        result = result.filter((p) =>
          [p.name, p.location, ...(p.tags || [])]
            .join(" ")
            .toLowerCase()
            .includes(q)
        );
      }
      result = result.filter(
        (p) =>
          p.price >= filters.price[0] &&
          p.price <= filters.price[1] &&
          p.rating >= filters.rating &&
          (filters.city ? p.location === filters.city : true) &&
          (filters.styles.length === 0 ||
            filters.styles.some((s) => p.styles.includes(s)))
      );
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
        <SearchBar query={searchQuery} setQuery={setSearchQuery} />
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <FilterSidebar photographers={photographers} />
          <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading
              ? [...Array(6)].map((_, i) => (
                  <div key={i} className="p-4 bg-white rounded shadow">
                    <Skeleton height={192} />
                    <Skeleton count={3} className="mt-2" />
                  </div>
                ))
              : filtered
                  .slice(0, visibleCount)
                  .map((p) => <PhotographerCard key={p.id} photographer={p} />)}
          </div>
        </div>
        {!isLoading && visibleCount < filtered.length && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Load More
            </button>
          </div>
        )}
      </main>
    </>
  );
}
