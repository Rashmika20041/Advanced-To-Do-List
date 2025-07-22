import { useState } from "react";

type NewListProps = {
  onClose: () => void;
};

const NewList = ({ onClose }: NewListProps) => {
  const [selectColor, setSelectColor] = useState<string>("");
  const [listName, setListName] = useState<string>("");

  const colors = ["#FF5733", "#33B5FF", "#28A745", "#FFC107", "#8E44AD"];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && listName.trim() !== " ") {
      onClose();
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full border-1 border-gray-300 p-4 rounded-md mt-6">
      <div className="relative">
        {selectColor && (
          <div
            className="w-6 h-6 rounded-[5px] border border-gray-300 absolute top-1/2 left-2 transform -translate-y-1/2"
            style={{ backgroundColor: selectColor }}
          ></div>
        )}
        <input
          type="text"
          placeholder="List Name"
          className="border border-gray-300 p-2 pl-12 font-medium rounded-md w-full"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex gap-4 mt-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectColor(color)}
            className="w-6 h-6 rounded-[5px] border border-gray-300"
            style={{ backgroundColor: color }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default NewList;
