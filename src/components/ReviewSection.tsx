export default function ReviewSection({
  reviews,
}: {
  reviews: {
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500 text-sm">No reviews yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
        >
          <div className="flex gap-4 items-center">
            <div className="w-8 h-8 rounded-full bg-[#DCC5B2] text-white flex items-center justify-center">
              A
            </div>
            <div className="mb-2">
              <h3 className="text-base font-semibold text-[#954C2E]">
                {review.name}
              </h3>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          </div>

          <div className="flex items-center text-yellow-500 text-sm mb-2">
            {"⭐".repeat(Math.floor(review.rating))}
            {review.rating % 1 !== 0 ? "½" : ""}
            <span className="ml-2 text-gray-600">{review.rating}</span>
          </div>

          <p className="text-sm text-gray-700 mt-1">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
