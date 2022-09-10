import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Products from "./components/products/productList";
const App: React.FC = () => {
  return (
    <div>
   
    <div className="container mt-3">
      <Routes>
        <Route path="/" element={<Products/>} />
      </Routes>
    </div>
  </div>
  )
}
export default App;