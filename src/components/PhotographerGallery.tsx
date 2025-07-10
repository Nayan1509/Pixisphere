import { useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";

Modal.setAppElement("#__next"); // For accessibility

export default function PhotographerGallery({ images }: { images: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="my-6">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, i) => (
          <motion.div
            key={i}
            className="overflow-hidden rounded-lg shadow hover:shadow-lg cursor-pointer"
            initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => setSelected(src)}
          >
            <img
              src={src}
              alt={`Portfolio ${i}`}
              className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={!!selected}
        onRequestClose={() => setSelected(null)}
        className="fixed inset-0 flex items-center justify-center mt-10 bg-black/80 p-10 z-50"
        overlayClassName="fixed inset-0 bg-black/70 z-40"
      >
        <img
          src={selected ?? ""}
          alt="Full View"
          className="max-h-full max-w-full rounded-lg shadow-lg"
        />
        <button
          onClick={() => setSelected(null)}
          className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
        >
          &times;
        </button>
      </Modal>
    </div>
  );
}
