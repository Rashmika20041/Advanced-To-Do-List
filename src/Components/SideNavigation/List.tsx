import { useState } from "react";
import NewList from "./NewList";
import { FaPlus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const List = () => {
  const [showNewList, setShowNewList] = useState(false);
   const [formKey, setFormKey] = useState(0);

  const handleNewList = () => {
    setShowNewList(true);
     setFormKey(prev => prev + 1);
  };

  const handleCloseNewList = () => {
    setShowNewList(false);
  };

  return (
    <div>
      <h2
        className="text-base font-semibold mb-3 text-gray-600"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Lists
      </h2>

      <div className="flex flex-row justify-left items-center px-2">
        <button
          className="md:text-base font-medium text-gray-600 hover:text-[#11110f]"
          onClick={handleNewList}
        >
          <span className="flex flex-row items-center gap-4">
            <FaPlus />
            Add New Task
          </span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {showNewList && (
          <motion.div
           key={formKey} 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
          >
            <NewList onClose={handleCloseNewList} />
          </motion.div>
        )}
      </AnimatePresence>

      <hr className="my-4 text-gray-200" />
    </div>
  );
};

export default List;
