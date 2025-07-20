import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Entry from './Components/LogingForm/Entry';
import Signin from './Components/LogingForm/Signin';
import Signup from './Components/LogingForm/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
