import { motion } from "framer-motion";

type SignoutProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const Signout = ({ onConfirm, onCancel }: SignoutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex justify-center items-center backdrop-blur bg-opacity-20 z-50"
    >
      <div
        className="bg-white rounded-lg p-6 shadow-lg w-90 border-2 border-gray-300 text-center"
        style={{ fontFamily: "Poppins" }}
      >
        <h2 className="text-lg font-semibold mb-4">Are you sure you want to log out?</h2>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="bg-[#faf700] text-black px-7 py-2 w-25 shadow-md rounded-md hover:bg-[#04AA6D]"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black px-7 py-2 w-25 shadow-md rounded hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Signout;
