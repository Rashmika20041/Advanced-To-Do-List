import { MdKeyboardDoubleArrowRight, MdOutlineMenuOpen } from "react-icons/md";
import List from "./List";
import { FaNoteSticky } from "react-icons/fa6";

const Navigation = () => {
  return (
    <nav className="w-70 bg-[#f2f2f2] text-gray-800 rounded-[10px] h-full max-h-screen p-5">
      <div>
        <h1
          className="text-2xl font-bold mb-5"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Menu
        </h1>
      </div>
      <div className="md:mt-10">
        <h2
          className="text-base font-semibold mb-3 text-gray-600"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Tasks
        </h2>
        <ul className="text-base font-semibold text-gray-600">
          <li>
            <button className="flex flex-row items-center rounded-[5px] md:w-60 border-1 border-transparent hover:bg-gray-200 px-2 py-2">
              <span className="text-lg mr-2">
                <MdKeyboardDoubleArrowRight />
              </span>
              Upcoming
            </button>
          </li>
          <li>
            <button className=" flex flex-row items-center rounded-[5px] md:w-60 border-1 border-transparent hover:bg-gray-200 px-2 py-2">
              <span className="text-lg mr-2">
                <MdOutlineMenuOpen />
              </span>
              Today
            </button>
          </li>
          <li>
            <button className="flex flex-row items-center rounded-[5px] md:w-60 border-1 border-transparent hover:bg-gray-200 px-2 py-2">
              <span className="text-lg mr-2">
                <FaNoteSticky />
              </span>
              Sticky Note
            </button>
          </li>
        </ul>
        <hr className="my-4 text-gray-200" />
        <div>
          <List />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
