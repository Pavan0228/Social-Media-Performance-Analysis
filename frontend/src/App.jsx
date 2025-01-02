import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Pages/login";
import Signup from "./components/Pages/signup";
import Home from "./components/Pages/home";
import Analyzer from "./components/Pages/Analyzer";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import VideoTranscript from "./components/Pages/VideoTranscript";

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route exact path="/" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route
                    exact
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/analyzer"
                    element={
                        <ProtectedRoute>
                            <Analyzer />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/transcript"
                    element={
                        <ProtectedRoute>
                            <VideoTranscript />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <ToastContainer />
        </Router>
    );
}

export default App;
