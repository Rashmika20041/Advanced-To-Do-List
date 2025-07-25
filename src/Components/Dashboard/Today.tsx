import "@fontsource/poppins/500.css";
import { FaPlus } from "react-icons/fa6";
import Navigation from "../SideNavigation/Navigation";
import Task from "../Tasks/Task";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Today = () => {
  const [tasks, showTasks] = useState(false);
  const newTask = () => {
    if (!tasks) {
      showTasks(true);
    }
  };

  const handleClose = () => {
    showTasks(false);
  };

  return (
    <div className="flex pl-5 pr-5 pt-5 overflow-x-hidden">
      <Navigation />
      <div className="pl-6">
        <div className="flex flex-row justify-left items-center h-14">
          <h1
            className="md:text-4xl font-bold text-gray-800"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Today
          </h1>
          <div className="flex justify-center items-center ml-7 border-1 border-gray-300 rounded-[10px] w-10 h-10">
            <h1
              className="md:text-3xl text-gray-800"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              5
            </h1>
          </div>
        </div>
        <div className="py-3">
          <div className="flex flex-row justify-left items-center h-10 mt-2 border-1 border-gray-200 rounded-[8px] px-5">
            <button
              className="md:text-sm text-gray-400 hover:text-[#11110f] select-none"
              onClick={newTask}
            >
              <span className="flex flex-row items-center gap-3">
                <FaPlus />
                Add New Task
              </span>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {tasks && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className={`ml-auto ${tasks ? "block" : "hidden"}`}
          >
            <Task onClose={handleClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Today;
