import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin.jsx";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/test" element={<h1 style={{ color: "black" }}>TEST PAGE</h1>}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/order-success" element={<OrderSuccess />}
/>
       </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;