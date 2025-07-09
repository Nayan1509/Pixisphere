import { Photographer } from "@/pages/category";
import { useRouter } from "next/router";

export default function PhotographerCard({
  photographer,
}: {
  photographer: Photographer;
}) {
  const router = useRouter();
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden transition hover:scale-105 duration-200">
      <img
        src={photographer.profilePic}
        alt={photographer.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{photographer.name}</h2>
        <p className="text-sm text-gray-500">{photographer.location}</p>
        <p className="text-sm text-gray-700 mt-1">
          ₹{photographer.price} onwards
        </p>
        <p className="text-sm text-yellow-500">⭐ {photographer.rating}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {photographer.tags.map((tag) => (
            <span key={tag} className="bg-gray-200 text-xs px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={() => router.push(`/profile/${photographer.id}`)}
          className="mt-4 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
