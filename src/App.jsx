import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import Workflow from './components/Workflow/Workflow';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Admin/>} />
          <Route path="/Workflow" element={<Workflow/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
