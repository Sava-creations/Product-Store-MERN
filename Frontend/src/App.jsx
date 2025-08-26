import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col dark:text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />                
        {/* path="/" → loads <HomePage /> when user visits http://localhost:5173/ */}
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> {/*Toastify*/}
    </div>
  );
}
export default App;