import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Pages/login";
import Signup from "./components/Pages/signup";
import Home from "./components/Pages/home";
import Analyzer from "./components/Pages/Analyzer";
import VideoTranscript from "./components/Pages/VideoTranscript";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/analyzer" element={<Analyzer />} />
                    <Route exact path="/transcript" element={<VideoTranscript />} />
                </Routes>
            </Router>
            <ToastContainer />
        </div>
    );
}

export default App;