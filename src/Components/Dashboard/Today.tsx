import "@fontsource/poppins/500.css";
import { FaPlus } from "react-icons/fa6";
import Navigation from "../SideNavigation/Navigation";

const Today = () => {
  return (
    <div className="flex pl-5 pr-10 pt-5">
      <Navigation />
      <div className="pl-6">
        <div className="flex flex-row justify-left items-center h-14">
          <h1
            className="md:text-4xl font-bold text-gray-800"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Today
          </h1>
          <div className="flex justify-center items-center ml-7 border-1 border-gray-300 rounded-[10px] w-10 h-10">
            <h1
              className="md:text-3xl text-gray-800"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              5
            </h1>
          </div>
        </div>
        <div className=" py-3">
          <div className="flex flex-row justify-left items-center h-10 mt-2 border-1 border-gray-200 rounded-[8px] px-5">
              <button className="md:text-sm text-gray-400 hover:text-[#11110f]">
                <span className="flex flex-row items-center gap-3">
                  <FaPlus />
                  Add New Task
                </span>
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};
export default Today;
