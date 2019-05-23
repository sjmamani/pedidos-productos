import React, { Component } from "react";
import axios from "axios";

class Clientes extends Component {
  state = {
    clientes: null,
    error: false
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/clientes")
      .then(response => {
        this.setState({ clientes: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }
  render() {
    let clientes = this.state.error ? (
      <p>Error al traer los clientes</p>
    ) : (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
    if (this.state.clientes) {
      clientes = this.state.clientes.map(cliente => {
        return (
          <tbody key={cliente.numero}>
            <tr>
              <th scope="row">{cliente.numero}</th>
              <td>{cliente.nombre}</td>
              <td>{cliente.cuil}</td>
            </tr>
          </tbody>
        );
      });
    }
    return (
      <table className="table">
        <thead style={{backgroundColor: "#001932", color: "#fff"}}>
          <tr>
            <th scope="col">Nro. Cliente</th>
            <th scope="col">Nombre</th>
            <th scope="col">CUIT</th>
          </tr>
        </thead>
        {clientes}
      </table>
    );
  }
}

export default Clientes;
