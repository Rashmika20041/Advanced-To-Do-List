import { useState, useEffect } from "react";
import NewList from "./NewList";
import { FaPlus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const List = () => {
  const [lists, setLists] = useState<{ name: string; color: string }[]>([]);
  const [showNewList, setShowNewList] = useState<boolean>(false);
  const [showDivider, setShowDivider] = useState<boolean>(true);
  const [formKey, setFormKey] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const maxList = 3;

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

    setError("");

    if (!showNewList) {
      setShowNewList(true);
      setShowDivider(false);
      setFormKey((prev) => prev + 1);
    }
    if (showNewList) {
      setShowDivider(true);
    }

    if (lists.length >= maxList) {
      setError(`You can only have a maximum of ${maxList} lists`);
      setShowNewList(false);
      setShowDivider(false);
      return;
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
        setShowDivider(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

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
          <div key={index} className="flex items-center gap-4 px-2 py-[2px] hover:border hover:border-x-2 border-gray-300 rounded">
            <div
              className="w-4 h-4 rounded-[4px] border border-gray-300"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm font-medium text-gray-700">
              {item.name}
            </span>
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
            <NewList onClose={handleCloseNewList} onAdd={handleAddListItem} />
          </motion.div>
        )}
      </AnimatePresence>

      {showDivider && <hr className="my-4 text-gray-200" />}
      {error && (
        <div className="mt-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md text-xs">
          {error}
        </div>
      )}
    </div>
  );
};

export default List;
