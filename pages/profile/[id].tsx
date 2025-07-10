import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getPhotographerById } from "@/utils/api";
import PhotographerGallery from "@/components/PhotographerGallery";
import ReviewSection from "@/components/ReviewSection";
import InquiryModal from "@/components/InquiryModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProfilePage() {
  const { id } = useRouter().query;
  const [profile, setProfile] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      getPhotographerById(Number(id)).then((res) => setProfile(res.data));
    }
  }, [id]);

  const isLoading = !profile;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="bg-[#F0E4D3] flex flex-col md:flex-row items-center gap-8 rounded-xl shadow-md p-6">
        <div className="w-full md:w-1/3 flex justify-center">
          {isLoading ? (
            <Skeleton circle width={192} height={192} />
          ) : (
            <img
              src={profile.profilePic}
              alt={profile.name}
              className="w-48 h-48 object-cover rounded-full border-4 border-[#954C2E] shadow"
            />
          )}
        </div>

        {/* Profile Details */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold text-[#954C2E] mb-1">
            {isLoading ? <Skeleton width={200} /> : profile.name}
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            {isLoading ? <Skeleton count={2} /> : profile.bio}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-700">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <Skeleton key={i} height={16} className="w-3/4" />
              ))
            ) : (
              <>
                <div>
                  <span className="font-medium text-gray-900">
                    📍 Location:
                  </span>{" "}
                  {profile.location}
                </div>
                <div>
                  <span className="font-medium text-gray-900">💰 Price:</span> ₹
                  {profile.price}
                </div>
                <div>
                  <span className="font-medium text-gray-900">⭐ Rating:</span>{" "}
                  {profile.rating}
                </div>
                <div>
                  <span className="font-medium text-gray-900">🎨 Styles:</span>{" "}
                  {profile.styles.join(", ")}
                </div>
                <div className="sm:col-span-2">
                  <span className="font-medium text-gray-900">🏷️ Tags:</span>{" "}
                  {profile.tags.join(", ")}
                </div>
                <div className="text-center">
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 px-2 py-2 border border-[#954C2E] text-[#954C2E] cursor-pointer font-bold rounded-full shadow hover:bg-[#DCC5B2] hover:text-white transition"
                  >
                    📩 Send Inquiry
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Portfolio Gallery */}
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-[#954C2E]">
          Portfolio
        </h2>
        <PhotographerGallery images={profile?.portfolio || []} />
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-[#954C2E]">Reviews</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 rounded-lg shadow bg-white">
                <Skeleton height={20} width="40%" />
                <Skeleton height={16} width="30%" className="my-2" />
                <Skeleton count={2} />
              </div>
            ))}
          </div>
        ) : (
          <ReviewSection reviews={profile.reviews} />
        )}
      </div>

      {/* Inquiry Modal */}
      {showModal && <InquiryModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
