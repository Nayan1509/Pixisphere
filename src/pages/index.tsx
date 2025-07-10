import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'

export default function Home() {
  const router = useRouter()

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center text-center relative overflow-hidden">
     
      <motion.div
        className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#D9A299] rounded-full opacity-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.h1
        className="text-5xl md:text-6xl font-bold text-[#954C2E] z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Welcome to Pixisphere
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 mt-4 max-w-xl z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Capture life's most cherished moments with best photographers.
        Maternity, weddings, birthdays & more.
      </motion.p>
      <motion.button
        onClick={() => router.push("/category")}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="group mt-10 px-6 py-3 border-[##954C2E] text-black rounded-full text-lg font-semibold shadow-md flex items-center relative overflow-hidden hover:shadow-[#954C2E] transition z-10"
      >

        <span className="transition-transform text-[#954C2E] duration-300 group-hover:-translate-x-2">
          Browse Photographers
        </span>
        <span className="ml-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
          <Camera size={20} />
        </span>
      </motion.button>
      <motion.div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#D9A299] rounded-full opacity-5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
      />
    </main>
  );
}
