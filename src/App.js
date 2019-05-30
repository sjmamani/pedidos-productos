import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Clientes from "./components/Clientes/Clientes";
import Productos from "./components/Productos/Productos";
import Producto from "./components/Productos/Producto/Producto";
import Pedidos from "./components/Pedidos/Pedidos";
import Renderer from "./components/Login/Renderer";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container mt-3">
          <Route exact path="/" component={Productos} />
          <Route path="/productos" component={Productos} />
          <Route path="/productos/:id" component={Producto} />
          <Route path="/pedidos" component={Pedidos} />
          <Route path="/clientes" component={Clientes} />
          <Route path="/login" component={Renderer} />

        </div>
      </Router>
    </div>
  );
}

export default App;
