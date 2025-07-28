import {
  IoArrowBackCircleOutline,
  IoArrowBackCircleSharp,
} from "react-icons/io5";
import React from "react";
import bg from "../assets/profileBg.jpg";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";

const Profile = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.displayName) {
      setName(user.displayName);
    }
  }, [user, navigate]);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!name.trim()) {
      setError("Name cannot be empty");
      setLoading(false);
      return;
    }

    try {
      if (user) {
        if (name !== user.displayName) {
          await updateProfile(user, { displayName: name });
        }
        setSuccess("Profile updated successfully!");
      }
      console.log("Profile updated successfully");
    } catch (error) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex justify-center items-center h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center blur-[2px]"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          zIndex: -1,
        }}
      ></div>
      <div
        className="absolute top-10 left-20 z-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleBack}
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
        <form onSubmit={handleEdit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-12 items-center">
              <label>Name:</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-[300px] rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-13 items-center">
              <label>Email:</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-[300px] rounded-md"
                value={user.email || "N/A"}
                readOnly
              />
            </div>
            <div className="flex flex-row gap-5 items-center">
              <label>Password:</label>
              <input
                type="password"
                className="border border-gray-300 p-2 w-[300px] rounded-md"
                value={"**********"}
              />
            </div>
            {error && (
              <div className="text-red-700 text-sm items-center justify-center text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-700 text-sm items-center justify-center text-center">
                {success}
              </div>
            )}
            <div className="flex flex-row gap-5 mt-2 justify-end items-center">
              <button
                className="bg-[#faf700] hover:bg-[#04AA6D] hover:text-white hover:scale-101 shadow-md text-black p-2 text-[13px] w-[130px] rounded-[25px] select-none transition-colors duration-300 ease-in-out"
                type="submit"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Profile;
