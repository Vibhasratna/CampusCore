import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Navbar from "./components/Navbar.jsx";
import About from "./pages/About.jsx";




function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </Router>
    );
}

export default App;