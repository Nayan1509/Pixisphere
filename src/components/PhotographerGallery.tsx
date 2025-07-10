import { useState, useEffect } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-loading-skeleton/dist/skeleton.css";

Modal.setAppElement("#__next");

export default function PhotographerGallery({ images }: { images: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedIndex]);

  const closeModal = () => setSelectedIndex(null);
  const prevImage = () =>
    setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
  const nextImage = () =>
    setSelectedIndex((prev) => (prev! + 1) % images.length);

  return (
    <div className="my-6">

      {/* Masonry Layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {isLoading
          ? [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden break-inside-avoid"
              >
                <Skeleton
                  height={200 + (i % 3) * 40}
                  borderRadius={12}
                  className="w-full"
                />
              </div>
            ))
          : images.map((src, i) => (
              <motion.div
                key={i}
                className="mb-4 overflow-hidden rounded-lg shadow hover:shadow-lg cursor-pointer break-inside-avoid"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setSelectedIndex(i)}
              >
                <img
                  src={src}
                  loading="lazy"
                  alt={`Portfolio ${i}`}
                  className="w-full h-auto object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </motion.div>
            ))}
      </div>

      {/* Lightbox */}
      <Modal
        isOpen={selectedIndex !== null}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center p-4 z-[9999]"
        overlayClassName="fixed inset-0 bg-black/80 z-[9998]"
      >
        <div className="relative max-w-screen-lg w-full flex justify-center items-center">
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/10 z-50"
          >
            <ChevronLeft size={32} />
          </button>
          <img
            src={images[selectedIndex ?? 0]}
            alt="Full View"
            className="max-h-[80vh] max-w-full rounded-lg shadow-lg"
          />
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/10 z-50"
          >
            <ChevronRight size={32} />
          </button>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-50"
          >
            &times;
          </button>
        </div>
      </Modal>
    </div>
  );
}
