import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './login';
import ZKLoginPage from './ZKLoginPage';
import Gallery from './Gallery';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/zklogin" element={<ZKLoginPage />} /> 
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
