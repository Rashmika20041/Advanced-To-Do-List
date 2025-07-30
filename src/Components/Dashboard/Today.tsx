import "@fontsource/poppins/500.css";
import { FaPlus, FaAngleRight } from "react-icons/fa6";
import Navigation from "../SideNavigation/Navigation";
import { FaCalendarTimes } from "react-icons/fa";
import Task from "../Tasks/Task";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const example = [
  {
    id: 1,
    title: "Completea the project report",
    description:
      "Finish the final touches on the project report before submission.",
    dueDate: "2023-10-15",
    color: "#FF5733",
    List: "Work",
  },
  {
    id: 2,
    title: "Prepare for the team meeting",
    description:
      "Gather all necessary documents and prepare the agenda for the meeting.",
    dueDate: "2023-10-16",
    color: "#33FF57",
    List: "Personal",
  },
];

const Today = () => {
  const [tasks, showTasks] = useState<boolean>(false);
  const [borderWidth, setBorderWidth] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<number>();
  const [color, setColor] = useState<string>("");
  const [listname, setListName] = useState<string>("");


  const newTask = () => {
    if (!tasks) {
      showTasks(true);
      setBorderWidth(true);
    }
  };

  const handleClose = () => {
    showTasks(false);
  };

  const handleExitComplete = () => {
    setBorderWidth(false);
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
        <div className="mt-5">
          <div className="mt-2">
            <button
              className={`flex flex-row justify-left w-233 ${
                borderWidth ? "w-[572px]" : "w-233"
              } items-center mt-2 md:text-sm text-gray-400 hover:text-[#11110f] select-none border border-gray-200 hover:border-gray-400 rounded-[8px] h-12 px-5`}
              onClick={newTask}
            >
              <span className="flex flex-row items-center gap-3">
                <FaPlus />
                Add New Task
              </span>
            </button>
          </div>
        </div>

        {example.map((item, index) => (
        <div key={index}>
          <div className="flex flex-row justify-center gap-3 pl-5 items-center mt-2">
            <div>
              <input
                type="checkbox"
                className="w-[15px] h-[15px] border border-gray-400 rounded-sm"
              />
            </div>
            <div>
              <h1
                className="md:text-[12px] text-gray-800 font-normal"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {item.title}
              </h1>
              <p
                className="md:text-[11px] text-gray-500 font-normal"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {item.description}
              </p>
            </div>
            <div className="flex flex-row justify-end ml-auto">
              <FaAngleRight className="text-gray-400 text-lg" />
            </div>
          </div>
          <div className="flex flex-row justify-start gap-3 pl-12 items-center mt-2">
            <div className="flex flex-row gap-2">
              <FaCalendarTimes className="text-gray-500 text-xs" />
              <span
                className="md:text-[11px] text-gray-800 font-normal"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {item.dueDate}
              </span>
            </div>
            <div>
              <div className=" h-5 w-[2px] bg-gray-200 mx-2"></div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-[4px] border border-gray-300"
                style={{ backgroundColor: item.color }}
              ></div>
              <span
                className="text-[11px] font-semibold text-gray-700"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {item.List}
              </span>
            </div>
          </div>
          <div>
            <hr className="my-2 text-gray-200 border-t-2" />
          </div>
        </div>
        ))}

      </div>
      <AnimatePresence onExitComplete={handleExitComplete}>
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
