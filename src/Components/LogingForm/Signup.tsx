import React from "react";
import { Link } from "react-router-dom";
import entryBg from "../assets/entryBg.png";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import AnimatedPage from "./AnimatedPage";

const Signup = () => {
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden w-full items-center justify-center md:pr-4 md:items-center h-screen bg-gray-100 md:gap-6 overflow-hidden">
      <div className="relative hidden md:block rounded-2xl overflow-hidden md:h-[530px] md:w-[620px] md:max-w-[50%]">
        <h1 className="absolute top-4 left-5 text-white text-3xl font-bold z-10">
          Daily Bloom
        </h1>
        <img
          src={entryBg}
          alt="Entry Background"
          className="w-full h-full object-cover max-h-[530px]"
        />
      </div>
      <AnimatedPage>
        <div className="flex flex-col justify-center text-center p-4 md:px-20 md:text-left md:left-0 md:w-1/4 md:rounded-2xl md:border-1 md:border-gray-200 md:w-[600px] md:bg-gray-250 md:h-[525px]">
          <div className="mb-5">
            <div>
              <h1 className="text-4xl font-bold fontFamily 'Poppins', sans-serif">
                Sign Up
              </h1>
            </div>
            <div className="mt-8 md:text-base md:mb-2">
              <div className="flex flex-row md:w-8/9 gap-4">
                <input
                  type="fname"
                  placeholder="First Name"
                  className="border border-gray-300 p-2 md:p-2 rounded-md w-full"
                />
                <input
                  type="lname"
                  placeholder="Last Name"
                  className="border border-gray-300 p-2 md:p-2 rounded-md w-full"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 p-2 md:p-2 md:w-8/9 mt-4 rounded-md w-full"
              />
              <div className="flex items-center mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="border border-gray-300 p-2 md:p-2 md:w-8/9 rounded-md w-full mt-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="cursor-pointer text-gray-500 hover:text-gray-800 md:text-xl absolute right-4 mt-4 md:right-15 md:mt-4"
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                </span>
              </div>
            </div>
          </div>
          <div>
            <button className="bg-[#faf700] text-black mt-4 md:mt-1 px-33 md:px-42 py-2 rounded-lg hover:bg-[#04AA6D] hover:text-white transition duration-300 font-semibold select-none">
              Sign Up
            </button>
            <p className="mt-3 font-semibold text-center select-none">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-[#04AA6D] hover:text-gray-800 "
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </AnimatedPage>
    </div>
  );
};

export default Signup;
