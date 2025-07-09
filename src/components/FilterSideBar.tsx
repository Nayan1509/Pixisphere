// components/FilterSidebar.tsx
import { Photographer } from "@/pages/category";

interface Props {
  filters: any;
  setFilters: (f: any) => void;
  photographers: Photographer[];
}

export default function FilterSidebar({
  filters,
  setFilters,
  photographers,
}: Props) {
  const allCities = [...new Set(photographers.map((p) => p.location))];
  const allStyles = [...new Set(photographers.flatMap((p) => p.styles))];

  return (
    <aside className="w-full md:w-1/4 border border-gray-200 p-4 rounded shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Price */}
      <div className="mb-4">
        <label className="font-medium">Price Range</label>
        <input
          type="range"
          min={0}
          max={20000}
          step={1000}
          value={filters.price[1]}
          onChange={(e) =>
            setFilters({ ...filters, price: [0, +e.target.value] })
          }
          className="w-full mt-2"
        />
        <p className="text-sm text-gray-500">Up to ₹{filters.price[1]}</p>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="font-medium">Minimum Rating</label>
        <select
          className="w-full mt-2 border border-gray-300 rounded p-1"
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: +e.target.value })}
        >
          <option value={0}>Any</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
          <option value={4.5}>4.5+</option>
        </select>
      </div>

      {/* Styles */}
      <div className="mb-4">
        <label className="font-medium">Styles</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {allStyles.map((style) => (
            <label key={style} className="text-sm flex items-center gap-1">
              <input
                type="checkbox"
                checked={filters.styles.includes(style)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      styles: [...filters.styles, style],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      styles: filters.styles.filter((s) => s !== style),
                    });
                  }
                }}
              />
              {style}
            </label>
          ))}
        </div>
      </div>

      {/* City */}
      <div className="mb-4">
        <label className="font-medium">City</label>
        <select
          className="w-full mt-2 border border-gray-300 rounded p-1"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        >
          <option value="">All</option>
          {allCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Sorting */}
      <div>
        <label className="font-medium">Sort By</label>
        <select
          className="w-full mt-2 border border-gray-300 rounded p-1"
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
        >
          <option value="">None</option>
          <option value="price">Price (Low → High)</option>
          <option value="rating">Rating (High → Low)</option>
          <option value="recent">Recently Added</option>
        </select>
      </div>
    </aside>
  );
}
