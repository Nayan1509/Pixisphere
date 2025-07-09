export default function PhotographerGallery({ images }: { images: string[] }) {
  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-2">Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Portfolio ${i}`}
            className="w-full h-48 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}
