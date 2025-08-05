import "@fontsource/poppins/500.css";
import Navigation from "../SideNavigation/Navigation";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { MdUploadFile } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { auth } from "../../Firebase";

type StickyNote = {
  id: number;
  topic: string;
  description: string;
  color: string;
  isEditing: boolean;
  firestoreId?: string;
};

const sampleColors = [
  "#f6f6f6",
  "#fde68a",
  "#FF9EF7",
  "#a7f3d0",
  "#bfdbfe",
  "#fca5a5",
];

const StickyWall = () => {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showBorder, setShowBorder] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const notesPerPage = 3;
  const totalPages = Math.ceil(notes.length / notesPerPage);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "sticky"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedLists = snapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        return {
          id: Number(data.id) || Date.now(),
          topic: data.topic || "",
          description: data.description || "",
          color: data.color || "",
          isEditing: false,
          firestoreId: docSnapshot.id,
        };
      });

      setNotes(loadedLists);
      setShowBorder(loadedLists.length > 0);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddSticky = () => {
    const isEditingAny = notes.some((note) => note.isEditing);
    if (isEditingAny) {
      return;
    }

    const newNote: StickyNote = {
      id: Date.now(),
      topic: "",
      description: "",
      color: "#a7f3d0",
      isEditing: true,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setShowBorder(true);
    setCurrentPage(1);
  };

  const handleSave = async (id: number, note: StickyNote) => {
    if (note.topic.trim() === "" && note.description.trim() === "") {
      handleDelete(id);
      return;
    }

    try {
      setLoading(true);

      const user = auth.currentUser;
      if (!user) return;

      if (note.firestoreId) {
        const user = auth.currentUser;
        if (!user) return;
        await updateDoc(
          doc(db, "users", user.uid, "sticky", note.firestoreId),
          {
            topic: note.topic.trim(),
            description: note.description.trim(),
            color: note.color,
            updatedAt: new Date(),
          }
        );
      } else {
        const docRef = await addDoc(
          collection(db, "users", user.uid, "sticky"),
          {
            id: note.id.toString(),
            topic: note.topic.trim(),
            description: note.description.trim(),
            color: note.color,
            createdAt: new Date(),
          }
        );
        setNotes((prevNotes) =>
          prevNotes.map((n) =>
            n.id === id ? { ...n, firestoreId: docRef.id } : n
          )
        );
      }

      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === id ? { ...n, isEditing: false } : n))
      );
    } catch (error) {
      console.error("Error saving sticky note:", error);
      alert("Failed to save note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const noteToDelete = notes.find((note) => note.id === id);

    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);

    const newTotalPages = Math.ceil(updatedNotes.length / notesPerPage);

    if (currentPage > newTotalPages && currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }

    try {
      const user = auth.currentUser;
      if (!user) return;
      if (noteToDelete?.firestoreId) {
        await deleteDoc(
          doc(db, "users", user.uid, "sticky", noteToDelete.firestoreId)
        );
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

      const remainingNotes = notes.filter((note) => note.id !== id);
      if (remainingNotes.length === 0) {
        setShowBorder(false);
      }
    } catch (error) {
      console.error("Error deleting sticky note:", error);
      alert("Failed to delete note. Please try again.");
    }
  };

  const handleNoteClick = (id: number) => {
    const isEdit = notes.some((note) => note.isEditing);
    if (isEdit) {
      return;
    }

    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, isEditing: true } : note))
    );
  };

  const handleFieldChange = (
    id: number,
    field: "topic" | "description" | "color",
    value: string
  ) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, [field]: value } : note))
    );
  };

  const currentNotes = notes.slice(
    (currentPage - 1) * notesPerPage,
    currentPage * notesPerPage
  );

  return (
    <div className="flex pl-5 pt-5">
      <Navigation today={0} upcoming={0} />
      <div className="flex flex-col pl-[280px]">
        <div className="flex flex-row justify-left items-center pl-6 h-14">
          <h1
            className="md:text-4xl font-bold text-gray-800"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Sticky Wall
          </h1>
          <div className="flex justify-center items-center ml-7 border-1 border-gray-300 rounded-[10px] w-10 h-10">
            <h1
              className="md:text-3xl text-gray-800"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {notes.length}
            </h1>
          </div>
        </div>

        <div className="py-3 px-6">
          <div className="mt-2">
            <button
              className="flex flex-row justify-left w-233 items-center mt-2 md:text-sm text-gray-400 hover:text-[#11110f] select-none border-1 border-gray-200 hover:border-gray-400 rounded-[8px] h-12 px-5"
              onClick={handleAddSticky}
            >
              <span className="flex flex-row items-center gap-3">
                <FaPlus />
                Add Sticky Note
              </span>
            </button>
          </div>
        </div>

        <div
          className="flex flex-col justify-center items-center px-5 py-2"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {showBorder && (
            <div className="p-7 grid md:grid-cols-3 sm:grid-cols-1 gap-7 border-1 border-gray-200 rounded-[7px]">
              {currentNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => handleNoteClick(note.id)}
                  style={{ backgroundColor: note.color }}
                  className="group flex flex-col border-1 shadow-xl hover:shadow-2xl border-gray-300 rounded-md w-68 h-72 p-4 cursor-pointer"
                >
                  {note.isEditing ? (
                    <>
                      <div className="flex flex-row items-center justify-between">
                        <input
                          value={note.topic}
                          onChange={(e) =>
                            handleFieldChange(note.id, "topic", e.target.value)
                          }
                          placeholder="Topic"
                          className="bg-transparent font-bold text-lg outline-none w-5/6"
                          disabled={loading}
                        />
                        <MdDeleteForever
                          className="group-hover:block hidden text-2xl hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(note.id);
                          }}
                        />
                      </div>
                      <textarea
                        value={note.description}
                        onChange={(e) =>
                          handleFieldChange(
                            note.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Description..."
                        className="bg-transparent mt-2 text-sm outline-none resize-none h-full"
                        disabled={loading}
                      />
                      <div className="flex flex-row justify-center items-center gap-2 mt-3">
                        {sampleColors.map((c) => (
                          <div
                            key={c}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFieldChange(note.id, "color", c);
                            }}
                            className="w-5 h-5 rounded-[50%] cursor-pointer border border-gray-400"
                            style={{ backgroundColor: c }}
                          ></div>
                        ))}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSave(note.id, note);
                          }}
                          className="font-bold text-3xl pl-11 py-1 text-gray-700 hover:text-gray-400"
                        >
                          <span>
                            <MdUploadFile />
                          </span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-row items-center justify-between">
                        <h2 className="font-bold text-lg select-none">
                          {note.topic}
                        </h2>
                      </div>
                      <pre
                        className="text-sm text-gray-700 mt-2 select-none whitespace-pre-wrap"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {note.description}
                      </pre>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {notes.length > notesPerPage && (
            <div className="flex justify-center mt-2 gap-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border md:text-sm border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50"
              >
                <FaArrowLeft />
              </button>
              <span className="text-gray-700 text-xs mt-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 md:text-sm border border-gray-400 rounded hover:bg-gray-200 disabled:opacity-50"
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default StickyWall;
