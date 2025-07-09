import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const { id } = useRouter().query;
  const [photographer, setPhotographer] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/photographers/${id}`)
        .then((res) => setPhotographer(res.data));
    }
  }, [id]);

  if (!photographer) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{photographer.name}</h1>
      <p className="text-gray-600 mb-4">{photographer.bio}</p>

      <div className="mb-4">
        <strong>Styles:</strong> {photographer.styles.join(", ")}
        <br />
        <strong>Tags:</strong> {photographer.tags.join(", ")}
        <br />
        <strong>Location:</strong> {photographer.location}
        <br />
        <strong>Price:</strong> ₹{photographer.price}
        <br />
        <strong>Rating:</strong> {photographer.rating} ⭐
      </div>

      {/* Add Gallery and Reviews here */}
    </div>
  );
}
