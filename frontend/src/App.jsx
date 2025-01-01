import './App.css'
import Login from './components/Pages/login';
import Signup from './components/Pages/signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  return (
    <>

    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>

    </>
  )
}

export default App
