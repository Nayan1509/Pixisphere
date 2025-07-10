import { Photographer } from "@/pages/category";
import { useFilterContext } from "@/context/FilterContext";

export default function FilterSidebar({
  photographers,
}: {
  photographers: Photographer[];
}) {
  const { filters, setFilters } = useFilterContext();
  const allCities = [...new Set(photographers.map((p) => p.location))];
  const allStyles = [...new Set(photographers.flatMap((p) => p.styles))];

  return (
    <aside className="w-full p-5 space-y-6">
      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price Range
        </label>
        <input
          type="range"
          min={0}
          max={20000}
          step={1000}
          value={filters.price[1]}
          onChange={(e) =>
            setFilters({ ...filters, price: [0, +e.target.value] })
          }
          className="w-full appearance-none h-2 bg-[#fddede] rounded-lg cursor-pointer accent-[#E7473C]"
        />
        <p className="text-sm text-gray-500 mt-1">Up to ₹{filters.price[1]}</p>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Minimum Rating
        </label>
        <select
          className="w-full rounded-md border border-gray-300 focus:border-[#E7473C] focus:ring-1 focus:ring-[#E7473C] text-sm px-3 py-2 transition"
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Styles
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {allStyles.map((style) => (
            <label
              key={style}
              className="text-sm flex items-center gap-1 text-gray-700"
            >
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
                className="accent-[#E7473C]"
              />
              {style}
            </label>
          ))}
        </div>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City
        </label>
        <select
          className="w-full rounded-md border border-gray-300 focus:border-[#E7473C] focus:ring-1 focus:ring-[#E7473C] text-sm px-3 py-2 transition"
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

      {/* Sort By */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sort By
        </label>
        <select
          className="w-full rounded-md border border-gray-300 focus:border-[#E7473C] focus:ring-1 focus:ring-[#E7473C] text-sm px-3 py-2 transition"
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
        >
          <option value="">None</option>
          <option value="price">Price (Low → High)</option>
          <option value="rating">Rating (High → Low)</option>
          <option value="recent">Recently Added</option>
        </select>
      </div>
      <div className="pt-4 border-t mt-6">
        <button
          onClick={() =>
            setFilters({
              price: [0, 20000],
              rating: 0,
              styles: [],
              city: "",
              sortBy: "",
            })
          }
          className="w-full text-sm font-medium text-[#E7473C] py-2 px-4 border border-[#E7473C] rounded-md hover:bg-[#E7473C] hover:text-white transition"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
}
