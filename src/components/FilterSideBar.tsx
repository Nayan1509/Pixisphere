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
    <aside className="w-full">

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
