import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Products from "./components/products/productList";
const App: React.FC = () => {
  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/tutorials" className="navbar-brand">
        bezKoder
      </a>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/tutorials"} className="nav-link">
            Tutorials
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/add"} className="nav-link">
            Add
          </Link>
        </li>
      </div>
    </nav>
    <div className="container mt-3">
      <Routes>
        <Route path="/" element={<Products/>} />
      </Routes>
    </div>
  </div>
  )
}
export default App;