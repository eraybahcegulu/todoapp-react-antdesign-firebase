import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/home/home";
import Todo from "./components/todo/todo";
import NewFeature from "./components/new/new";
import NewFeature2 from "./components/new2/new2";

import database from './firebase';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Todo" element={<Todo database={database} />} />
        <Route path="/NewFeature" element={<NewFeature />} />
        <Route path="/NewFeature2" element={<NewFeature2 />} />
      </Routes>
    </Router>
  );
}

export default App;
