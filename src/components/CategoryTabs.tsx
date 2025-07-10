import { useRouter } from "next/router";

const categories = [
  "All",
  "Maternity",
  "Newborn",
  "Birthday",
  "Wedding",
  "Pre-wedding",
  "Family",
  "Couple",
];

export default function CategoryTabs() {
  const router = useRouter();
  const selected =
    typeof router.query.tag === "string" ? router.query.tag.toLowerCase() : "";

  const handleClick = (tag: string) => {
    if (tag === "All") {
      router.push("/category");
    } else {
      router.push(`/category?tag=${tag}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`px-4 py-1.5 rounded-full border transition text-sm cursor-pointer ${
            selected === cat.toLowerCase() || (!selected && cat === "All")
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
