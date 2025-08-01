import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { collection, getDocs,} from "firebase/firestore";
import { db } from "../../Firebase";

type TaskProps = {
  onClose: () => void;
};

const Task = ({ onClose }: TaskProps) => {
  const [list, setLists] = useState<{ name: string }[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchLists();
    const intervalId = setInterval(() => {
      fetchLists();
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchLists = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "lists"));
      const loadedLists = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
        };
      });
      setLists(loadedLists);
    } catch (e) {
      console.error("Error fetching lists: ", e);
    }
  };

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
            className="md:text-sm font-sm text-gray-800 placeholder:text-gray-500 outline-none bg-transparent select-none"
            type="text"
            placeholder="Task..."
          />
        </div>
        <div className="flex flex-col border-1 border-gray-200 rounded-md w-75 h-30 py-3 px-2 mt-4">
          <textarea
            placeholder="Description"
            className="text-sm resize-none text-gray-800 placeholder:text-gray-500 h-full bg-transparent outline-none select-none"
          />
        </div>
        <div className="flex flex-col mt-5">
          <div className="flex flex-row justify-between items-center gap-15 mb-3">
            <h2
              className="text-xs font-semibold mb-1 text-gray-600"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Task
            </h2>
            <div className="w-64">
              <select className="w-[100px] h-[30px] border border-gray-300 rounded-md px-3 text-sm focus:outline-none">
                {list.map((item) => (
                  <option key={item.name} value={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-5 mb-2">
            <h2
              className="text-xs font-semibold mb-1 text-gray-600"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Due Date
            </h2>
            <div className="w-53">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="w-[100px] h-[30px] border border-gray-300 rounded-md px-3 text-xs focus:outline-none"
                placeholderText="Select date"
              />
            </div>
          </div>
          <div className="absolute flex flex-row justify-between gap-5 bottom-5">
            <button className="border-1 border-gray-400 rounded-md py-2 px-8 bg-transparent font-semibold text-gray-500 hover:text-gray-900 text-xs">
              Delete Task
            </button>
            <button className="rounded-md py-2 px-7 bg-[#FFE100] font-semibold text-xs hover:bg-[#FFD000]">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
