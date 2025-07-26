import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Entry from './Components/LogingForm/Entry';
import Signin from './Components/LogingForm/Signin';
import Signup from './Components/LogingForm/Signup';
import Today from './Components/Dashboard/Today';
import Profile from './Components/SideNavigation/Profile'
import StickyWall from './Components/Dashboard/StickyWall';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/today" element={<Today />} />
        <Route path="/sticky-wall" element={<StickyWall />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
