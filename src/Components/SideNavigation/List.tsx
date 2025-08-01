import { useState, useEffect } from "react";
import NewList from "./NewList";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../Firebase";

const List = () => {
  const [lists, setLists] = useState<
    { id: string; name: string; color: string }[]
  >([]);
  const [showNewList, setShowNewList] = useState<boolean>(false);
  const [showDivider, setShowDivider] = useState<boolean>(true);
  const [formKey, setFormKey] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const maxList = 3;

  const handleNewList = () => {
    setError("");

    if (!showNewList) {
      if (lists.length >= maxList) {
        setError(`You can only have a maximum of ${maxList} lists`);
        setShowNewList(false);
        setShowDivider(false);
        return;
      }
      setShowNewList(true);
      setShowDivider(false);
      setFormKey((prev) => prev + 1);
    }
    if (showNewList) {
      setShowDivider(true);
      setShowNewList(false);
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

  useEffect(() => {
    fetchLists();
    const intervalId = setInterval(() => {
      fetchLists();
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchLists = async () => {
    try {
      const q = query(collection(db, "lists"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const newLists = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as { name: string; color: string }),
      }));

      setLists(newLists);
    } catch (e) {
      console.error("Error fetching lists: ", e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "lists", id));
      console.log("Document deleted with ID:", id);
      fetchLists();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleAddListItem = async (name: string, color: string) => {
    if (name.trim() === "") return;
    try {
      const docRef = await addDoc(collection(db, "lists"), {
        name,
        color,
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      await fetchLists();
      handleCloseNewList();
      setShowDivider(true);
    } catch (error) {
      console.error("Error adding list to Firestore:", error);
      setError("Failed to add list");
    }
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
        {lists.map((item) => (
          <div
            key={item.id}
            className="group flex items-center justify-between gap-4 px-2 py-[2px]"
          >
            <div className="flex flex-row items-center gap-4">
              <div
                className="w-4 h-4 rounded-[4px] border border-gray-300"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {item.name}
              </span>
            </div>
            <div className="flex items-center">
              <button
                className="text-gray-500 hover:text-red-600 transition-colors duration-200 hidden group-hover:flex"
                onClick={() => handleDelete(item.id)}
              >
                <MdDeleteForever className="text-xl" />
              </button>
              <div className="flex justify-center items-center ml-7 bg-gray-200 rounded-[4px] w-7 h-5">
                <p
                  className="md:text-xs text-gray-800 font-semibold"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  1
                </p>
              </div>
            </div>
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
