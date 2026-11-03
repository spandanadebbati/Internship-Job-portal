import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Opportunities from './pages/Opportunities';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/opportunities" element={<Opportunities />} />
    </Routes>
  );
}

export default App;
