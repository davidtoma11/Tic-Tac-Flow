import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SoloMode from './pages/SoloMode';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solo" element={<SoloMode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
