interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ReviewSection({ reviews }: { reviews: Review[] }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Reviews</h2>
      {reviews.map((r, i) => (
        <div key={i} className="border-b py-2">
          <div className="flex justify-between">
            <p className="font-medium">{r.name}</p>
            <p className="text-yellow-500">⭐ {r.rating}</p>
          </div>
          <p className="text-sm text-gray-600">{r.comment}</p>
          <p className="text-xs text-gray-400">
            {new Date(r.date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
