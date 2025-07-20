import { Link } from "react-router-dom";
import entryBg from "../assets/entryBg.png";
import AnimatedPage from "./AnimatedPage";

const Entry = () => {
  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden w-full items-center justify-center md:items-center md:px-15 h-screen bg-gray-100 md:gap-6 overflow-hidden">
      <div className="relative hidden md:block rounded-2xl overflow-hidden md:h-[530px] md:max-w-[50%]">
        <h1 className="absolute top-4 left-5 text-white text-3xl font-bold z-10">
          To-Do List
        </h1>
        <img
          src={entryBg}
          alt="Entry Background"
          className="w-full h-full object-cover max-h-[530px]"
        />
      </div>
      <AnimatedPage>
      <div className="flex flex-col justify-center text-center p-4 md:px-20 md:text-left md:left-0 md:rounded-2xl md:w-[600px] md:bg-gray-250 md:shadow-lg md:h-[530px]">
        <div className="mb-5">
          <div>
            <h1
              className="text-4xl font-bold fontFamily 'Poppins', sans-serif"
            >
              Welcome!
            </h1>
          </div>
          <p className="mt-3 md:text-base md:mb-2">
            Organic Mind helps you stay focused, organized, and stress-free.
            Simple tools, clean design — everything you need to plan your day
            and achieve your goals.
          </p>
        </div>
        <div>
          <button className="bg-[#faf700] text-black px-33 md:px-43 py-2 rounded-lg hover:bg-[#04AA6D] hover:text-white transition duration-300 font-semibold">
            Get Started
          </button>
          <p className="mt-3 font-semibold text-center">
            Already have an account?{" "}
            <Link to="/signin" className="text-[#04AA6D] hover:text-gray-800 ">
              Sign In
            </Link>
          </p>
        </div>
      </div>
       </AnimatedPage>
    </div>
  );
};

export default Entry;
