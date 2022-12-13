import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import EditTransaction from "./components/EditTransaction/EditTransaction";
import DeleteTransaction from "./components/DeleteTransaction/DeleteTransaction";

function App() {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="edit" element={<EditTransaction />} />
          <Route path="delete" element={<DeleteTransaction />} />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
