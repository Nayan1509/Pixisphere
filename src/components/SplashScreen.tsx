import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [flash, setFlash] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFlash(true), 1000); // camera flash
    const timer2 = setTimeout(() => setDone(true), 1800); // show text
    const timer3 = setTimeout(() => onComplete(), 3000); // exit splash
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-white"
          >
            <Camera size={72} strokeWidth={1.5} className="text-white" />
          </motion.div>

          {flash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-white z-10"
              transition={{ duration: 0.1 }}
            ></motion.div>
          )}
        </motion.div>
      )}

      {done && (
        <motion.div
          className="fixed inset-0 bg-white flex items-center justify-center z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 180 }}
            className="text-4xl font-bold text-black font-serif"
          >
            Pixisphere
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
