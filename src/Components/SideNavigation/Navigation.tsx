import { MdKeyboardDoubleArrowRight, MdOutlineMenuOpen } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import { PiSignOutBold } from "react-icons/pi";
import List from "./List";
import { FaNoteSticky } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Signout from "./Signout";
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";

const Navigation = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const navigate = useNavigate();

  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  return (
    <nav className="relative flex flex-col w-70 bg-[#f2f2f2] text-gray-800 rounded-[10px] h-screen max-h-[calc(100vh-2.5rem)] overflow-y-auto px-5 py-3">
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
            <button
              className="group flex flex-row gap-4 justify-between hover:font-bold items-center rounded-[5px] md:w-60 border-1 border-transparent hover:bg-gray-200 px-2 py-1"
              onClick={() => navigate("/upcoming")}
            >
              <div className="flex flex-row items-center gap-4">
                <span className="text-base">
                  <MdKeyboardDoubleArrowRight />
                </span>
                Upcoming
              </div>
              <div className="flex justify-center items-center ml-7 bg-gray-200 group-hover:bg-gray-100 rounded-[4px] w-7 h-5">
                <p
                  className="md:text-xs text-gray-800"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  5
                </p>
              </div>
            </button>
          </li>
          <li>
            <button
              className="group flex flex-row gap-4 justify-between hover:font-bold items-center rounded-[5px] md:w-60 border-1 border-transparent hover:bg-gray-200 px-2 py-1"
              onClick={() => navigate("/today")}
            >
              <div className="flex flex-row items-center gap-4">
                <span className="text-base">
                  <MdOutlineMenuOpen />
                </span>
                Today
              </div>
              <div className="flex justify-center items-center ml-7 bg-gray-200 group-hover:bg-gray-100 rounded-[4px] w-7 h-5">
                <p
                  className="md:text-xs text-gray-800"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  5
                </p>
              </div>
            </button>
          </li>
          <li>
            <button
              className="flex flex-row gap-4 hover:font-bold items-center rounded-[5px] md:w-60 border-1 border-transparent hover:bg-gray-200 px-2 py-1"
              onClick={() => navigate("/sticky-wall")}
            >
              <span className="text-base">
                <FaNoteSticky />
              </span>
              Sticky Wall
            </button>
          </li>
        </ul>
        <hr className="my-4 text-gray-200" />
        <div>
          <List />
        </div>
        <div className="absolute bottom-4 left-4 flex flex-col">
          <button
            className=" flex flex-row text-sm font-semibold hover:font-bold items-center py-1"
            onClick={() => navigate("/profile")}
          >
            <span className=" mr-3">
              <VscSettings className="text-base" />
            </span>
            Profile
          </button>
          <button
            className=" flex flex-row text-sm font-semibold hover:font-bold items-center py-1"
            onClick={() => setShowPopup(true)}
          >
            <span className="mr-3">
              <PiSignOutBold className="text-base" />
            </span>
            Sign Out
          </button>
          {showPopup && (
            <Signout
              onConfirm={handleLogout}
              onCancel={() => setShowPopup(false)}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;