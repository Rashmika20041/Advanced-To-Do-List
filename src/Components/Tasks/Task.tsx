import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../Firebase";
import MyDropdown from "./MyDropdown";
import { auth } from "../../Firebase";

type TaskProps = {
  onClose: () => void;
  taskToEdit?: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    name: string;
    color: string;
  } | null;
};

const Task = ({ onClose, taskToEdit }: TaskProps) => {
  const [lists, setLists] = useState<
    { id: string; name: string; color: string }[]
  >([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [taskList, setTaskList] = useState<{
    id: string;
    name: string;
    color: string;
  } | null>(null);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(new Date(taskToEdit.dueDate));
      setTaskList({
        id: taskToEdit.id,
        name: taskToEdit.name,
        color: taskToEdit.color,
      });
      setIsEditMode(true);
    }
  }, [taskToEdit]);

  useEffect(() => {
    fetchLists();
    const intervalId = setInterval(() => {
      fetchLists();
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchLists = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const querySnapshot = await getDocs(
        collection(db, "users", user.uid, "lists")
      );
      const loadedLists = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          color: data.color,
        };
      });
      setLists(loadedLists);
    } catch (e) {
      console.error("Error fetching lists: ", e);
    }
  };

  const handleSaveChanges = async () => {
    if (title.trim() === "" || !taskList || !dueDate) {
      setError("All fields are required");
      return;
    }
    const user = auth.currentUser;
        if (!user) return;

    if (isEditMode && taskToEdit) {
      try {
        const docRef = doc(db, "users", user.uid, "tasks", taskToEdit.id);
      await updateDoc(docRef, {
        title: title.trim(),
        description: description.trim(),
        listName: taskList.name,
        listColor: taskList.color,
        listId: taskList.id,
        dueDate: dueDate,
        completed: false,
        updatedAt: serverTimestamp(),
      });
      onClose();
      } catch (error) {
        console.error("Error updating document:", error);
      }
    } else {
      try {

        const docRef = await addDoc(
          collection(db, "users", user.uid, "tasks"),
          {
            title: title.trim(),
            description: description.trim(),
            listName: taskList.name,
            listColor: taskList.color,
            listId: taskList.id,
            dueDate: dueDate,
            completed: false,
            createdAt: serverTimestamp(),
          }
        );
        console.log("Document written with ID: ", docRef.id);
        setError("");
        onClose();
      } catch (error) {
        console.error("Error adding document:", error);
        setError("Failed to add task");
      } finally {
        setTitle("");
        setDescription("");
        setTaskList(null);
        setDueDate(null);
      }
    }
  };

  return (
    <div
      className="fixed flex flex-col w-85 bg-[#f2f2f2] text-gray-800 rounded-[10px] h-screen max-h-[calc(100vh-2.5rem)] overflow-y-auto px-5 py-3"
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col border-1 border-gray-200 rounded-md w-75 h-30 py-3 px-2 mt-4">
          <textarea
            placeholder="Description"
            className="text-sm resize-none text-gray-800 placeholder:text-gray-500 h-full bg-transparent outline-none select-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-5">
          <div className="flex flex-row items-center gap-15 mb-3">
            <h2
              className="text-xs font-semibold mb-1 text-gray-600"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Task
            </h2>
            <MyDropdown
              list={lists}
              value={
                taskList
                  ? {
                      value: taskList.id,
                      label: taskList.name,
                      color: taskList.color,
                    }
                  : null
              }
              onChange={(selectedOption) => {
                const selectedList = lists.find(
                  (list) => list.id === selectedOption.value
                );
                setTaskList(selectedList || null);
              }}
            />
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
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                dateFormat="yyyy-MM-dd"
                className="w-[100px] h-[30px] border border-gray-300 rounded-md px-3 text-xs focus:outline-none"
                placeholderText="Select date"
              />
            </div>
          </div>
          {error && (
            <div className="mt-3 p-2 text-red-700 text-xs">{error}</div>
          )}
          <div className="absolute bottom-5 bg-[#FFE100] hover:bg-[#FFD000] rounded-md w-8/9 flex justify-center items-center">
            <button
              className="py-2 px-4  font-semibold text-xs"
              onClick={() => handleSaveChanges()}
            >
              {isEditMode ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
