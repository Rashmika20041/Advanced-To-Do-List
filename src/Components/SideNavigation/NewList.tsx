import { useState } from "react";

type NewListProps = {
  onClose: () => void;
  onAdd: (name: string, color: string) => void;
};

const NewList = ({ onClose, onAdd }: NewListProps) => {
  const [selectColor, setSelectColor] = useState<string>("");
  const [listName, setListName] = useState<string>("");

  const colors = [
    "#FF5733",
    "#33B5FF",
    "#28A745",
    "#000cff",
    "#FFC107",
    "#8E44AD",
    "#00fff3",
    "#fb00ff",
  ];

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>
  ) => {
    if (e.key === "Enter" && listName.trim() !== "") {
      onClose();
      onAdd(listName, selectColor || "#000000");
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full border-1 border-gray-300 p-3 rounded-md mt-4">
      <div className="relative">
        {selectColor && (
          <div
            className="w-4 h-4 rounded-[5px] border border-gray-300 absolute top-1/2 left-2 transform -translate-y-1/2"
            style={{ backgroundColor: selectColor }}
          ></div>
        )}
        <input
          type="text"
          placeholder="List Name"
          className="border border-gray-300 p-1 pl-8 text-sm font-medium rounded-md w-full outline-none"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex flex-row gap-3 mt-2 justify-center">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectColor(color)}
            onKeyDown={handleKeyDown}
            className="w-4 h-4 rounded-[4px] border-gray-300"
            style={{ backgroundColor: color }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default NewList;
