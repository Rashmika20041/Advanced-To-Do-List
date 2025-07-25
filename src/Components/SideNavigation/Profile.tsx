import {
  IoArrowBackCircleOutline,
  IoArrowBackCircleSharp,
} from "react-icons/io5";
import React from "react";
import bg from "../assets/profileBg.jpg";

const Profile = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="relative flex justify-center items-center h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center blur-[2px]"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", zIndex: -1 }}
      ></div>
      <div
        className="absolute top-10 left-20 z-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => window.history.back()}
      >
        {isHovered ? (
          <IoArrowBackCircleSharp className="text-5xl cursor-pointer text-white" />
        ) : (
          <IoArrowBackCircleOutline className="text-5xl cursor-pointer text-white" />
        )}
      </div>
      <div
        className="flex flex-col bg-white border-1 border-gray-300 rounded-xl shadow-2xl px-20 pb-13 pt-10 gap-4"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <div className="flex flex-row justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-12 items-center">
            <label>Name:</label>
            <input
              type="text"
              className="border border-gray-300 p-2 w-[280px] rounded-md"
            />
          </div>
          <div className="flex flex-row gap-13 items-center">
            <label>Email:</label>
            <input
              type="text"
              className="border border-gray-300 p-2 w-[280px] rounded-md"
            />
          </div>
          <div className="flex flex-row gap-5 items-center">
            <label>Password:</label>
            <input
              type="password"
              className="border border-gray-300 p-2 w-[280px] rounded-md"
            />
          </div>
          <div className="flex flex-row gap-5 mt-4 justify-end items-center">
            <button className="bg-[#faf700] hover:bg-[#04AA6D] hover:text-white shadow-md text-black p-2 text-[13px] w-[130px] rounded-[25px]">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
