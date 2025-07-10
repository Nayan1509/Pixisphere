import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'


export default function Home() {
  const router = useRouter()

  return (
    <main className="h-screen w-full bg-[#F0F0F0] flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background Accent Circle */}
      <motion.div
        className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#E7473C] rounded-full opacity-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Heading */}
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-[#E7473C] z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Welcome to Pixisphere
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className="text-lg text-gray-600 mt-4 max-w-xl z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Capture life's most cherished moments with best photographers.
        Maternity, weddings, birthdays & more.
      </motion.p>

      {/* Button */}
      <motion.button
        onClick={() => router.push("/category")}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="group mt-10 px-6 py-3 border-[#E7473C] text-black rounded-full text-lg font-semibold shadow-md flex items-center relative overflow-hidden hover:shadow-[#cc3d33] transition z-10"
      >
        {/* Text shifts left */}
        <span className="transition-transform duration-300 group-hover:-translate-x-2">
          Browse Photographers
        </span>

        {/* Icon hidden by default, fades + slides in on hover */}
        <span
          className="ml-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out"
        >
          <Camera size={20} />
        </span>
      </motion.button>

      {/* Bottom Fade or Accent */}
      <motion.div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#E7473C] rounded-full opacity-5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
      />
    </main>
  );
}
