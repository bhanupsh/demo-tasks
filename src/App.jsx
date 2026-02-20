
import './App.css';

import { Link, Routes, Route } from "react-router-dom";
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';

function App() {

  return (
    <>
      <h1>Welcome to the Hackathon Project!</h1>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
