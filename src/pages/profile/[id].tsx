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

  if (!profile) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
      <p className="text-gray-600 mb-4">{profile.bio}</p>
      <div className="mb-4">
        <strong>Styles:</strong> {profile.styles.join(", ")}
        <br />
        <strong>Tags:</strong> {profile.tags.join(", ")}
        <br />
        <strong>Location:</strong> {profile.location}
        <br />
        <strong>Price:</strong> ₹{profile.price}
        <br />
        <strong>Rating:</strong> {profile.rating} ⭐
      </div>
      <PhotographerGallery images={profile.portfolio} />
      <ReviewSection reviews={profile.reviews} />
      <button
        onClick={() => setShowModal(true)}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Send Inquiry
      </button>
      {showModal && <InquiryModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
