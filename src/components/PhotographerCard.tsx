import { Photographer } from "@/pages/category";
import { useRouter } from "next/router";

export default function PhotographerCard({
  photographer,
}: {
  photographer: Photographer;
}) {
  const router = useRouter();

  return (
    <div className="group [perspective:1000px] w-full h-80">
      <div className="relative w-full h-full transition transform hover:scale-105 duration-500 rounded-lg shadow hover:shadow-xl hover:shadow-[#E7473C]">
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden">
          <img
            src={photographer.profilePic}
            alt={photographer.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-sm text-white px-4 py-2">
            <h2 className="text-lg font-semibold">{photographer.name}</h2>
            <p className="text-sm text-white">{photographer.location}</p>
            <p className="text-sm text-white mt-1">
              ₹{photographer.price} onwards
            </p>
            <p className="text-sm text-yellow-500">⭐ {photographer.rating}</p>

            <div className="flex flex-wrap gap-1 mt-2">
              {photographer.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 text-xs px-2 py-0.5 rounded text-black"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => router.push(`/profile/${photographer.id}`)}
              className="mt-4 w-full bg-[#E7473C] text-white py-1.5 rounded hover:bg-red-700"
            >
              View Profile
            </button>
          </div>
        </div>

        {/* Back Side */}
        {/* <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white p-4 flex flex-col justify-center items-center rounded-lg">
          <h2 className="text-lg font-semibold">{photographer.name}</h2>
          <p className="text-sm text-gray-500">{photographer.location}</p>
          <p className="text-sm text-gray-700 mt-1">
            ₹{photographer.price} onwards
          </p>
          <p className="text-sm text-yellow-500">⭐ {photographer.rating}</p>

          <div className="flex flex-wrap gap-1 mt-2">
            {photographer.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 text-xs px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => router.push(`/profile/${photographer.id}`)}
            className="mt-4 w-full bg-[#E7473C] text-white py-1.5 rounded hover:bg-red-700"
          >
            View Profile
          </button>
        </div> */}
      </div>
    </div>
  );
}
