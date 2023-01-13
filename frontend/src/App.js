import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import EditTransaction from "./components/EditTransaction/EditTransaction";
import DeleteTransaction from "./components/DeleteTransaction/DeleteTransaction";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import ViewTransaction from "./components/ViewTransaction/ViewTransaction";
import Account from "./pages/Account";

function App() {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="add" element={<AddTransaction />} />
          <Route path="edit" element={<EditTransaction />} />
          <Route path="delete" element={<DeleteTransaction />} />
          <Route path="account" element={<Account />} />
          <Route path="transaction" element={<ViewTransaction />} />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
