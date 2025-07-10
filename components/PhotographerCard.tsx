import { Photographer } from "@/pages/category";
import { useRouter } from "next/router";

export default function PhotographerCard({
  photographer,
}: {
  photographer: Photographer;
}) {
  const router = useRouter();

  return (
    <div className="relative group overflow-hidden rounded-lg shadow hover:shadow-xl hover:shadow-[#D9A299] transition-transform duration-300 hover:scale-105 cursor-pointer">
      <img
        src={photographer.profilePic}
        alt={photographer.name}
        className="w-full h-100 object-cover transition-transform duration-500"
      />
      <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-sm text-white px-4 py-3 space-y-1">
        <h2 className="text-lg font-semibold">{photographer.name}</h2>
        <p className="text-sm">{photographer.location}</p>
        <p className="text-sm">₹{photographer.price} onwards</p>
        <p className="text-sm text-yellow-400">⭐ {photographer.rating}</p>

        <div className="flex flex-wrap gap-1 mt-1">
          {photographer.tags.map((tag) => (
            <span
              key={tag}
              className="bg-white/90 text-black text-xs px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => router.push(`/profile/${photographer.id}`)}
          className="mt-3 w-full bg-[#DCC5B2] text-white py-1.5 rounded hover:bg-[#D9A299] transition cursor-pointer"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
