import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Entry from "./Components/LogingForm/Entry";
import Signin from "./Components/LogingForm/Signin";
import Signup from "./Components/LogingForm/Signup";
import Today from "./Components/Dashboard/Today";
import Profile from "./Components/SideNavigation/Profile";
import StickyWall from "./Components/Dashboard/StickyWall";
import Upcoming from "./Components/Dashboard/Upcomint";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyAvsEG9P_1E7EP5CcXeKJBS-OnrNnxDLPw",
    authDomain: "to-do-list-a9017.firebaseapp.com",
    databaseURL: "https://to-do-list-a9017-default-rtdb.firebaseio.com",
    projectId: "to-do-list-a9017",
    storageBucket: "to-do-list-a9017.firebasestorage.app",
    messagingSenderId: "285440171695",
    appId: "1:285440171695:web:107bfd54a984ff68ea7e5a",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  console.log("Firebase initialized", auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/today" element={<Today />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/sticky-wall" element={<StickyWall />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
