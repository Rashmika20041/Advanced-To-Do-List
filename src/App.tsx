import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Entry from "./Components/LogingForm/Entry";
import Signin from "./Components/LogingForm/Signin";
import Signup from "./Components/LogingForm/Signup";
import Today from "./Components/Dashboard/Today";
import Profile from "./Components/SideNavigation/Profile";
import StickyWall from "./Components/Dashboard/StickyWall";
import Upcoming from "./Components/Dashboard/Upcomint";
import useNetworkStatus from "./Components/Online/useNetworkStatus";

function App() {
  const isOnline = useNetworkStatus();

  return (
    <>
      {!isOnline && (
        <div className="fixed inset-0 bg-yellow-500 text-white flex items-center justify-center z-50">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-4">No Internet Connection</h2>
            <p>Please check your network connection and try again.</p>
          </div>
        </div>
      )}
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
    </>
  );
}

export default App;