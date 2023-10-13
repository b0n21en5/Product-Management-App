import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddProduct from "./pages/AddProduct/AddProduct";
import Login from "./pages/Auth/Login";
import NavBar from "./components/Nav/NavBar";
import Signup from "./pages/Auth/Signup";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-new-product" element={<AddProduct />} />
        <Route path="/update-product" element={<UpdateProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
