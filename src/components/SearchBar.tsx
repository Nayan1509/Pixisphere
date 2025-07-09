interface Props {
  query: string;
  setQuery: (value: string) => void;
}

export default function SearchBar({ query, setQuery }: Props) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search by name, location, or tag"
        className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
