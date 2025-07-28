import React from "react";
import { Link } from "react-router-dom";
import entryBg from "../assets/entryBg.png";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AnimatedPage from "./AnimatedPage";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/today");
      
    } catch (err: any) {
      console.log("Sign in error:", err);
      switch (err.code) {
        case "auth/invalid-credentials":
          setError("Invalid email or password. Please check your credentials and try again.");
          break;
        case "auth/user-not-found":
          setError("No user found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          setError("Invalid email format. Please enter a valid email.");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;
        case "auth/network-request-failed":
          setError("Network error. Please check your connection.");
          break;
        case "auth/user-disabled":
          setError("User account is disabled.");
          break;
        default:
          setError("Failed to sign in. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
          <div className="flex flex-col justify-center text-center p-4 md:px-20 md:text-left md:left-0 md:w-1/4 md:rounded-2xl md:w-[600px] md:bg-gray-250 md:border-1 md:border-gray-200 md:h-[525px]">
            <form onSubmit={handleSignIn}>
              <div className="mb-5">
                <div>
                  <h1 className="text-4xl font-bold fontFamily" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Sign In
                  </h1>
                </div>
                {error && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-xs">
                    {error}
                  </div>
                )}
                <div className="mt-8 md:text-base md:mb-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="border border-gray-300 p-2 md:p-2 md:w-8/9 rounded-md w-full"
                    value={email}
                    disabled={loading}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="flex items-center mt-1 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="border border-gray-300 p-2 md:p-2 md:w-8/9 rounded-md w-full mt-3"
                      value={password}
                      disabled={loading}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="cursor-pointer text-gray-500 hover:text-gray-800 text-md md:text-xl absolute right-4 mt-4 md:right-15 md:mt-4"
                      onClick={() => setShowPassword((prev) => !prev)}
                      title={showPassword ? "Hide Password" : "Show Password"}
                    >
                      {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="w-[391px] bg-[#faf700] text-black mt-4 md:mt-1 md:px-4 py-2 rounded-lg hover:bg-[#04AA6D] hover:text-white transition duration-300 font-semibold select-none text-center"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
                <p className="mt-3 font-semibold text-center select-none">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-[#04AA6D] hover:text-gray-800 "
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </AnimatedPage>
      </div>
    </div>
  );
};

export default Signin;
