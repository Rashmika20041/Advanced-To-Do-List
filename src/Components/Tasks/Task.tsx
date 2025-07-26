import { IoClose } from "react-icons/io5";
import { use, useEffect, useState } from "react";
import NewList from "../SideNavigation/NewList";

type TaskProps = {
  onClose: () => void;
};

const Task = ({ onClose }: TaskProps) => {
  const [list, setList] = useState<{ name: string }[]>([]);

  return (
    <div
      className="relative flex flex-col w-85 bg-[#f2f2f2] text-gray-800 rounded-[10px] h-screen max-h-[calc(100vh-2.5rem)] overflow-y-auto px-5 py-3"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="flex flex-row justify-between items-center mb-4">
        <h1
          className="text-lg font-bold"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Tasks:
        </h1>
        <IoClose
          className="text-2xl text-gray-800 hover:text-gray-900"
          onClick={onClose}
        />
      </div>
      <div>
        <div className="flex flex-row justify-left items-center h-10 mt-2 border-1 border-gray-200 rounded-[5px] px-2">
          <input
            className="md:text-sm font-sm text-gray-800 placeholder:text-gray-400 outline-none bg-transparent select-none"
            type="text"
            placeholder="Task..."
          />
        </div>
        <div className="flex flex-col border-1 border-gray-200 rounded-md w-75 h-35 py-3 px-2 mt-3">
          <textarea
            placeholder="Description"
            className="text-sm resize-none text-gray-800 placeholder:text-gray-400 h-full bg-transparent outline-none select-none"
          />
        </div>
        <div className="flex flex-col mt-5">
          <div className="flex flex-row justify-between items-center gap-15 mb-2">
            <h2
              className="text-xs font-semibold mb-1 text-gray-600"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Task
            </h2>
            <div className="w-64">
              <select className="w-[150px] h-[30px] border border-gray-300 rounded-md px-3 text-sm focus:outline-none">
                {list.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
