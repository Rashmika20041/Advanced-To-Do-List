import { MdKeyboardDoubleArrowRight, MdOutlineMenuOpen } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import { PiSignOutBold } from "react-icons/pi";
import List from "./List";
import { FaNoteSticky } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";



const Navigation = () => {

  const navigate = useNavigate();

  return (
    <nav className="relative flex flex-col w-75 bg-[#f2f2f2] text-gray-800 rounded-[10px] h-screen max-h-[calc(100vh-2.5rem)] overflow-y-auto px-5 py-3">
      <div>
        <h1
          className="text-lg font-bold"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Menu
        </h1>
      </div>
      <div className="md:mt-5">
        <h2
          className="text-xs font-semibold mb-1 text-gray-600"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Tasks
        </h2>
        <ul className="text-sm font-semibold text-gray-600">
          <li>
            <button className="flex flex-row gap-4 hover:font-bold items-center rounded-[5px] md:w-65 border-1 border-transparent hover:bg-gray-200 px-2 py-1">
              <span className="text-base">
                <MdKeyboardDoubleArrowRight />
              </span>
              Upcoming
            </button>
          </li>
          <li>
            <button className=" flex flex-row gap-4 hover:font-bold items-center rounded-[5px] md:w-65 border-1 border-transparent hover:bg-gray-200 px-2 py-1" onClick={() => navigate("/today")}>
              <span className="text-base">
                <MdOutlineMenuOpen />
              </span>
              Today
            </button>
          </li>
          <li>
            <button className="flex flex-row gap-4 hover:font-bold items-center rounded-[5px] md:w-65 border-1 border-transparent hover:bg-gray-200 px-2 py-1" onClick={() => navigate("/sticky-wall")}>
              <span className="text-base">
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
        <div className="absolute bottom-4 left-4 flex flex-col">
          <button className=" flex flex-row text-sm font-semibold hover:font-bold items-center py-1">
              <span className=" mr-3">
                <VscSettings className="text-base"/>
              </span>
              Settings
            </button>
            <button className=" flex flex-row text-sm font-semibold hover:font-bold items-center py-1">
              <span className="mr-3">
                <PiSignOutBold className="text-base" />
              </span>
              Sign Out
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
