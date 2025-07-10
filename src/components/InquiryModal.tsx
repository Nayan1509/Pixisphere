import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function InquiryModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const validate = () => {
    const isValidEmail = /\S+@\S+\.\S+/.test(form.email);
    const errs = {
      name: form.name.trim() === "",
      email: !isValidEmail,
      message: form.message.trim() === "",
    };
    setErrors(errs);
    return !Object.values(errs).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      toast.success("Inquiry sent successfully!");
      setForm({ name: "", email: "", message: "" });
      onClose();
    } else {
      toast.error("Please fill all fields correctly.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
      >
        <h2 className="text-2xl font-bold text-[#954C2E] mb-4">Send Inquiry</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`w-full px-4 py-2 rounded border ${
                errors.name ? "border-[#954C2E]" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#954C2E]`}
            />
            {errors.name && (
              <p className="text-sm text-[#954C2E] mt-1">Name is required.</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`w-full px-4 py-2 rounded border ${
                errors.email ? "border-[#954C2E]" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#954C2E]`}
            />
            {errors.email && (
              <p className="text-sm text-[#954C2E] mt-1">
                Enter a valid email.
              </p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className={`w-full px-4 py-2 rounded border ${
                errors.message ? "border-[#954C2E]" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#954C2E]`}
            ></textarea>
            {errors.message && (
              <p className="text-sm text-[#954C2E] mt-1">
                Message cannot be empty.
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#954C2E] text-white rounded hover:bg-[#954C2E] transition cursor-pointer"
            >
              Send
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
