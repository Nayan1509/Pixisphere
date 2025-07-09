export default function InquiryModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Send Inquiry</h2>
        <form className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 rounded px-3 py-2"
          />
          <textarea
            placeholder="Message"
            className="border border-gray-300 rounded px-3 py-2"
            rows={4}
          ></textarea>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
