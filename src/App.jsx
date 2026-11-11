
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Opportunities from './pages/Opportunities';
import JobDetails from './pages/JobDetails';
import Apply from './pages/Apply';
import Applications from './pages/Applications';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/opportunities"
          element={<Opportunities />}
        />

        <Route
          path="/job/:id"
          element={<JobDetails />}
        />

        <Route
          path="/apply/:id"
          element={<Apply />}
        />

        <Route
          path="/applications"
          element={<Applications />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
