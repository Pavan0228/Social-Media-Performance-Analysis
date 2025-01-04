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
import ThumbnailAnalyzer from "./components/Pages/ThumbnailAnalyzer";
import Layout from "./components/Pages/Layout";

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes with Layout */}
                <Route element={<Layout />}>
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/thumbnail"
                        element={
                            <ProtectedRoute>
                                <ThumbnailAnalyzer />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/analyzer"
                        element={
                            <ProtectedRoute>
                                <Analyzer />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/transcript"
                        element={
                            <ProtectedRoute>
                                <VideoTranscript />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
            <ToastContainer />
        </Router>
    );
}

export default App;