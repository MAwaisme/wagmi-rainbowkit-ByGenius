import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Staking from './pages/Staking';
import Home from './pages/Home';
import './App.css';
import Header from './components/Header';

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/staking" element={<Staking />} />
      </Routes>
    </Router>
  );
}

export default App;
