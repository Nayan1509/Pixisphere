import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getPhotographerById } from "@/utils/api";
import PhotographerGallery from "@/components/PhotographerGallery";
import ReviewSection from "@/components/ReviewSection";
import InquiryModal from "@/components/InquiryModal";

export default function ProfilePage() {
  const { id } = useRouter().query;
  const [profile, setProfile] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      getPhotographerById(Number(id)).then((res) => setProfile(res.data));
    }
  }, [id]);

  if (!profile)
    return (
      <p className="p-6 text-center text-gray-500 text-lg animate-pulse">
        Loading profile...
      </p>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="bg-white flex flex-col md:flex-row items-center gap-8 rounded-xl shadow-md p-6">
        {/* Profile Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={profile.profilePic}
            alt={profile.name}
            className="w-48 h-48 object-cover rounded-full border-4 border-[#E7473C] shadow"
          />
        </div>

        {/* Profile Details */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold text-[#E7473C] mb-1">
            {profile.name}
          </h1>
          <p className="text-gray-600 text-sm mb-4">{profile.bio}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-700">
            <div>
              <span className="font-medium text-gray-900">📍 Location:</span>{" "}
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
          </div>
        </div>
      </div>

      {/* Portfolio Gallery */}
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-[#E7473C]">
          Portfolio
        </h2>
        <PhotographerGallery images={profile.portfolio} />
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-[#E7473C]">Reviews</h2>
        <ReviewSection reviews={profile.reviews} />
      </div>

      {/* Inquiry CTA */}
      <div className="text-center">
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 px-6 py-3 bg-[#E7473C] text-white text-lg rounded-full shadow hover:bg-red-600 transition"
        >
          📩 Send Inquiry
        </button>
      </div>

      {/* Modal */}
      {showModal && <InquiryModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
