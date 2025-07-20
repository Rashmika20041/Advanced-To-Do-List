import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Entry from './Components/LogingForm/Entry';
import Signin from './Components/LogingForm/Signin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  )
}

export default App
