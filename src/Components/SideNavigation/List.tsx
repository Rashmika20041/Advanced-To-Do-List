import { useState } from "react";
import NewList from "./NewList";
import { FaPlus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

type TaskProps = {
  onTask: (name: string) => void;
}

const List = () => {

  const [lists, setLists] = useState<{ name: string; color: string }[]>([]);
  const [showNewList, setShowNewList] = useState(false);
  const [showDivider, setShowDivider] = useState(true);
  const [formKey, setFormKey] = useState(0);

  const handleNewList = () => {
    // setShowNewList((prev) => {
    //   if (prev) {
    //     setShowDivider(true);
    //     return false;
    //   } else {
    //     setShowDivider(false);
    //     setFormKey((prev) => prev + 1);
    //     return true;
    //   }
    // });

    if (!showNewList) {
      setShowNewList(true);
      setShowDivider(false);
      setFormKey((prev) => prev + 1);
    }
    if (showNewList) {
      setShowDivider(true);
    }
  };

  const handleCloseNewList = () => {
    setShowNewList(false);
  };

  const handleAddListItem = (name: string, color: string) => {
    if (name.trim() === "") return;
    setLists([{ name, color }, ...lists]);
    handleCloseNewList();
    setShowDivider(true);
  };

  return (
    <div>
      <h2
        className="text-xs font-semibold mb-3 text-gray-600"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Lists
      </h2>

       <div className="flex flex-col gap-2 mb-4">
        {lists.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-2 py-1"
          >
            <div
              className="w-4 h-4 rounded-[4px] border border-gray-300"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm font-medium text-gray-700">{item.name}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-row justify-left items-center px-2">
        <button
          className="md:text-sm font-medium text-gray-600 hover:text-[#11110f]"
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
            <NewList onClose={handleCloseNewList} onAdd={handleAddListItem}/>
          </motion.div>
        )}
      </AnimatePresence>

      {showDivider && <hr className="my-4 text-gray-200" />}
    </div>
  );
};

export default List;
