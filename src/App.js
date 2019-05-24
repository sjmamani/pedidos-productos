import React from "react";
import "./App.css";
import Navbar from "./components/UI/Navbar/Navbar";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Clientes from "./components/Clientes/Clientes";
import Productos from "./components/Productos/Productos";
import Producto from "./components/Productos/Producto/Producto";
import Pedidos from "./components/Pedidos/Pedidos";
import Pedido from "./components/Pedidos/Pedido/Pedido";

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
          <Route path="/pedido/:id" component={Pedido} />
          <Route path="/clientes" component={Clientes} />
        </div>
      </Router>
    </div>
  );
}

export default App;
