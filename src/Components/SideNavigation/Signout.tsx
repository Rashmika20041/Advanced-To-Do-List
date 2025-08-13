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
        className="bg-white rounded-lg px-4 py-10 md:px-30 md:py-15 shadow-lg md:w-150 border-2 border-gray-300 text-center"
        style={{ fontFamily: "Poppins" }}
      >
        <h2 className="text-md md:text-xl font-semibold mb-4">Are you sure you want to log out?</h2>
        <div className="flex justify-around mt-8">
          <button
            onClick={onConfirm}
            className="bg-[#faf700] text-black px-7 py-2 w-20 md:w-31 md:h-11 shadow-md rounded-md hover:bg-[#04AA6D] hover:scale-104 transition-colors duration-300 ease-in-out"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black px-7 py-2 w-20 md:w-32 md:h-11 shadow-md rounded hover:bg-gray-400 hover:scale-104 transition-colors duration-300 ease-in-out"
          >
            No
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Signout;
