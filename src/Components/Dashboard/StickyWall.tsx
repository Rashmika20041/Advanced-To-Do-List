import "@fontsource/poppins/500.css";
import Navigation from "../SideNavigation/Navigation";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { MdSaveAlt } from "react-icons/md";

type StickyNote = {
  id: number;
  topic: string;
  description: string;
  color: string;
  isEditing: boolean;
};

const sampleColors = ["#f6f6f6", "#fde68a", "#FF9EF7", "#bfdbfe", "#fca5a5"];

const StickyWall = () => {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showBorder, setShowBorder] = useState(false);
  const notesPerPage = 3;
  const totalPages = Math.ceil(notes.length / notesPerPage);

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
    setNotes([newNote, ...notes]);
    setShowBorder(true);
    setCurrentPage(1);
  };

  const handleSave = (id: number) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          if (note.topic.trim() === "" && note.description.trim() === "") {
            return note;
          }
          return { ...note, isEditing: false };
        }
        return note;
      });
    });
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
      <Navigation />
      <div
        className="flex flex-col"
      >
        <div className="flex flex-row justify-left items-center pl-6 h-14">
          <h1 className="md:text-4xl font-bold text-gray-800" style={{ fontFamily: "Poppins, sans-serif" }}>Sticky Wall</h1>
        </div>

        <div className="py-3 px-6">
          <div className="mt-2">
            <button
              className="flex flex-row justify-left w-233 items-center mt-2 md:text-sm text-gray-400 hover:text-[#11110f] select-none border-1 border-gray-200 hover:border-gray-400 rounded-[8px] h-10 px-5"
              onClick={handleAddSticky}
            >
              <span className="flex flex-row items-center gap-3">
                <FaPlus />
                Add New Task
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
                  className="flex flex-col border-1 shadow-xl hover:shadow-2xl border-gray-300 rounded-md w-68 h-72 p-4 cursor-pointer"
                >
                  {note.isEditing ? (
                    <>
                      <input
                        value={note.topic}
                        onChange={(e) =>
                          handleFieldChange(note.id, "topic", e.target.value)
                        }
                        placeholder="Topic"
                        className="bg-transparent font-bold text-lg outline-none"
                      />
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
                            handleSave(note.id);
                          }}
                          className="font-bold text-3xl pl-15 py-1 text-gray-700 hover:text-gray-400"
                        >
                          <span>
                            <MdSaveAlt />
                          </span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="font-bold text-lg select-none">
                        {note.topic}
                      </h2>
                      <pre
                        className="text-sm text-gray-700 mt-2 select-none"
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
            <div className="flex justify-center mt-3 gap-4">
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
