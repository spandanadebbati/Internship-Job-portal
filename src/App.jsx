import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Opportunities from './pages/Opportunities';
import Admin from './pages/Admin';
import Applications from './pages/Applications';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/opportunities" element={<Opportunities />} />
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/applications" element={<Applications/>}/>
    </Routes>
  );
}

export default App;
