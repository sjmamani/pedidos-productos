import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Clientes from "./components/Clientes/Clientes";
import Productos from "./components/Productos/Productos";
import Pedidos from "./components/Pedidos/Pedidos";
import Pedido from "./components/Pedidos/Pedido/Pedido";
import CambioPassword from "./components/Login/CambioPassword/CambioPassword";
import HomeLogin from "./components/Login/HomeLogin";

function App() {
  return (
    <div className="App">
      <Router>
          <Route exact path="/" component={HomeLogin} />
          <Route path="/productos" component={Productos} />
          <Route path="/pedidos" component={Pedidos} />
          <Route path="/pedido/:id" component={Pedido} />
          <Route path="/clientes" component={Clientes} />
          <Route path="/cambioPassword" component={CambioPassword} />
      </Router>
    </div>
  );
}

export default App;
